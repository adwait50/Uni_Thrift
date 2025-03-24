const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Student = require('../../Models/Student');
const jwt = require('jsonwebtoken');
const studentAuth = require('../../Middlewares/authStudentMiddleware.js');



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

    
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      studentEmail,
      phoneNumber,
      currentAddress,
      proofOfAdmission,
      password: hashedPassword
    });

    await student.save();
    res.status(201).json({ message: 'Student registered successfully' });

  } catch (error) {
    console.error(error);
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


    const validPassword = await bcrypt.compare(password, student.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
        { 
          id: student._id,
          email: student.studentEmail,
          role: 'student'
        },
        process.env.JWT_SECRET,
      );

    res.json({
        message: 'Login successful',
        token: token
      });

  } catch (error) {
    console.error(error);
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