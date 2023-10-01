const ApiError = require('../error/ApiError');
const { Posts } = require('../models/models');

class PostsController {
  // Создание поста
  async push(req, res) {
    try {
      const { title, body, ADnameName, ADnameRole } = req.body;

      // Сохранение данных в базу данных
      const newPost = await Posts.create({ title, body, ADnameName, ADnameRole});

      res.send(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

  // Получение всех постов
  async receive(req, res) {
    try {
      const posts = await Posts.findAll();
      res.send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }

  // Удаление поста
  async delete(req, res) {
    try {
      const { id } = req.body;

      // Удаление поста из базы данных
      await Posts.destroy({where: {id: id}});

      res.send('Post deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
}

module.exports = new PostsController();
