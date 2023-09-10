const mongoose = require("mongoose");

const UserGuideSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    guide_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Guide",
      required: true,
    },
    completed: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  
  }
);

UserGuideSchema.virtual("guide", {
  ref: "Guide",
  localField: "guide_id",
  foreignField: "_id",
  justOne: true,
  autopopulate: true,
});

UserGuideSchema.set("toObject", { virtuals: true });
UserGuideSchema.set("toJSON", { virtuals: true });

const UserGuide = mongoose.model("UserGuide", UserGuideSchema);

module.exports = UserGuide;
