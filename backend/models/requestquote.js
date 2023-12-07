const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let requestquote = new Schema({
	email:{
		type:String
	},
	name:{
		type:String
	},
	contact:{
		type:String
	},
	country:{
		type:String
	},
	category:{
		type:String
	},
	
	subcategory:{
		type:String
	},
	file:{
		type:String
	},
	requirement:{
		type:String
	},
	created_date:{
		type:Date,
		default: new Date()
	}
	
});

module.exports = mongoose.model('requestquote',requestquote,'requestquote');