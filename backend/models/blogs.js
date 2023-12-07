const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let blog = new Schema({
	blog_category: { 
		type: mongoose.Schema.Types.ObjectId, ref: 'blog_category'
	},
	theme:{
		type:String,default:'yellow'
	},
	meta_title:{
		type:String
	},
	// side_title:{
	// 	type:String
	// },
	meta_description:{
		type:String
	},
	// meta_keywords:{
	// 	type:String
	// },
	bannercolour:{
		type:String
	},
	// author:{
	// 	type:String
	// },
	title:{
		type:String
	},
	
	image:{
		type:String
	},
	slug:{
		type:String
	},
	description:{
		type:String
	},
	addbannerheading:{
		type:String
	},
	addbannercontent:{
		type:String
	},
	bannerimage:{
		type:String
	},
	blogdescription:{
		type:String
	},
	status:{
		type:String,default:'1'
	},
	pageurl:{
		type:String
	},


	blogaudio:{
		type:String,
		default:null,
	},
	popular:{
		type:String,default:'0'   //1-popular 0- non popular
	},
	epick:{
		type:String,default:'0'   //1-epick 0- non epick
	},
	like:{ 
		type : Array , "default" : [] 
	},

	viewcount : { 
		type : Array , "default" : [] 
	},
	views:{
		type:Number,
		default:0
	},
	faqSchema:{
		type:String,default:''
	},
	faqJson:{
		type:String,default:''
	},
	disclaimer:{
		type:String,default:''
	},
	deleted:{
		type:Boolean,default:false,
	},
	listed:{
		type:String,default:'list'
	},
	bloglist:{
		type:String,default:'show'
	},
	trending:{
		type:Boolean,default:false,
	},
	created_date:{
		type:Date,default: new Date()
	},
});

module.exports = mongoose.model('blog',blog,'blog');