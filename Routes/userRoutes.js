const express = require('express');
const { SignUpUser, authUser } = require('../Controllers/userController');

const router = express.Router();

router.route('/sign-up').post(SignUpUser);
router.route('/login').post(authUser);

module.exports = router;