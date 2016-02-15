var mongoose = require("mongoose");
var PostSchema = new mongoose.Schema({
	_topic: {type:mongoose.Schema.Types.ObjectId,ref:'Topic'},
	created_at: {type:Date, default: Date.now},
	text:String,
	_user: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
	upvote: {type:Number,default:0},
	downvote: {type:Number,default:0}
})




require('./../models/comment.js');

var Comment = mongoose.model('Comment');


PostSchema.pre('remove',function(next) {
	
	Comment.find({_post:this._id})
	.remove({},function(err) {
		if(err){console.log(err);}
	})
	next();


})




var Post = mongoose.model("Post",PostSchema);