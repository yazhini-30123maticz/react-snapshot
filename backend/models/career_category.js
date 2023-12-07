const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let career_category = new Schema({
	status:{
		type:String,
		default:'1'
	},
	position_name:{
		type:String
	},
	position:{
        type:String
	},
	location:{
		type:String
	},
	experience:{
		type:String
	},
	description:{
		type:String
	},
	required_skills:{
		type:String
	},
	key_responsibilities:{
		type:String
	},
	created_date:{
		type:Date,
		default: new Date()
	}
	
});

module.exports = mongoose.model('career_category',career_category,'career_category');