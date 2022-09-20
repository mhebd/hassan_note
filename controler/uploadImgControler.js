const asyncHdl = require('../util/asyncHdl');
const eMsg = require('../util/eMsg');
const imgur = require('imgur');
const path = require('path');
const fs = require('fs');

/**
*	@POST
*	/api/v1/upload-img
*	Limited
*/
exports.uploadImage = asyncHdl(async (req, res, next) => {

	console.log(req.file)

	// Upload image
	if(!req.file) {
		return next(new eMsg('image is required', 400));
	}

	const { filename: image } = req.file;

	const url = await imgur.uploadFile(req.file.destination+'/'+image);

	if(!url) {
		return next(new eMsg('Image uploading problem', 404));
	};

	// Remove uplading image from server
	fs.unlinkSync(req.file.destination+'/'+image);

	res.status(201).json({
		data: {
		  link: url.link,
    }
	})
});