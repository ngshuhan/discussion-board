var mongoose = require("mongoose");
var CommentSchema = new mongoose.Schema({
	_post: {type:mongoose.Schema.Types.ObjectId, ref:'Post'},
	_user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
	text: String
})

var Comment = mongoose.model("Comment",CommentSchema);