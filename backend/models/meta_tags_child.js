const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let meta_tags_child = new Schema({
	tagtype:{
		type:String
	},
	tagname:{
		type:String
	},
	tagcontent:{
		type:String
	},
	metatagid:{
		type:mongoose.Schema.Types.ObjectId, ref: 'meta_tags'
	},	
});

module.exports = mongoose.model('meta_tags_child',meta_tags_child,'meta_tags_child');