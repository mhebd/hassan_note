const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 4,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lower: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
		maxLength: 16,
	},
	gravatar: String,
	type: {
		type: String,
		enum: ['user'],
		default: 'user',
	},
	biodata: String,
	created: {
		type: Date,
		default: Date.now
	}
})

userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hash(this.password, 12);
})

const User = mongoose.model('User', userSchema);
module.exports = User;	