const express = require('express');
const { private, limited } = require('../middleware/auth');
const { createUser, loginUser, getUser, updateUser } = require('../controler/userControler');
const router = express.Router();

router.route('/login').post(loginUser);
router.route('/').post(createUser).get(private, getUser).put(private, limited, updateUser);

module.exports = router;