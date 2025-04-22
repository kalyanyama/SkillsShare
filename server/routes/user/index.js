const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const model = require("../../models");
const auth = require("../../middlewares/jwt");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password, role, skills } = req.body;

    const existingUser = await model.user.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new model.user({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await user.save();

    if (role === "tutor" && Array.isArray(skills)) {
      const userSkillDocs = skills.map((skillId) => ({
        user: savedUser._id,
        skill: skillId,
      }));

      await model.userskills.insertMany(userSkillDocs);
    }

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await model.user.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN || "30d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const user = await model.user
      .findById(req.user.user_id)
      .select("-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (user.role === "tutor") {
      const skills = await model.userskills
        .find({ user: user._id })
        .populate("skill");

      const rooms = await model.chatroom.find({
        $or: [
          { userId: user._id }, 
          { tutorId: user._id },
        ],
      });

      return res.json({
        success: true,
        user,
        skills,
        rooms,
      });
    } else if (user.role === "student") {
      const rooms = await model.chatroom.find({
        userId: user._id,
      });

      return res.json({
        success: true,
        user,
        rooms,
      });
    } else {
      return res.json({
        success: true,
        user,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const userId = req.user.user_id;

    await model.chatroom.deleteMany({ senderId: userId });
    await model.chatmessages.deleteMany({ receiverId: userId });
    await model.skills.deleteMany({ userId });

    const user = await model.user.findById(userId);
    
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await user.remove();

    res.json({
      success: true,
      message: "Account and all related data deleted successfully",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
