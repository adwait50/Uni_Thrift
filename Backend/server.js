const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const StudentRoutes = require("./Routes/Student/StudentRoutes.js");
const TenantRoutes = require("./Routes/Tenant/TenantRoutes.js");
require("dotenv").config();
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

mongoose.connect(
  "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/students", StudentRoutes);
app.use("/api/tenants", TenantRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
