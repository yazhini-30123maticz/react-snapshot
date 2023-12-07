const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let free_demo = new Schema({
	name:{
		type:String
	},
	email:{
		type:String
	},
	contactnumber:{
		type:Number
	},
	country:{
		type:String
	},
	identity:{
		type:String
	},
	description:{
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

module.exports = mongoose.model('free_demo',free_demo,'free_demo');