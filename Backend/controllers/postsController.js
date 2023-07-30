const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {Posts} = require('../models/models')

class PostsController {
	async push(req, res) {
		try {
			const {title, body, ADnameName, ADnameRole} = req.body;
			const post = await Posts.create({
				title,
				body,
				ADnameName,
				ADnameRole
			});
	
			res.send(post);
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}
	
	async receive(req, res) {
			try {
				const posts = await Posts.findAll();
				res.send(posts);
			} catch (error) {
				console.error(error);
				res.status(500).send('Server Error');
			}
		}	
	}

module.exports = new PostsController()