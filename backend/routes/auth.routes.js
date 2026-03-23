const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const protect = require("../middleware/auth");

router.post("/register", auth.register);
router.post("/login/send-otp", auth.sendOTP);
router.post("/login/verify-otp", auth.verifyOTP);
router.post("/login", auth.loginWithPassword);
router.get("/me", protect, auth.getMe);
router.post("/create-admin", protect, auth.createAdminUser);
router.get("/users", protect, auth.getAllUsers);
router.delete("/users/:id", protect, auth.deleteUser);

module.exports = router;