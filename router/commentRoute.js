const express = require('express');
const { private, limited } = require('../middleware/auth');
const { createComment, getRootComments, getResponseComments } = require('../controler/commentControler');
const router = express.Router();

router.route('/response/:responseId').get(getResponseComments);
router.route('/').post(private, createComment);
router.route('/:articleId').get(getRootComments)

module.exports = router;