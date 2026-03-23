const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.register = async (req, res) => {
    try {
        const { fullName, email, phone } = req.body;

        if (!fullName || !email || !phone) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existing = await User.findOne({ phone });
        if (existing) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const user = await User.create({ fullName, email, phone });

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            redirect: "login",
            data: { id: user._id, fullName: user.fullName, phone: user.phone },
        });
    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.sendOTP = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ success: false, message: "Phone number is required" });
        }

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const otp = generateOTP();
        console.log(`📱 OTP for ${phone}: ${otp}`);

        user.otp = otp;
        user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await user.save();

        return res.status(200).json({ success: true, message: "OTP generated" });
    } catch (error) {
        console.error("Send OTP Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        if (!phone || !otp) {
            return res.status(400).json({ success: false, message: "Phone and OTP are required" });
        }

        const user = await User.findOne({ phone });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.otp !== otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiresAt = null;
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: { id: user._id, fullName: user.fullName, phone: user.phone },
        });
    } catch (error) {
        console.error("Verify OTP Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.getMe = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findById(userId).select("-otp -otpExpiresAt");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("GetMe Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.loginWithPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid email or password" });
        }

        if (!user.password) {
            return res.status(400).json({ success: false, message: "Please use OTP login for this account" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                isAdmin: user.isAdmin,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.createAdminUser = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check email or phone already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ success: false, message: "Phone number already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
            isAdmin: true,
            isVerified: true,
        });

        res.json({
            success: true,
            message: "Admin user created successfully",
            userId: user._id,
        });
    } catch (err) {
        console.error(err);
        // Handle MongoDB duplicate key error
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({ success: false, message: `${field} already exists` });
        }
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET ALL ADMIN USERS
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isAdmin: true }).select("-otp -otpExpiresAt -password");
        return res.status(200).json({ success: true, users });
    } catch (error) {
        console.error("GetAllUsers Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error("DeleteUser Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};