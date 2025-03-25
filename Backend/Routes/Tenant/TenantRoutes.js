const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Tenant = require("../../Models/Tenant");
const jwt = require("jsonwebtoken");
const tenantAuth = require("../../Middlewares/authTenantMiddleware.js");
const sendEmail = require("../../utils/emailService.js");
const tenantUpload = require("../../Utils/multer.js");
const fs = require("fs");
const path = require("path");
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const uploadsDir = path.join(__dirname, "../../uploads/tenant-documents");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

router.post(
  "/signup",
  tenantUpload.fields([
    { name: "proofAadhaar", maxCount: 1 },
    { name: "proofOfAddress", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, email, phoneNumber, currentAddress, password } = req.body;

      if (!req.files?.proofAadhaar || !req.files?.proofOfAddress) {
        return res
          .status(400)
          .json({ message: "Both Aadhaar and address proof are required" });
      }

      const existingTenant = await Tenant.findOne({ email });
      if (existingTenant) {
        // Delete uploaded files
        Object.values(req.files).forEach((file) => {
          fs.unlinkSync(file[0].path);
        });
        return res.status(400).json({ message: "Email already registered" });
      }

      const tenant = new Tenant({
        name,
        email,
        phoneNumber,
        currentAddress,
        password: await bcrypt.hash(String(password), 10),
        proofAadhaar: req.files.proofAadhaar[0].path,
        proofOfAddress: req.files.proofOfAddress[0].path,
        verificationOTP: generateOTP(),
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      });

      await tenant.save();

      await sendEmail(
        email,
        "Email Verification",
        `Your verification code is: ${tenant.verificationOTP}\nThis code will expire in 5 minutes.`
      );

      res.status(201).json({
        message:
          "Registration successful. Please check your email for verification code.",
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  }
);

router.post("/verify-email", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const tenant = await Tenant.findOne({
      email,
      verificationOTP: otp,
      otpExpiry: { $gt: Date.now() },
    });

    if (!tenant) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    tenant.isVerified = true;
    tenant.verificationOTP = null;
    tenant.otpExpiry = null;
    await tenant.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const tenant = await Tenant.findOne({ email });
    if (!tenant) {
      return res.status(400).json({ message: "Tenant not found" });
    }

    if (!tenant.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email first" });
    }

    const validPassword = await bcrypt.compare(password, tenant.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: tenant._id, email: tenant.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const tenant = await Tenant.findOne({ email });
    if (!tenant) {
      return res.status(400).json({ message: "Tenant not found" });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    tenant.resetPasswordOTP = otp;
    tenant.resetPasswordExpiry = otpExpiry;
    await tenant.save();

    // Send reset password email
    await sendEmail(
      email,
      "Reset Password Request",
      `Your password reset code is: ${otp}\nThis code will expire in 10 minutes.`
    );

    res.json({ message: "Password reset instructions sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/verify-reset-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const tenant = await Tenant.findOne({ email });
    if (!tenant) {
      return res.status(400).json({ message: "Email not found" });
    }

    if (
      tenant.resetPasswordOTP !== otp ||
      tenant.resetPasswordExpires < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const tenant = await Tenant.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!tenant) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(String(newPassword), 10);
    tenant.password = hashedPassword;
    tenant.resetPasswordOTP = null;
    tenant.resetPasswordExpiry = null;
    await tenant.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", tenantAuth, (req, res) => {
  try {
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/dashboard", tenantAuth, async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.user.id).select("-password");
    res.json(tenant);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
