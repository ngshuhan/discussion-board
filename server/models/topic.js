var mongoose = require("mongoose");
var TopicSchema = new mongoose.Schema({
	_user: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
	created_at: {type:Date, default:Date.now},
	text: String,
	description: String,
	post: [{type:mongoose.Schema.Types.ObjectId,ref:'Post'}],
	_category: {type:mongoose.Schema.Types.ObjectId,ref:'Category'}
})

var deepPopulate = require('mongoose-deep-populate')(mongoose);
TopicSchema.plugin(deepPopulate,{})

var Topic = mongoose.model("Topic",TopicSchema);