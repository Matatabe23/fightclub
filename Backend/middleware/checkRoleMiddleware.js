const jwt = require('jsonwebtoken') // Подключаем библиотеку для работы с JWT-токенами

module.exports = function(role) { // Экспортируем функцию, которая принимает роль пользователя
	return function (req, res, next) { // Возвращаем другую функцию, которая будет использоваться в качестве middleware
		if (req.method === "OPTIONS"){ // Проверяем, является ли запрос методом OPTIONS (используется для проверки доступности сервера для CORS-запросов)
			next() // Если да, пропускаем его далее
		}
		try{
			const token = req.headers.authorization.split('')[1] // Получаем JWT-токен из заголовка Authorization запроса
			if(!token) { // Если токен не найден, отправляем ошибку авторизации
				return res.status(401).json({message: "Не авторизован"})
			}
			const decoded = jwt.verify(token, process.env.SECRET_KEY) // Расшифровываем токен с помощью секретного ключа (SECRET_KEY)
			if (decoded.role !== role) { // Если роль пользователя не соответствует ожидаемой роли, возвращаем ошибку доступа
				return res.status(403).json({message: "Нет доступа"})
			}
			req.user = decoded // Добавляем данные пользователя в объект запроса для дальнейшей обработки
			next() // Пропускаем запрос далее
		} catch(e) {
			res.status(401).json({message: "Не авторизованy"}) // Если происходит ошибка при расшифровке токена, отправляем ошибку авторизации
		}
	}
}
