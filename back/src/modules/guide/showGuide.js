const { NotFoundError } = require("../../shared/errors");
const Guide = require("./Guide");
const UserGuide = require("../user_guide/UserGuide");

const showGuideService = async ({ id }) => {
  try {
    const guide = await Guide.findById(id);

    if (!guide) {
      throw new NotFoundError("Guide topilmadi.");
    }

    const userGuides = await UserGuide.find({ guide_id: id });
    const revisionsCount = userGuides.length;

    guide.revisions = revisionsCount;
    await guide.save();

    const responseData = {
      _id: guide._id,
      title: guide.title,
      content: guide.content,
      revisions: guide.revisions,
    };

    return responseData;
  } catch (error) {
    throw error;
  }
};

module.exports = showGuideService;
