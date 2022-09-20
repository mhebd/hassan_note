const asyncHdl = require('../util/asyncHdl');
const eMsg = require('../util/eMsg');
const Page = require('../model/Page');

/**
*	@POST
*	/api/v1/page
*	Limited
*/
exports.createPage = asyncHdl(async (req, res, next) => {
	const { title, content, inTopMenu, inFooterMenu } = req.body;

	if(!title || !content) {
		return next(new eMsg('Page title and content is required.', 400));
	};

	const slug = title.trim().split(' ').join('-') + '-' + Math.round(Math.random() * 100);

	const page = await Page.create({
		title,
		content,
		slug,
		inTopMenu,
		inFooterMenu,
	});

	res.status(201).json({
		success: true,
		message: {
			text: `Page created success.`,
			type: 'success',
		},
		page,
	})
});


/**
*	@GET
*	/api/v1/page
*	Public
*/
exports.getPages = asyncHdl(async (req, res, next) => {
	const pages = await Page.find().sort('-title');

	res.status(200).json({
		success: true,
		pages,
	})
});



/**
*	@GET
*	/api/v1/page/:slug
*	Public
*/
exports.getPage = asyncHdl(async (req, res, next) => {
	const { slug } = req.params;

	const page = await Page.findOne({ slug });

	res.status(200).json({
		success: true,
		page,
	})
});


/**
*	@PUT
*	/api/v1/page/:id
*	Limited
*/
exports.updatePage = asyncHdl(async (req, res, next) => {
	const { title, content, inTopMenu, inFooterMenu } = req.body;
	const { id } = req.params;

	let updatedField = {};
		updatedField.title = title;
		updatedField.content = content;
		updatedField.inTopMenu = inTopMenu;
		updatedField.inFooterMenu = inFooterMenu;

	const page = await Page.findByIdAndUpdate(id, {$set: updatedField}, {new: true});

	res.status(200).json({
		success: true,
		message: {
			text: `Page updated success.`,
			type: 'success',
		},
		page,
	})
});



/**
*	@DELETE
*	/api/v1/page/:id
*	Limited
*/
exports.deletePage = asyncHdl(async (req, res, next) => {
	const { id } = req.params;
	
	await Page.findByIdAndDelete(id);

	res.status(200).json({
		success: true,
		message: {
			text: `Page Deleted success.`,
			type: 'success',
		}
	})
});