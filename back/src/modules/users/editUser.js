const { hash } = require("bcryptjs");
const { NotFoundError, BadRequestError } = require("../../shared/errors");
const User = require("./User");

const editUserS = async ({ id, ...changes }) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, changes, {
      new: true,
    });

    if (!updatedUser) {
      throw new NotFoundError("User Not Found.");
    }

    if (changes.password) {
      const hashedPassword = await hash(changes.password, 10);

      updatedUser.password = hashedPassword;
      await updatedUser.save();
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

module.exports = editUserS;
