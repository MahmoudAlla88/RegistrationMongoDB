const express = require("express");
const { signup, login, getProfile, logout } = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.post("/logout", logout);

module.exports = router;
