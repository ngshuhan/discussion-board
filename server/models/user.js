var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	name: String,
	topics: [{type:mongoose.Schema.Types.ObjectId,ref:'Topic'}],
	posts: [{type:mongoose.Schema.Types.ObjectId, ref:'Posts'}],
	comments: [{type: mongoose.Schema.Types.ObjectId,ref:'Comment'}]

})


require('./../models/topic.js');
require('./../models/post.js');
require('./../models/comment.js');
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');


UserSchema.pre('remove',function(next) {
	Topic.find({_user:this._id})
	.remove({},function(err) {
		if(err){console.log(err);}
	})
	Post.find({_user:this._id})
	.remove({},function(err) {
		if(err){console.log(err);}
	})
	Comment.find({_user:this._id})
	.remove({},function(err) {
		if(err){console.log(err);}
	})
	next();


})










var User = mongoose.model("User", UserSchema);