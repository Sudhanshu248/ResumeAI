const express = require("express");
const { signin, login } = require("../controllers/user.controller.js");

const router = express.Router();

router.route('/signin').post(signin);
router.route('/login').post(login);

module.exports = router;
