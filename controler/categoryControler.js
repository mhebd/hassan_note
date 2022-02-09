const asyncHdl = require('../util/asyncHdl');
const eMsg = require('../util/eMsg');
const Category = require('../model/Category');
const Article = require('../model/Article');

/**
*	@POST
*	/api/v1/category
*	Limited
*/
exports.createCategory = asyncHdl(async (req, res, next) => {
	const { name, color, icon } = req.body;

	if(!name) {
		return next(new eMsg('Category Name is required.', 400));
	};

	const slug = name.trim().toLowerCase().split(' ').join('_');

	const category = await Category.create({
		name,
		slug,
		color,
		icon
	});

	res.status(201).json({
		success: true,
		message: {
			text: `Category created seccess.`,
			type: 'success',
		},
		category,
	})
});


/**
*	@GET
*	/api/v1/category
*	Public
*/
exports.getCategories = asyncHdl(async (req, res, next) => {
	const categories = await Category.find().sort('-created');

	// let cats = [];
	// categories.forEach(async cat => {
	// 	const n = await Article.find({ category : cat._id });
	// 	cat.articles = n.length;
	// 	cats.push(cat);
	// });

	// console.log(cats)

	res.status(200).json({
		success: true,
		categories,
	})
});

/**
*	@DELETE
*	/api/v1/category/:id
*	Limited
*/
exports.deleteCategory = asyncHdl(async (req, res, next) => {
	const { id } = req.params;

	await Category.findByIdAndDelete(id);

	res.status(200).json({
		success: true,
		message: {
			text: `Category deleted seccess.`,
			type: 'success',
		},
	})
});


/**
*	@PUT
*	/api/v1/category/:id
*	Limited
*/
exports.updateCategory = asyncHdl(async (req, res, next) => {
	const { name, icon, color } = req.body;
	const { id } = req.params;

	let updatedField = {};
	if(name) updatedField.name = name;
	if(color) updatedField.color = color;
	if(icon) updatedField.icon = icon;

	const category = await Category.findByIdAndUpdate(id, { $set: updatedField }, { new: true });

	res.status(200).json({
		success: true,
		message: {
			text: `Category updated success.`,
			type: 'success',
		},
		category,
	})
});