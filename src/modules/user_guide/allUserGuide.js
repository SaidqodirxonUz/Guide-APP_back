const { NotFoundError } = require("../../shared/errors");
const UserGuide = require("./UserGuide");
const Guide = require("../guide/Guide");

async function allUserGuide(req) {
  const user_id = req.user_id; // undefined
  const completed = req.completed;
  const offset = parseInt(req.page?.offset) || 0;
  const limit = parseInt(req.page?.limit) || 3;
  const query = {
    user_id: user_id,
  };

  if (completed !== undefined) {
    query.completed = completed;
  }

  const totalDocs = await UserGuide.countDocuments(query);
  const result = await UserGuide.find(query).skip(offset).limit(limit).exec();

  if (!result || result.length === 0) {
    throw new NotFoundError("UserGuide topilmadi.");
  }

  const guidePromises = [];
  for (const item of result) {
    try {
      const guide = await Guide.findById(item.guide_id).exec();

      if (!guide) {
        throw new Error("There is no such guide.");
      }

      guidePromises.push({
        _id: item._id,
        guide: { ...guide._doc },
        ...(item.completed === false ? { completed: false } : {}),
      });
    } catch (error) {
      console.error(error);
    }
  }


  return {
    data: guidePromises,
    pageInfo: {
      total: totalDocs,
      offset: offset,
      limit: limit,
    },
  };
}

module.exports = allUserGuide;
