const express = require('express');
const { private, limited } = require('../middleware/auth');
const { createSetting, getSetting } = require('../controler/settingControler');
const router = express.Router();

router.route('/').post(private, limited, createSetting).get(getSetting);

module.exports = router;