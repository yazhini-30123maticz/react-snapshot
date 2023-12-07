const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let settings = new Schema({
	twitterUrl:{
		type:String
	},
	pinterestUrl:{
		type:String
	},
	instaUrl:{
		type:String
	},
	faceBookUrl:{
		type:String
	},
	YoutubeUrl:{
		type:String
	},
	LinkedinUrl:{
		type:String
	},
	copyright_text:{
		type:String
	},
	sitelogo:{
		type:String
	},
	find:{
		type:String,
		default:'findString'
	}
	
});

module.exports = mongoose.model('settings',settings,'settings');