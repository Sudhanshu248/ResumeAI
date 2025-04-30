const express = require("express");
const { signin, login } = require("../controllers/userController.js");


const router = express.Router();

router.route('/signin').post(signin);
router.route('/login').post(login);

module.exports = router;
