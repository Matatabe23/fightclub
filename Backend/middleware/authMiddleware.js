const jwt = require('jsonwebtoken'); // Подключаем модуль jsonwebtoken для работы с токенами

module.exports = function (req, res, next) { // Экспортируем функцию, которая будет проверять токен на наличие и валидность
	if (req.method === "OPTIONS") { // Если метод запроса OPTIONS, отправляем следующий запрос
		next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1]; // Получаем токен из заголовков запроса
		if (!token) {
			return res.status(401).json({ message: "Не авторизован" }) // Если токен отсутствует, возвращаем ошибку
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY); // Расшифровываем токен и сохраняем данные пользователя в объекте запроса
		req.user = decoded;
		next();
	} catch (e) {
		res.status(401).json({ message: "Ошибка" }) // Если произошла ошибка при расшифровке токена, отправляем сообщение об ошибке
	}
};
 