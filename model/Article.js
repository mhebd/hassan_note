const mongoose = require('mongoose');
const articleSchema = mongoose.Schema({
  title: {
  	type: String,
  	required: true,
  	minLength: 10,
  	maxLength: 100,
  	trim: true,
  },
  excerpt: {
  	type: String,
  	maxLength: 120,
  	trim: true,
  },
  tags: {
    type: [String],
    trim: true,
  },
  content: {
  	type: String,
  	required: true,
  	minLength: 10,
  },
  coverImage: {
  	type: String,
  	required: true
  },
  slug: {
  	type: String,
  	required: true,
  	trim: true,
  	lower: true,
		unique: true,
  },
  category: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Category',
  },
  writer: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'User',
  },
	isFeatured: {
		type: Boolean,
		default: false,
	},
	views: {
		type: Number,
		default: 0,
	},
  created: {
  	type: Date,
  	default: Date.now,
  }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;