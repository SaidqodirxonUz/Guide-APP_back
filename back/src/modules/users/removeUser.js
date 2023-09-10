const { NotFoundError } = require("../../shared/errors");
const User = require("./User");

const removeUser = async ({ id }) => {
  const existing = await User.findById(id);

  if (!existing) {
    throw new NotFoundError("User Not Found.");
  }

  await User.findByIdAndDelete(existing._id);

  return "User has been successfully removed.";
};

module.exports = removeUser;
