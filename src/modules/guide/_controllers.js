const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  addGuideSchema,
  patchGuideSchema,
  allGuideSchema,
} = require("./_schemas");
const addGuideService = require("./addGuide");
const editGuideService = require("./editGuide");
const showGuideService = require("./showGuide");
const removeGuideService = require("./removeGuide");
const allGuideService = require("./allGuide");
const { UnauthorizedError } = require("../../shared/errors");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const addGuide = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, addGuideSchema);

    const result = await addGuideService(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return res.status(403).json({
        message: "Forbidden",
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
const patchGuide = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, patchGuideSchema);
    const result = await editGuideService({
      id: req.params.id,
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
const showGuide = async (req, res, next) => {
  try {
    const result = await showGuideService({ id: req.params.id });

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

const getGuide = async (req, res, next) => {
  try {
    httpValidator({ query: req.query }, allGuideSchema);

    const { query } = req;
    const offset =
      query && query.page && query.page.offset
        ? parseInt(query.page.offset)
        : undefined;
    const limit =
      query && query.page && query.page.limit
        ? parseInt(query.page.limit)
        : undefined;

    const result = await allGuideService({
      q: query.q,
      sort: query.sort,
      page: { limit, offset },
    });

    res.status(200).json({
      data: result.guide,
      pageInfo: {
        total: result.total,
        offset: result.offset,
        limit: result.limit,
      },
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
const deleteGuide = async (req, res, next) => {
  try {
    const result = await removeGuideService({ id: req.params.id });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addGuide,
  patchGuide,
  showGuide,
  deleteGuide,
  getGuide,
};
