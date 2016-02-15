var mongoose = require("mongoose");
var Topic = mongoose.model('Topic');
var Category = mongoose.model('Category');
var User = mongoose.model('User');

module.exports = {

	index: function(req,res) {
		Topic.find({})
		.populate('_user _category')
		.exec(function(err,topics) {
			res.json(topics);
		})
	},

	show: function(req,res) {
		Topic.findOne({_id:req.params.id})
		.deepPopulate('post.comments _user _category post._user post.comments._user')
		.exec(function(err,topic) {
			console.log(topic);
			res.json(topic);

		})

	},


	create: function(req,res) {

		User.findOne({_id:req.body.userId},function(err,user) {
			console.log(req.body.userId);
			Category.findOne({_id:req.body.category._id},function(err,category) {
				var newTopic = new Topic({text:req.body.text,description:req.body.description});
				newTopic._user = user._id;
				newTopic._category = category._id;
				user.topics.push(newTopic);
				category.topics.push(newTopic);
				user.save(function(err) {
					category.save(function(err) {
						newTopic.save(function(err,topic) {
							if (err) {console.log(err);}
							else {
								Topic.populate(topic,'_user _category',function(err,topic) {
									res.json(topic);
								})				
							}
						})
					})
				})
			})
		})
	}

}


