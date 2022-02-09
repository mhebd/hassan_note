const mongoose = require('mongoose');
const commentSchema = mongoose.Schema({
  user: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'User'
  },
  article: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Article'
  },
  responseTo: {
  	type: mongoose.Schema.Types.ObjectId,
  	ref: 'Comment',
  	default: null,
  },
  content: {
  	type: String,
  	required: true,
  	trim: true,
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;