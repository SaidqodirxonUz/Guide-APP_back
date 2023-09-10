const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");
const {
  postRegisterUser,
  postLoginUser,
  getMe,
  editUserMe,
  editUser,
  getUsers,
  showOneUser,
  deleteUser,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/isAdmin");

const router = express.Router();

router.post("/users", isLoggedIn, isAdmin, postRegisterUser);
router.post("/users/login", postLoginUser);
router.get("/users/me", isLoggedIn, getMe);
router.get("/users", isLoggedIn, getUsers);
router.get("/users/:id", isLoggedIn, isAdmin, showOneUser);
router.patch("/users/me", isLoggedIn, editUserMe);
router.patch("/users/:id", isLoggedIn, isAdmin, editUser);

router.delete("/users/:id", isLoggedIn, isAdmin, deleteUser);

module.exports = router;
