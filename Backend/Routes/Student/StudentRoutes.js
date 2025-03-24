const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Student = require('../../Models/Student');
const jwt = require('jsonwebtoken');
const studentAuth = require('../../Middlewares/authStudentMiddleware.js');
const sendEmail = require('../../utils/emailService.js');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

router.post('/signup', async (req, res) => {
  try {
    const {
      name,
      studentEmail,
      phoneNumber,
      currentAddress,
      proofOfAdmission,
      password
    } = req.body;

    const existingStudent = await Student.findOne({ studentEmail });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const student = new Student({
      name,
      studentEmail,
      phoneNumber,
      currentAddress,
      proofOfAdmission,
      password: hashedPassword,
      verificationOTP: otp,
      otpExpiry
    });

    await student.save();

    await sendEmail(
        studentEmail,
        "Email Verification",
        `Your verification code is: ${otp}\nThis code will expire in 10 minutes.`
    );

    res.status(201).json({ 
      message: 'Student registered successfully. Please check your email for verification code.' 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/verify-email', async (req, res) => {
  try {
    const { studentEmail, otp } = req.body;

    const student = await Student.findOne({ 
      studentEmail,
      verificationOTP: otp,
      otpExpiry: { $gt: Date.now() }
    });

    if (!student) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
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

    res.json({ message: 'Email verified successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { studentEmail } = req.body;

    const student = await Student.findOne({ studentEmail });
    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
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

    res.json({ message: 'Password reset instructions sent to your email' });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { studentEmail, otp, newPassword } = req.body;

    const student = await Student.findOne({
      studentEmail,
      resetPasswordOTP: otp
     }
    );

    if (!student) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(String(newPassword), 10);
    student.password = hashedPassword;
    student.resetPasswordOTP = null;
    await student.save();

    res.json({ message: 'Password reset successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { studentEmail, password } = req.body;

    const student = await Student.findOne({ studentEmail });
    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
    }

    if (!student.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    const validPassword = await bcrypt.compare(password, student.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: student._id, email: student.studentEmail },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/logout', studentAuth, (req, res) => {
  try {
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/dashboard', studentAuth, async (req, res) => {
    try {
      const student = await Student.findById(req.user.id).select('-password');
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;