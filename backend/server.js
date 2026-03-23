require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

// Validate Cloudinary env vars on startup
const cloudinaryVars = {
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

const missingVars = Object.entries(cloudinaryVars)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error("❌ Missing environment variables:", missingVars.join(", "));
  console.error("   Make sure your .env file has all Cloudinary credentials.");
  process.exit(1); // Stop the server immediately so you know exactly what's wrong
} else {
  console.log("✅ Cloudinary env vars loaded successfully");
}

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});