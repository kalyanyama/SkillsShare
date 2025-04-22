const express = require("express");
const model = require("../../models");
const router = express.Router();
const auth = require("../../middlewares/jwt");

//  {
//       "name": "Frontend Frameworks & Libraries",
//       "skills": [
//         {
//           "name": "React",
//           "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
//           "description": "Library for building interactive UIs."
//         },
//         {
//           "name": "Next.js",
//           "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
//           "description": "React-based framework with server-side rendering and API routes."
//         },
//         {
//           "name": "Angular",
//           "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
//           "description": "Full-fledged framework for large-scale frontend apps."
//         },
//         {
//           "name": "Vue.js",
//           "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
//           "description": "Progressive framework for building UIs and SPAs."
//         },
//         {
//           "name": "Tailwind CSS",
//           "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
//           "description": "Utility-first CSS framework for rapid UI development."
//         },
//         {
//           "name": "Bootstrap",
//           "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
//           "description": "Popular CSS toolkit for responsive designs."
//         }
//       ]
//     }

router.post("/create", auth, async (req, res, next) => {
  try {
    const skillsCategory = new model.skillsCategory({ name: req.body.name });

    const savedCategory = await skillsCategory.save();

    let savedSkills = [];

    if (req.body.skills && Array.isArray(req.body.skills)) {
      const skillsList = req.body.skills.map((item) => ({
        category_id: savedCategory._id,
        name: item.name,
        description: item.description,
        image: item.image,
      }));

      savedSkills = await model.skills.insertMany(skillsList);
    }

    res.json({
      success: true,
      skillsCategory: savedCategory,
      skills: savedSkills,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const categories = await model.skillsCategory.find();

    const result = await Promise.all(
      categories.map(async (cat) => {
        const skills = await model.skills.find({ category_id: cat._id });
        return {
          ...cat.toObject(),
          skills,
        };
      })
    );

    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await model.skillsCategory.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Skill category not found." });
    }

    res.status(200).json({ message: "Skill category deleted successfully." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
