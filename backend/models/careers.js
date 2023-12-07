const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let careers = new Schema({
	email:{
		type:String
	},
	name:{
		type:String
	},
	experience:{
		type:String
	},
	phone_number:{
		type:String
	},
	resume:{
		type:String
	},
	created_date:{
		type:Date,
		default: new Date()
	}
	
});

module.exports = mongoose.model('careers',careers,'careers');