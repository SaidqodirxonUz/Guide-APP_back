const { NotFoundError } = require("../../shared/errors");
const UserGuide = require("../user_guide/UserGuide");
const User = require("../users/User");
const Guide = require("./Guide");

const editGuideService = async ({ id, ...changes }) => {
  const existing = await Guide.findById(id);

  if (!existing) {
    throw new NotFoundError("Guide Not Found.");
  }
  if (changes.notify) {
    try {
      // Find all users
      const users = await User.find();

      // Create UserGuides for all users
      const userGuideIds = [];

      for (const user of users) {
        const userGuide = await UserGuide.create({
          user_id: user._id,
          guide_id: id,
        });
        userGuideIds.push(userGuide._id);

        await User.findByIdAndUpdate(
          user._id,
          {
            $push: { guides: id },
            $set: { guideCount: userGuideIds.length },
          },
          { new: true }
        );
      }

    } catch (error) {
      console.error("Error while creating UserGuides:", error);
    }
  }
  // Only allow updating specific fields in the document
  const allowedUpdates = {
    title: changes.title,
    content: changes.content,
  };
  let data = await Guide.findByIdAndUpdate(id, allowedUpdates, { new: true });

  data = { ...data._doc, notify: changes?.notify || false };

  return data;
};

module.exports = editGuideService;
