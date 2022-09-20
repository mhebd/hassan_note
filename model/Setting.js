const mongoose = require('mongoose');
const settingSchema = mongoose.Schema({
  siteName: {
  	type: String,
  	required: true,
  	trim: true,
  },
  topMenu: [{
  	title: String,
  	link: String,
  }],
  quote: {
  	text: String,
  	writer: String,
  },
	socialMenu: [{
		name: String,
		icon: String,
		link: String,
	}]
});

const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;