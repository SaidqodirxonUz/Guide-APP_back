const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    content: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
