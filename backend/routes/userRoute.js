const express = require("express");
const { signin, login } = require("../controllers/userController.js");
const auth = require("../middleware/auth");

const router = express.Router();

// Test endpoint to verify token
router.get('/test-auth', auth, (req, res) => {
    res.json({ message: 'Token is valid', userId: req.user.userId });
});

router.route('/signin').post(signin);
router.route('/login').post(login);

module.exports = router;
