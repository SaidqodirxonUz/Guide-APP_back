const { NotFoundError } = require("../../shared/errors");
const User = require("./User");
const UserGuide = require("../user_guide/UserGuide");

const showUser = async ({ id }) => {
  try {
    const user = await User.findById(id).populate("userGuideCount");
    if (!user) {
      throw new NotFoundError("User Not Found.");
    }

    const userGuideCount = user.userGuideCount || 0;

    const userGuides = await UserGuide.find({ user_id: user._id });

    let todoGuides = 0;
    let readGuides = 0;

    userGuides.forEach((userGuide) => {
      if (userGuide.completed === false) {
        todoGuides++;
      } else if (userGuide.completed === true) {
        readGuides++;
      }
    });

    const result = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      role: user.role,
      username: user.username,
      password: user.password,
      total_guides: userGuideCount,
      todo_guides: todoGuides,
      read_guides: readGuides,
    };

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = showUser;
