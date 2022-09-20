const asyncHdl = require('../util/asyncHdl');
const eMsg = require('../util/eMsg');
const Comment = require('../model/Comment');


/**
*	@POST
*	/api/v1/comment
*	Private
*/
exports.createComment = asyncHdl(async (req, res, next) => {
	const { id } = req.user;
	const { article, responseTo, content } = req.body;

	if(!article || !content) {
		return next(new eMsg('Article Id and comment is required.', 400));
	};

	const comment = await Comment.create({
		user: id,
		article,
		responseTo,
		content,
	})

	res.status(201).json({
		success: true,
		comment,
	})
});


/**
*	@GET
*	/api/v1/comment/:articleId
*	Public
*/
exports.getRootComments = asyncHdl(async (req, res, next) => {
	const { articleId } = req.params;

	const rootComments = await Comment.find({ article: articleId, responseTo: null }).populate('user', ['name', 'gravatar']); 

	res.status(200).json({
		success: true,
		rootComments,
	})
});



/**
*	@GET
*	/api/v1/comment/response/:responseId
*	Public
*/
exports.getResponseComments = asyncHdl(async (req, res, next) => {
	const { responseId } = req.params;

	const resComments = await Comment.find({ responseTo: responseId }).populate('user', ['name', 'gravatar']);

	res.status(200).json({
		success: true,
		resComments,
	})
});