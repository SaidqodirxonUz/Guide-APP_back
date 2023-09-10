const { NotFoundError } = require("../../shared/errors");
const UserGuide = require("./UserGuide");

async function readUserGuide({ id }) {
  try {
    const existing = await UserGuide.findOne({ _id: id });

    if (!existing) {
      throw new NotFoundError("Guide topilmadi.");
    }

    const updatedGuide = await UserGuide.findByIdAndUpdate(
      id,
      { completed: true },
      { new: true }
    );

    return updatedGuide;
  } catch (error) {
    throw error;
  }
}

module.exports = readUserGuide;