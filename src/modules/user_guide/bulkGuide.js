const User = require("../users/User");
const UserGuide = require("./UserGuide");
/**
 * @param {object} deps
 * @param {import('./UserGuide')} deps.Guide
 */
async function bulkGuide(data) {
  const bulk = data.user_ids.map((e) => ({
    user_id: e,
    guide_id: data.guide_id,
    completed: data?.completed || false,
  }));

  const result = await UserGuide.create(bulk);

  await User.findByIdAndUpdate(data.user_ids, {
    $push: { guides: data.guide_id },
  });

  return result;
}

module.exports = bulkGuide;
