const Joi = require("joi");

exports.postUserGuideSchema = {
  body: Joi.object({
    user_id: Joi.string().required(),
    guide_id: Joi.string().required(),
    completed: Joi.boolean(),
  }),
};

exports.postBulkUserGuideSchema = {
  body: Joi.object({
    user_ids: Joi.array().required(),
    guide_id: Joi.string().required(),
    completed: Joi.boolean(),
  }),
};

exports.readUserGuideSchema = Joi.object({
  params: Joi.object({
    id: Joi.string(),
  }),
});
exports.showUserGuideSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.deleteUserGuideSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
