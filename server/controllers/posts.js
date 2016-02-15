var mongoose = require("mongoose");
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

module.exports = {

	addComment:function(req,res) {
		
		User.findOne({_id:req.body.user},function(err,user) {
			Post.findOne({_id:req.params.id},function(err,post) {
				var newComment = new Comment({text:req.body.comment});
				newComment._post = post._id;
				newComment._user = user._id;
				user.comments.push(newComment);
				post.comments.push(newComment);
				user.save(function(err) {
					post.save(function(err) {
						newComment.save(function(err,newComment) {
							if (err) {console.log(err);}
							else {
								Comment.populate(newComment,'_user',function(err,comment) {
									res.json(comment);
									console.log(comment);
								})
							}
						})
					})
				})

			})
		})
		
	},


	


	create: function(req,res) {
		User.findOne({_id:req.body.user},function(err,user) {
		

			Topic.findOne({_id:req.params.id},function(err,topic) {
				var newPost = new Post({text:req.body.text});
				newPost._user = user._id;
				newPost._topic = topic._id;
				user.posts.push(newPost);
				topic.post.push(newPost);
				user.save(function(err) {
					topic.save(function(err) {
						newPost.save(function(err,newPost) {
							if (err) {console.log(err);}
							else {
								Post.populate(newPost,'_user',function(err, post) {

									res.json(post);
								})
							}
						})
					})
				})

			})
		})
		
	},

	update:function(req,res) {
		console.log(req.body.vote);
		console.log(req.params.id);
		Post.findOne({_id:req.params.id},function(err,post) {
			if (req.body.vote == "upVote") {
				post.upvote += 1;

			} else {
				post.downvote += 1;

			}
			post.save(function(err,post) {
				res.json(post);
			})
		})

	}








}
