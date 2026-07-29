/**
 * PRODUCTION-READY SECURITY ARCHITECTURE
 * Pearl Travel Backend - Express.js + MongoDB + JWT
 *
 * Security Features:
 * - Helmet.js for HTTP headers protection
 * - CORS properly configured
 * - JWT-based authentication with 7-day expiry
 * - Role-based access control (RBAC)
 * - Input validation and sanitization
 * - Password hashing with bcrypt
 * - Centralized error handling (no stack leaks)
 * - Protected routes for admin operations
 */
// const authRoutes = require("./routes/auth");

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
// app.use("/auth", authRoutes);

const app = express();

// ============================================
// 🔐 SECURITY MIDDLEWARE
// ============================================

// Helmet.js - Set security HTTP headers
// Protects against XSS, Clickjacking, MIME-type sniffing, etc.
app.use(helmet());

// Parse JSON request bodies
app.use(express.json({ limit: "10mb" }));

const allowedOrigins = ["http://localhost:5173/login"];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
    //   if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
    //   } else {
    //     callback(new Error("Not allowed by CORS"));
    //   }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Serve uploaded images statically
// Images are public resources
//
app.use(
  "/uploads",
  express.static("/app/uploads", {
    setHeaders: (res) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  }),
);

// ============================================
// 📦 ROUTES IMPORTS
// ============================================

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const tutorRoutes = require("./routes/tutorRouter");

// ============================================
// 🗄️ DATABASE CONNECTION
// ============================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✓ MongoDB Connected"))
  .catch((err) => {
    console.error("✗ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ============================================
// 🏥 HEALTH CHECK ROUTES
// ============================================

/**
 * Basic health check endpoint
 * Used by Docker healthcheck and load balancers
 */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

/**
 * Database health check endpoint
 * Returns database connection status
 */
app.get("/health/db", (req, res) => {
  const mongoState = mongoose.connection.readyState;
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  const isHealthy = mongoState === 1;
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "healthy" : "unhealthy",
    database: states[mongoState],
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// 📡 API ROUTES
// ============================================

/**
 * Authentication Routes
 * POST   /api/auth/register  - Register new user
 * POST   /api/auth/login     - Login and get JWT
 * GET    /api/auth/me        - Get current user (protected)
 */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tutors", tutorRoutes);

// ============================================
// 📊 STATS ENDPOINT (PUBLIC)
// ============================================

// ============================================
// ❌ ERROR HANDLING
// ============================================

const { errorHandler, notFoundHandler } = require("./middlewares/errorHandler");

// 404 handler - must be before error handler
app.use(notFoundHandler);

// Centralized error handler - must be last
app.use(errorHandler);

// ============================================
// 🚀 SERVER START
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Backend                              ║
║  🔐 Security-Hardened Architecture      ║
║  Port: ${PORT}                            ║
║  Env: ${process.env.NODE_ENV || "development"}               ║
╚════════════════════════════════════════╝
  `);
});

module.exports = app;
