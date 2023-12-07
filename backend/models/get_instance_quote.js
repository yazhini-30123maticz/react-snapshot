const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let get_instance_quote = new Schema({
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
	page:{
		type:String
	},
	created_date:{
		type:Date,
		default: new Date()
	}
	
});

module.exports = mongoose.model('get_instance_quote',get_instance_quote,'get_instance_quote');