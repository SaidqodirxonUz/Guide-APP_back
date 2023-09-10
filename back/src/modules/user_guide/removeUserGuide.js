const { NotFoundError } = require("../../shared/errors");
const Guide = require("./UserGuide");

const removeUserGuide = async ({ id }) => {
  const existing = await Guide.findOne({ _id: id });

  if (!existing) {
    throw new NotFoundError("Guide topilmadi.");
  }

  return await Guide.findByIdAndDelete(id);
};

module.exports = removeUserGuide;
