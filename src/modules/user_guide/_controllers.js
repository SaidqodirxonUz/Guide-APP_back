const express = require("express");
const httpValidator = require("../../shared/http-validator");
const {
  postUserGuideSchema,
  postBulkUserGuideSchema,
  readUserGuideSchema,
  showUserGuideSchema,
} = require("./_schemas");

const addUserGuide = require("./addUserGuide");
const allUserGuide = require("./allUserGuide");
const getUserGuide = require("./showUserGuide");
const bulkGuide = require("./bulkGuide");
const readUserGuideS = require("./readUserGuide");

const bulkGuideUser = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postBulkUserGuideSchema);

    const result = await bulkGuide(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const postUserGuide = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postUserGuideSchema);

    const result = await addUserGuide(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const readUserGuide = async (req, res, next) => {
  try {
    const { error } = readUserGuideSchema.validate({ params: req.params });

    if (error) {
      throw new Error(error.details[0].message);
    }

    const result = await readUserGuideS({
      id: req.params.id,
    });

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getUserGuides = async (req, res, next) => {
  try {
    const user_id = req.user?.id;
    const page = req.query?.page || {};
    const pageSize = parseInt(req.query?.pageSize) || 3;
    const completed = req.query.filters?.completed;

    const result = await allUserGuide({
      user_id,
      page,
      pageSize,
      completed,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const showUserGuide = async (req, res, next) => {
  try {
    const result = await getUserGuide(
      { id: req.params.id },
      showUserGuideSchema
    );

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postUserGuide,
  readUserGuide,
  bulkGuideUser,
  getUserGuides,
  showUserGuide,
};
