const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let asked_questions = new Schema({
	question:{
		type:String
	},
	answer:{
		type:String
	},
	status:{
		type:Number,
		default:1
	},
	created_date:{
		type:Date,
		default: new Date()
	}
	
});

module.exports = mongoose.model('asked_questions',asked_questions,'asked_questions');