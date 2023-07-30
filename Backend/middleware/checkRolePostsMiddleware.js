const jwt = require('jsonwebtoken');
const { User } = require('../models/models') // Импортируем модель User из базы данных

// Принимаем токен, массив ролей и возвращаем middleware для проверки авторизации пользователя
module.exports = (role) => {
  return async (req, res, next) => {
    if (req.method === "OPTIONS") { // Проверяем, является ли запрос методом OPTIONS
      next();
    }
     try {
      const token = req.headers.authorization.split(' ')[1]; // Получаем JWT-токен из заголовка Authorization запроса
      if (!token) {
        return res.status(401).json({message: "Не авторизован"}); // Если токен не найден, отправляем ошибку авторизации
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // Расшифровываем токен с помощью секретного ключа
			const id = decoded.id
			const candidate = await User.findOne({ where: {id} })
      const hasRole = role.includes(candidate.role); // Проверяем, соответствует ли роль пользователя ролям в массиве

      if (!hasRole) { // Если роль пользователя не соответствует ожидаемым ролям, возвращаем ошибку доступа
        return res.status(403).json({message: "Нет доступа"});
      }

      req.posts = decoded; // Добавляем данные  в объект запроса для дальнейшей обработки
      next();
    } catch (e) {
      res.status(401).json({message: "Не авторизованn"}); // Если происходит ошибка при расшифровке токена, отправляем ошибку авторизации
    }
  };
};
