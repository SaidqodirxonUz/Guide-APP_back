const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  postUserGuide,
  getUserGuides,
  showUserGuide,
  readUserGuide,
  deleteUserGuide,
  bulkGuideUser,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/isAdmin");

const router = express.Router();

router.post("/user-guides", isLoggedIn, isAdmin, postUserGuide);
router.post("/user-guides/bulk", isLoggedIn, isAdmin, bulkGuideUser);
router.get("/user-guides", isLoggedIn, getUserGuides);
router.get("/user-guides/:id", isLoggedIn, showUserGuide);
router.patch("/user-guides/:id/read", isLoggedIn, readUserGuide);
router.delete("/user-guides/:id", isLoggedIn, isAdmin, deleteUserGuide);

module.exports = router;
