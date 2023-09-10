const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postRegisterUserSchema,
  postLoginUserSchema,
  patchMeSchema,
  patchUserSchema,
  allUserSchema,
} = require("./_schemas");
const addUser = require("./addUser");
const loginUser = require("./loginUser");
const editUserS = require("./editUser");
const showUser = require("./showUser");
const removeUser = require("./removeUser");
const allUser = require("./allUser");
const { UnauthorizedError, BadRequestError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postRegisterUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postRegisterUserSchema);

    const result = await addUser(req.body);

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postLoginUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postLoginUserSchema);

    const result = await loginUser(req.body);

    res.status(200).json({
      data: {
        token: result,
      },
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(403).json({
        message: "Incorrect username or password",
      });
    }
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const editUserMe = async (req, res, next) => {
  const { error } = patchMeSchema.body.validate(req.body);

  if (error) {
    const details = error.details.map((err) => err.message).join(", ");
    return next(new BadRequestError(`Validation error: ${details}`));
  }

  try {
    const result = await editUserS({
      id: req.params.id || req.user.id,
      ...req.body,
    });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchUserSchema);
    const result = await editUserS({
      id: req.params.id || req.user.id,
      ...req.body,
    });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const getMe = async (req, res, next) => {
  try {
    const result = await showUser({ id: req.user.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const showOneUser = async (req, res, next) => {
  try {
    const result = await showUser({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const getUsers = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allUserSchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allUser({ ...query, page: { limit, offset } });

    res.status(200).json({
      data: result.data,
      pageInfo: result.pageInfo,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */

const deleteUser = async (req, res, next) => {
  try {
    const result = await removeUser({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postRegisterUser,
  postLoginUser,
  editUserMe,
  editUser,
  getMe,
  deleteUser,
  getUsers,
  showOneUser,
};
