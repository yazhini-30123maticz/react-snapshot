const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let admin_users = new Schema({
	email:{
		type:String
	},
	password:{
		type:String
	}
	
});

module.exports = mongoose.model('admin_users',admin_users,'admin_users');