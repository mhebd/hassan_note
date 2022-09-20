const express = require('express');
const { private, limited } = require('../middleware/auth');
const { createCategory, getCategories, deleteCategory, updateCategory } = require('../controler/categoryControler');
const router = express.Router();

router.route('/').post(private, limited, createCategory).get(getCategories);
router.route('/:id').delete(private, limited, deleteCategory).put(private, limited, updateCategory);

module.exports = router;