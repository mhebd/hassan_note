const asyncHdl = require('../util/asyncHdl');
const eMsg = require('../util/eMsg');
const Setting = require('../model/Setting');


/**
*	@POST
*	/api/v1/setting
*	Limited
*/
exports.createSetting = asyncHdl(async (req, res, next) => {
	const {siteName, quote, topMenu, socialMenu} = req.body;

	if(!siteName) {
		return next(new eMsg('Site name is required', 400))
	};

	let setting = await Setting.find();

	if(setting.length > 0) {
		let updatedField = {};
		updatedField.siteName = siteName;
		updatedField.quote = quote;
		updatedField.topMenu = topMenu;
		updatedField.socialMenu = socialMenu;

		setting = await Setting.findByIdAndUpdate(setting[0]._id, {$set: updatedField}, {new: true});
	} else {
    setting = await Setting.create({
    	siteName,
    	quote,
    	topMenu,
			socialMenu,
    })
	}

	res.status(201).json({
		success: true,
		message: {
			text: 'Site information changes success.',
			type: 'success',
		},
		setting,
	})
});



/**
*	@GET
*	/api/v1/setting
*	Public
*/
exports.getSetting = asyncHdl(async (req, res, next) => {
	const setting = await Setting.find();

	res.status(200).json({
		success: true,
		setting: setting[0],
	})
});