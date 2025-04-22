const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillCategory",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);
