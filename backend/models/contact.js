const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let contact = new Schema({
	email:{
		type:String
	},
	name:{
		type:String
	},
	socialId:{
		type:String
	},
	country:{
		type:String
	},
	contact:{
		type:String
	},
	category:{
		type:String
	},
	subcategory:{
		type:String
	},
	description:{
		type:String
	},
	created_date:{
		type:Date,
		default: new Date()
	}
	
});

module.exports = mongoose.model('contact',contact,'contact');