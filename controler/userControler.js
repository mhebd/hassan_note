const asyncHdl = require('../util/asyncHdl');
const eMsg = require('../util/eMsg');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

/**
	=> @POST
	=> /api/v1/user
	=> Public
*/
exports.createUser = asyncHdl(async (req, res, next) => {
	const { name, email, password, password2 } = req.body;

	// Check any fields are not missing
	if(!name || !email || !password || !password2 ) {
		return next(new eMsg('All the fields are required', 400));
	};

	// Chack email is valid
	if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
		return next(new eMsg('Email is not valid', 400))
	};

	// Chack if this email is already exist
	const hasUser = await User.findOne({ email });
	if(hasUser) {
		return next(new eMsg('This user is already exist.', 400));
	};

	// Chack password & confirm password match
	if(password !== password2) {
		return next(new eMsg('Your password and confirm password did not match', 400))
	};

	// Create gravatar
	const gravatarUrl = gravatar.url(email, { s: 200, r: 'x', d: 'retro'}, true);

	// Create user
	const user = await User.create({
		name,
		email,
		password,
		gravatar: gravatarUrl,
	});

	// Create token
	const token = await jwt.sign({
		id: user._id,
		name: user.name,
		type: user.type,
	}, process.env.SECRET, {
		expiresIn: process.env.EXPIRES
	})

	res.status(201).json({
		success: true,
		message: {
			text: `Congratulation! ${user.name}.`,
			type: 'success',
		},
		user,
		token,
	})
});


/**
	=> @POST
	=> /api/v1/user
	=> Public
*/
exports.loginUser = asyncHdl(async (req, res, next) => {
	const { email, password } = req.body;

	// Check any fields are not missing
	if(!email || !password) {
		return next(new eMsg('All the fields are required', 400));
	};

	// Chack has user
	const user = await User.findOne({email});
	if(!user) {
		return next(new eMsg('User not found', 404));
	};

	// Varify passwrod
	if(!(await bcrypt.compare(password, user.password))) {
		return next(new eMsg('Email & passwrod did not match', 404))
	};

	// Create token
	const token = await jwt.sign({
		id: user._id,
		name: user.name,
		type: user.type,
	}, process.env.SECRET, {
		expiresIn: process.env.EXPIRES
	})

	res.status(200).json({
		success: true,
		message: {
			text: `Welcome ${user.name}.`,
			type: 'success',
		},
		user,
		token,
	})
});


/**
*	@GET
*	/api/v1/user
*	Private
*/
exports.getUser = asyncHdl(async (req, res, next) => {
	const { id } = req.user;
	const user = await User.findById(id).select('-password');

	res.status(200).json({
		success: true,
		user,
	})
});



/**
*	@PUT
*	/api/v1/user
*	Limited
*/
exports.updateUser = asyncHdl(async (req, res, next) => {
	const { id } = req.user;
	const {name, biodata} = req.body;

	let updatedField = {};
	if(name) updatedField.name = name;
	if(biodata) updatedField.biodata = biodata;

	const user = await User.findByIdAndUpdate(id, {$set: updatedField}, {new: true});

	res.status(200).json({
		success: true,
		message: {
			text: 'Profile updated success',
			type: 'success',
		},
		user,
	})
});