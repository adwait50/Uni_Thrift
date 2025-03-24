const express = require('express');
const mongoose = require('mongoose');
const StudentRoutes = require('./Routes/Student/StudentRoutes.js');
const TenantRoutes = require('./Routes/Tenant/TenantRoutes.js');
require('dotenv').config();

const app = express();


app.use(express.json());

mongoose.connect('mongodb+srv://Ad_admin:rTotQIYvhqGW9Hkj@cluster0.wgqj7.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/api/students', StudentRoutes);
app.use('/api/tenants', TenantRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});