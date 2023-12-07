const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let meta_tags = new Schema({
	metatitle:{
		type:String
	},
	metadescription:{
		type:String
	},
	page:{
		type:String
	},
	ogimage:{
		type:String
	},
	faqSchema:{
		type:String
	},
	faqJson:{
		type:String
	}

});

module.exports = mongoose.model('meta_tags',meta_tags,'meta_tags');