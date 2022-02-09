const mongoose = require('mongoose');
const pageSchema = mongoose.Schema({
  title: {
  	type: String,
  	required: true,
  	trim: true,
  	unique: true,
  },
  content: {
  	type: String,
  	required: true,
  },
  slug: {
  	type: String,
  	required: true,
  	trim: true,
  	lower: true,
  },
	inTopMenu: {
		type: Boolean,
		default: false,
	},
	inFooterMenu: {
		type: Boolean,
		default: true,
	},
  created: {
  	type: Date,
  	default: Date.now,
  }
});

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;