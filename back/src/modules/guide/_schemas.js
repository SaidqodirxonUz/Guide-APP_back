const Joi = require("joi");

exports.addGuideSchema = {
  body: Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    notify: Joi.boolean(),
  }),
};

exports.patchGuideSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
  body: Joi.object({
    title: Joi.string(),
    content: Joi.string(),
    notify: Joi.boolean(),
  }),
};

exports.allGuideSchema = {
  query: Joi.object({
    q: Joi.string(),
    sort: Joi.object({
      by: Joi.string().valid("_id"),
      order: Joi.string().valid("asc", "desc"),
    }),
    page: Joi.object({
      offset: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).default(3),
    }),
  }),
};
