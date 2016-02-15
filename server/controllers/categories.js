var mongoose = require("mongoose");
var Category = mongoose.model('Category');
module.exports = {

	index: function(req,res) {
		Category.find({},function(err,categories) {
			if(err) {console.log(err);}
			else {res.json(categories);}
		})
	}
	






}