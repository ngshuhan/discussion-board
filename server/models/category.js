var mongoose = require("mongoose");
var CategorySchema = new mongoose.Schema({
	name: {type:String,unique:true},
	topics: [{type:mongoose.Schema.Types.ObjectId, ref:'Topic'}]

})


require('./../models/topic.js');

var Topic = mongoose.model('Topic');



CategorySchema.pre('remove',function(next) {
	Topic.find({_category:this._id})
	.remove({},function(err) {
		if(err){console.log(err);}
	})
		
	
	next();


})







var Category = mongoose.model("Category",CategorySchema);