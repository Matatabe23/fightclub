const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { Posts } = require('../models/models')

class PostsController {
	async push(req, res) {
		try {
			const { title, body, ADnameName, ADnameRole } = req.body;
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
			const { _page, _limit } = req.query;
			const page = parseInt(_page) || 1;
			const limit = parseInt(_limit) || 5;

			const startIndex = (page - 1) * limit;
			const endIndex = page * limit;

			const posts = await Posts.findAll();
			const totalPosts = posts.length;
			const paginatedPosts = posts.slice(startIndex, endIndex);

			res.set('X-Total-Posts', totalPosts); // Set the 'X-Total-Posts' header with the total number of posts
			res.send(paginatedPosts);
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}



	async delete(req, res) {
		try {
			const { id } = req.body;
			const post = await Posts.destroy({ where: { id } });
			res.send('Post deleted successfully');
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}
}

module.exports = new PostsController();
