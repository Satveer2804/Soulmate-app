const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization']
}));

app.use(express.json());

// AUTH ROUTES
app.use("/api/auth", require("./routes/auth.routes"));

// 🎵 AUDIO ROUTES (NEW)
app.use("/api/audios", require("./routes/audio.routes"));
app.use("/api/admin/audio", require("./routes/admin.audio.routes"));
app.use("/api", require("./routes/upload.routes"));

// HEALTH CHECK (OPTIONAL BUT RECOMMENDED)
app.get("/", (req, res) => {
  res.send("Soulmate backend is running ❤️");
});

module.exports = app;