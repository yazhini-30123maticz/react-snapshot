const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let category_career = new Schema({
	status:{
		type:String,
		default:'1'
	},
	category_name:{
		type:String
	}
});

module.exports = mongoose.model('category_career ',category_career ,'category_career ');