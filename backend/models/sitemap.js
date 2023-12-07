const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let redirect = new Schema({
    location: { 
		type: String
	},
	priority:{
		type:String
	},
    changefrequency:{
		type:String
	},
	created_date:{
		type:Date,default: new Date()
	},
});

module.exports = mongoose.model('sitemap',redirect,'sitemap');