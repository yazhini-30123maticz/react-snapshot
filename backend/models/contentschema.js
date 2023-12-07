const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let contentschema = new Schema({
	category:{
		type:String
	},
	subcategory:[
		{type:String}
    ],
	
});

module.exports = mongoose.model('contentschema',contentschema,'contentschema');