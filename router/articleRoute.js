const express = require('express');
const multer = require('multer');
const path = require('path');
const { private, limited } = require('../middleware/auth');
const { createArticle, getArticle, getArticles, getFeaturedArticle, getArticlesByCategory, getArticlesBySearch, deleteArticle, updateArticle, getArticlesByTags } = require('../controler/articleControler');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../upload'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

router.route('/by-category/:id').get(getArticlesByCategory);
router.route('/search/:query').get(getArticlesBySearch);
router.route('/tags/:query').get(getArticlesByTags);
router.route('/featured').get(getFeaturedArticle);
router.route('/').post(private, limited, upload.single('coverImage'), createArticle).get(getArticles);
router.route('/:slug').get(getArticle);
router.route('/:id').delete(private, limited, deleteArticle).put(private, limited, upload.single('coverImage'), updateArticle);

module.exports = router;