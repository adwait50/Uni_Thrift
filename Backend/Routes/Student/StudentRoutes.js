const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Student = require("../../Models/Student");
const jwt = require("jsonwebtoken");
const studentAuth = require("../../Middlewares/authStudentMiddleware.js");
const sendEmail = require("../../utils/emailService.js");
const tenantUpload = require("../../Utils/multer.js");
const fs = require("fs");
const path = require("path");

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../../uploads/student-documents");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
// Signup with admission proof upload
router.post(
  "/signup",
  tenantUpload.single("proofOfAdmission"),
  async (req, res) => {
    try {
      const { name, studentEmail, phoneNumber, currentAddress, password } =
        req.body;

      // Check if admission proof was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "Admission proof is required" });
      }

      // Check existing student
      const existingStudent = await Student.findOne({ studentEmail });
      if (existingStudent) {
        // Delete uploaded file
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "Email already registered" });
      }

      // Create new student
      const student = new Student({
        name,
        studentEmail,
        phoneNumber,
        currentAddress,
        password: await bcrypt.hash(String(password), 10),
        proofOfAdmission: req.file.path,
        verificationOTP: generateOTP(),
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      });

      await student.save();

      // Send verification email
      await sendEmail(
        studentEmail,
        "Email Verification",
        `Your verification code is: ${student.verificationOTP}\nThis code will expire in 5 minutes.`
      );

      res.status(201).json({
        message:
          "Registration successful. Please check your email for verification code.",
      });
    } catch (error) {
      // Clean up file if error occurs
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      console.error("Signup error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  }
);

router.post("/verify-email", async (req, res) => {
  try {
    const { studentEmail, otp } = req.body;
    console.log(studentEmail, otp);
    const student = await Student.findOne({
      studentEmail,
      verificationOTP: otp,
      otpExpiry: { $gt: Date.now() },
    });

    if (!student) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    student.isVerified = true;
    student.verificationOTP = null;
    student.otpExpiry = null;
    await student.save();

    // Send reset password email
    await sendEmail(
      studentEmail,
      "Reset Password Request",
      `Your password reset code is: ${otp}\nThis code will expire in 10 minutes.`
    );

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { studentEmail } = req.body;

    const student = await Student.findOne({ studentEmail });
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 50 minutes

    student.resetPasswordOTP = otp;
    student.resetPasswordExpiry = otpExpiry;
    await student.save();

    await sendEmail(
      studentEmail,
      "Reset Password Request",
      `Your password reset code is: ${otp}\nThis code will expire in 10 minutes.`
    );

    res.json({ message: "Password reset instructions sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/verify-reset-otp", async (req, res) => {
  const { studentEmail, otp } = req.body;

  try {
    const student = await Student.findOne({ studentEmail });
    if (!student) {
      return res.status(400).json({ message: "Email not found" });
    }

    if (
      student.resetPasswordOTP !== otp ||
      student.resetPasswordExpires < new Date()
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
    const { studentEmail, otp, newPassword } = req.body;
    console.log(studentEmail, otp, newPassword);
    const student = await Student.findOne({
      studentEmail,
      resetPasswordOTP: otp,
    });

    if (!student) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(String(newPassword), 10);
    student.password = hashedPassword;
    student.resetPasswordOTP = null;
    await student.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { studentEmail, password } = req.body;

    const student = await Student.findOne({ studentEmail });
    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }

    if (!student.isVerified) {
      return res
        .status(400)
        .json({ message: "Please verify your email first" });
    }

    const validPassword = await bcrypt.compare(password, student.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: student._id, email: student.studentEmail },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", studentAuth, (req, res) => {
  try {
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/dashboard", studentAuth, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select("-password");
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
