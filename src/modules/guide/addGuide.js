const UserGuide = require("../user_guide/UserGuide");
const User = require("../users/User");
const Guide = require("./Guide");

const addGuideService = async (data) => {
  let result = await Guide.create({ ...data });

  if (data.notify) {
    try {
      const users = await User.find();

      const userGuideIds = [];

      for (const user of users) {
        const userGuide = await UserGuide.create({
          user_id: user._id,
          guide_id: result._id,
        });
        userGuideIds.push(userGuide._id);

        await User.findByIdAndUpdate(
          user._id,
          {
            $push: { guides: result._id },
            $set: { guideCount: userGuideIds.length },
          },
          { new: true }
        );
      }
    } catch (error) {
      throw error;
    }
  }
  result = { ...result._doc, notify: data?.notify || false };
  return result;
};

module.exports = addGuideService;
