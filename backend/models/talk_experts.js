const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let talk_experts = new Schema({
	email:{
		type:String
	},
	name:{
		type:String
	},
	socialMediaId:{
		type:String
	},
	country:{
		type:String
	},
	message:{
		type:String
	},
	phone_number:{
		type:String
	},
	page:{
		type:String
	},
	created_date:{
		type:Date,
		default: new Date()
	}
	
});

module.exports = mongoose.model('talk_experts',talk_experts,'talk_experts');