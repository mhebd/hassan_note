const asyncHdl = require('../util/asyncHdl');
const eMsg = require('../util/eMsg');
const Article = require('../model/Article');
const imgur = require('imgur');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

/**
*	@POST
*	/api/v1/article
*	Limited
*/
exports.createArticle = asyncHdl(async (req, res, next) => {
	const { title, excerpt, content, category, tags } = req.body;
	const { id } = req.user;

	if(!title || !content || !category) {
		return next(new eMsg('Article title, cover image, category and content is mandetory.', 400));
	};

	// Create a slug
	let slug = title.trim().toLowerCase().split(' ').join('_') + '-' + Date.now();

	// Create tags array
	const tagsArr = tags.split(','); 

	// Upload cover image
	if(!req.file) {
		return next(new eMsg('Cover image is required', 400));
	}

	const { filename: image } = req.file;
      
	await sharp(req.file.path)
    .resize(1020, 580)
    .jpeg({ quality: 90 })
    .toFile(
        path.resolve(req.file.destination,'resized',image)
    );
    fs.unlinkSync(req.file.path);

	const url = await imgur.uploadFile(req.file.destination+'/resized/'+image);

	if(!url) {
		return next(new eMsg('Image uploading problem', 404));
	};

	// Remove uplading image from server
	fs.unlinkSync(req.file.destination+'/resized/'+image);
	
	const article = await Article.create({
		title,
		excerpt,
		tags: tagsArr,
		content,
		slug,
		coverImage: url.link,
		category,
		writer: id,
	})

	res.status(201).json({
		success: true,
		message: {
			text: `New Article cleated success.`,
			type: 'success',
		},
		article,
	})
});


/**
*	@GET
*	/api/v1/article/:slug
*	Public
*/
exports.getArticle = asyncHdl(async (req, res, next) => {
	const { slug } = req.params;

	let article = await Article.findOne({ slug }).populate('writer').populate('category', ['name']);

	const id = article?._id;
	const views = article?.views;

	article = await Article.findByIdAndUpdate(id, {$set: {views: (views + 1) }}, {new: true});

	res.status(200).json({
		success: true,
		article,
	})
});


/**
*	@GET
*	/api/v1/article/featured
*	Public
*/
exports.getFeaturedArticle = asyncHdl(async (req, res, next) => {
	const featuredArticles = await Article.find().sort('-views').populate('writer').populate('category', ['name']).limit(1);

	res.status(200).json({
		success: true,
		featuredArticles,
	})
});



/**
*	@GET
*	/api/v1/article
*	Public
*/
exports.getArticles = asyncHdl(async (req, res, next) => {
	let limitVal = req.query.limit * 1 || 12;
	const articles = await Article.find().populate('writer', ['name']).populate('category', ['name']).sort('-created').limit(limitVal);

	res.status(200).json({
		success: true,
		articles,
	})
});




/**
*	@GET
*	/api/v1/article/by-category/:id
*	Public
*/
exports.getArticlesByCategory = asyncHdl(async (req, res, next) => {
	const { id } = req.params;
	const articles = await Article.find({ category: id }).populate('writer', ['name']).populate('category', ['name']).sort('-created').limit(12);

	res.status(200).json({
		success: true,
		articles,
	})
});


/**
*	@GET
*	/api/v1/article/search/:query
*	Public
*/
exports.getArticlesBySearch = asyncHdl(async (req, res, next) => {
	let limitVal = req.query.limit * 1 || 12;
	const { query } = req.params;
	const articles = await Article.find({ 
		$or: [
			{title: {$regex: query}},
			{content: {$regex: query}},
			{tags: {$regex: query}}
		]
	 }).populate('writer', ['name']).populate('category', ['name']).sort('-created').limit(limitVal);

	res.status(200).json({
		success: true,
		articles,
	})
});



/**
*	@GET
*	/api/v1/article/tags/:query
*	Public
*/
exports.getArticlesByTags = asyncHdl(async (req, res, next) => {
	let limitVal = req.query.limit * 1 || 4;
	const { query } = req.params;
	const articles = await Article.find({ 
		$or: [
			{tags: {$regex: query}},
		]
	 }).populate('writer', ['name']).populate('category', ['name']).sort('-created').limit(limitVal);

	res.status(200).json({
		success: true,
		articles,
	})
});


/**
*	@DELETE
*	/api/v1/article/:id
*	Limited
*/
exports.deleteArticle = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	await Article.findByIdAndDelete(id);

	res.status(200).json({
		success: true,
		message: {
			text: `Article deleted seccess.`,
			type: 'success',
		},
	})
});


/**
*	@PUT
*	/api/v1/article/:id
*	Limited
*/
exports.updateArticle = asyncHdl(async (req, res, next) => {
	const { title, excerpt, content, category, tags } = req.body;
	const { id } = req.params;

	let updatedField = {};
	if(title) updatedField.title = title;
	if(excerpt) updatedField.excerpt = excerpt;
	if(content) updatedField.content = content;
	if(category) updatedField.category = category;
	if(tags) updatedField.tags = tags.split(',');

	if(req.file) {
		const { filename: image } = req.file;
      
		await sharp(req.file.path)
			.resize(1020, 580)
			.jpeg({ quality: 90 })
			.toFile(
					path.resolve(req.file.destination,'resized',image)
			);
    fs.unlinkSync(req.file.path);

		const url = await imgur.uploadFile(req.file.destination+'/resized/'+image);

		if(!url) {
			return next(new eMsg('Image uploading problem', 404));
		};

		// Remove uplading image from server
		fs.unlinkSync(req.file.destination+'/resized/'+image);

		updatedField.coverImage = url.link;
	}

	const article = await Article.findByIdAndUpdate(id, { $set: updatedField }, {new: true})

	res.status(200).json({
		success: true,
		message: {
			text: `Article update success.`,
			type: 'success',
		},
		article,
	})
});