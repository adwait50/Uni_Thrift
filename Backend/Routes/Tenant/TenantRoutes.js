const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Tenant = require('../../Models/Tenant.js');
const jwt = require('jsonwebtoken');
const tenantAuth = require('../../Middlewares/authTenantMiddleware.js');

router.post('/signup', async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      currentAddress,
      proofAadhaar,
      proofOfAddress,
      password
    } = req.body;

    
    const existingTenant = await Tenant.findOne({ email });
    if (existingTenant) {
      return res.status(400).json({ message: 'Tenant already exists with this email' });
    }

 
    const hashedPassword = await bcrypt.hash(String(password), 10);

   
    const tenant = new Tenant({
      name,
      email,
      phoneNumber,
      currentAddress,
      proofAadhaar: proofAadhaar, 
      proofOfAddress: proofOfAddress,   
      password: hashedPassword
    });

    await tenant.save();
    res.status(201).json({ message: 'Tenant registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;


    const tenant = await Tenant.findOne({ email });
    if (!tenant) {
      return res.status(400).json({ message: 'Tenant not found' });
    }

    
    const validPassword = await bcrypt.compare(password, tenant.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
        { 
          id: tenant._id,
          email: tenant.email,
          role: 'tenant'
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

router.get('/dashboard',tenantAuth, async (req, res) => {
    try {
      const tenant = await Tenant.findById(req.user.id).select('-password');
      res.json(tenant);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router; 