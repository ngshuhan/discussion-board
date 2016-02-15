var posts = require("../controllers/posts.js");
var topics = require("../controllers/topics.js");
var users = require("../controllers/users.js");
var categories = require("../controllers/categories.js");
module.exports = function(app) {

	app.post('/users',function(req,res) {
		users.create(req,res);
	})
	
	app.get('/categories',function(req,res) {
		categories.index(req,res);

	})

	app.post('/topics',function(req,res) {
		topics.create(req,res);
	})
	app.get('/topics',function(req,res) {
		topics.index(req,res);
	})

	app.get('/topics/:id',function(req,res) {
		topics.show(req,res);
	})

	app.post('/topics/:id',function(req,res) {
		posts.create(req,res);
	})

	app.patch('/posts/:id',function(req,res){
		posts.update(req,res);
	})

	app.post('/posts/:id',function(req,res) {
		posts.addComment(req,res);
	})

	app.get('/users/:id',function(req,res) {
		users.show(req,res);
	})





	
}