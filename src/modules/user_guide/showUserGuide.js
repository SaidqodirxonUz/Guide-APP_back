const { NotFoundError } = require("../../shared/errors");
const Guide = require("./UserGuide");
/**
 * @param {object} deps
 * @param {import('./Guide')} deps.Guide
 */
async function showUserGuide({ id }) {
  const result = await Guide.findById(id);
  if (!result) {
    throw new NotFoundError("Guide topilmadi.");
  }

  return result;
}

module.exports = showUserGuide;
