const Joi = require("joi");

exports.postRegisterUserSchema = {
  body: Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    username: Joi.string().required(),
    age: Joi.number().required(),
    password: Joi.string().required(),
    role: Joi.string(),
  }),
};

exports.postLoginUserSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

exports.patchMeSchema = {
  body: Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    age: Joi.number(),
  }),
};

exports.showUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),
};

exports.allUserSchema = {
  query: Joi.object({
    q: Joi.string(),
    sort: Joi.object({
      by: Joi.string().valid("age"),
      order: Joi.string().valid("asc", "desc"),
    }),
    page: Joi.object({
      offset: Joi.number().integer().min(0).default(0),
      limit: Joi.number().integer().min(1).default(10),
    }),
    filters: {
      role: Joi.valid("admin", "employee"),
    },
  }),
};

exports.patchUserSchema = {
  params: Joi.object({
    id: Joi.string(),
  }),

  body: Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    age: Joi.number(),
    role: Joi.string(),
  }),
};

exports.deleteUserSchmea = {
  params: Joi.object({
    id: Joi.string(),
  }),
};
