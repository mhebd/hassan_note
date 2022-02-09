const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
  name: {
  	type: String,
  	required: true,
  	trim: true,
  	maxLength: 30,
  	unique: true,
  },
  color: String,
  icon: String,
	articles: {
		type: Number,
		default: 0,
	},
  created: {
  	type: Date,
  	default: Date.now,
  }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;