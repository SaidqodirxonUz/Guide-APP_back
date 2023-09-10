const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    last_name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    age: {
      type: mongoose.SchemaTypes.Number,
    },
    role: {
      type: mongoose.SchemaTypes.String,
      enum: ["admin", "employee"],
      required: true,
    },
    username: {
      type: mongoose.SchemaTypes.String,
      required: true,
      unique: true,
    },
    password: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);

const User = mongoose.model("User", UserSchema);

UserSchema.virtual("userGuideCount", {
  ref: "UserGuide",
  localField: "_id",
  foreignField: "user_id",
  count: true,
});

module.exports = User;
