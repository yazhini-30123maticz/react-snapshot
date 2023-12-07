const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newsletter = new Schema({
	
	email:{
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

module.exports = mongoose.model('newsletter',newsletter,'newsletter');