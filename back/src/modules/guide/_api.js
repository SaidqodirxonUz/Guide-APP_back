const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  addGuide,
  showGuide,
  deleteGuide,
  getGuide,
  patchGuide,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/isAdmin");

const router = express.Router();

router.post("/guides", isLoggedIn, isAdmin, addGuide);
router.get("/guides", isLoggedIn, getGuide);
router.get("/guides/:id", isLoggedIn, showGuide);
router.patch("/guides/:id", isLoggedIn, isAdmin, patchGuide);
router.delete("/guides/:id", isLoggedIn, isAdmin, deleteGuide);

module.exports = router;
