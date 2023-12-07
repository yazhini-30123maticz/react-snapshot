const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blog_category = new Schema({
	status:{
		type:String,
		default:'1'
	},
	category_name:{
		type:String
	},
	slug:{
		type:String
	},
	meta_title:{
		type:String
	},
	meta_description:{
		type:String
	},
	created_date:{
		type:Date,
		default: new Date()
	}
	
});

module.exports = mongoose.model('blog_category',blog_category,'blog_category');