const mongoose = require("mongoose");

const skillsCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SkillCategory", skillsCategorySchema);
