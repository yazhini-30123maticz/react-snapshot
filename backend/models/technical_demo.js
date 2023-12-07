const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let technical_demo = new Schema({
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
	requirement:{
		type:String
	},
	phone_number:{
		type:String
	},
	created_date:{
		type:Date,
		default: new Date()
	}
	
});

module.exports = mongoose.model('technical_demo',technical_demo,'technical_demo');