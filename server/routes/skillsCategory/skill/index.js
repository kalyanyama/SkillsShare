const express = require("express");
const model = require("../../../models");
const jwt = require("jsonwebtoken");
const auth = require("../../../middlewares/jwt");
const router = express.Router();

// router.post("/create", auth, async (req, res,next) => {
//   try {
//     const skill = new model.skills({
//       name: req.body.name,
//       category_id: req.body.category_id,
//       description: req.body.description,
//     });
//     const saved = await skill.save();
//     res.json({ success: true, skill: saved });
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message });
//   }
// });

router.get("/", async (req, res, next) => {
  try {
    const result = await model.skills.find();
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    const skillId = req.params.id;

    const skill = await model.skills.findById(skillId);
    if (!skill) {
      return res.status(404).json({ success: false, error: "Skill not found" });
    }

    const response = {
      success: true,
      data: skill,
    };

    if (req.user) {
      const userSkills = await model.userskills
        .find({ skill: skillId })
        .populate({
          path: "user",
          match: { role: "tutor" },
          select: "name email role",
        });

      const tutors = userSkills
        .filter((entry) => entry.user)
        .map((entry) => ({
          _id: entry.user._id,
          name: entry.user.name,
          email: entry.user.email,
          role: entry.user.role,
          bio: entry.user.bio,
          experienceLevel: entry.experienceLevel,
          note: entry.description,
        }));

      response.tutors = tutors;
    }

    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
