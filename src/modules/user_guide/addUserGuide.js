const User = require("../users/User");
const UserGuide = require("./UserGuide");
async function addUserGuide(data) {
  const result = await UserGuide.create({
    ...data,
  });
  await User.findByIdAndUpdate(data.user_id, {
    $push: { guides: data.guide_id },
  });

  return result;
}

module.exports = addUserGuide;
