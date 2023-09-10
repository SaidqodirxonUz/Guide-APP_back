const { NotFoundError } = require("../../shared/errors");
const Guide = require("./Guide");

const removeGuideService = async ({ id }) => {
  const existing = await Guide.findById(id);

  if (!existing) {
    throw new NotFoundError("Guide Not Found.");
  }

  await Guide.findByIdAndDelete(existing._id);

  return existing;
};

module.exports = removeGuideService;
