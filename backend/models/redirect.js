const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let redirect = new Schema({
	Oldurl: { 
		type: String,
		default:""
	},
	Newurl:{
		type:String,
		default:""
	},
	created_date:{
		type:Date,default: new Date()
	},
});

module.exports = mongoose.model('redirect',redirect,'redirect');