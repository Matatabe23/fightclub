const { ApiError } = require('../error/ApiError') // Импортируем класс ApiError для обработки ошибок запросов
const bcrypt = require('bcrypt') // Импортируем библиотеку bcrypt для хэширования паролей
const jwt = require('jsonwebtoken') // Импортируем библиотеку jsonwebtoken для создания и проверки JWT-токенов
const { User } = require('../models/models') // Импортируем модель User из базы данных

// Функция для генерации JWT-токена
const generateJwt = (id, email, name, role) => {
	return jwt.sign({ id, email, name, role }, // Создаем токен с полями id, email, name и role
		process.env.SECRET_KEY, // Используем secret key из окружения для подписи токена
		{ expiresIn: '24h' }) // Устанавливаем время жизни токена
}

// Класс для работы с пользователями
class UserController {
	// Метод для регистрации нового пользователя
	async registration(req, res, next) {
		const { email, name, password, role } = req.body // Получаем данные пользователя из запроса
		if (!email || !password) { // Если email или пароль не введены, возвращаем ошибку
			return next(ApiError.badRequest('Некорректный email или пароль'))
		}
		const candidate = await User.findOne({ where: { email } }) // Проверяем, что пользователь с таким email еще не зарегистрирован
		if (candidate) { // Если пользователь уже существует, возвращаем ошибку
			return next(ApiError.badRequest('Пользователь с таким email уже существует'))
		}
		const hashPassword = await bcrypt.hash(password, 5) // Хэшируем пароль с помощью bcrypt
		const user = await User.create({ email, name, role, password: hashPassword }) // Создаем нового пользователя в базе данных
		const token = generateJwt(user.id, user.email, user.name, user.role) // Генерируем JWT-токен для пользователя
		return res.json({ token }) // Отправляем токен в ответ на запрос
	}


	// Метод для авторизации пользователя
	async login(req, res, next) {
		const { email, password } = req.body // Получаем данные пользователя из запроса
		const user = await User.findOne({ where: { email } }) // Проверяем, что пользователь с таким email зарегистрирован
		if (!user) { // Если пользователь не найден, возвращаем ошибку
			return next(ApiError.internal('Пользователь не найден'))
		}
		let comparePassword = bcrypt.compareSync(password, user.password) // Сравниваем введенный пароль с хэшированным паролем пользователя
		if (!comparePassword) { // Если пароли не совпадают, возвращаем ошибку
			return next(ApiError.internal('Указанный неверный пароль'))
		}
		const token = generateJwt(user.id, user.email, user.name, user.role) // Генерируем JWT-токен для пользователя
		return res.json({ token }) // Отправляем токен в ответ на запрос
	}

	// Метод для проверки авторизации пользователя
	async check(req, res) {
		const token = generateJwt(req.user.id, req.user.email, req.user.name, req.user.role) // Генерируем JWT-токен для пользователя из запроса
		return res.json({ token }) // Отправляем токен в ответ на запрос
	}


	async CheckDataWeb(req, res) {
		const id = req.user.id
		const user = await User.findOne({ where: { id } }) // Проверяем, что пользователь с таким id зарегистрирован
		const token = generateJwt(user.id, user.email, user.name, user.role)
		return res.json({token})
	}

	async UserData(req, res) {
		try {
			const users = await User.findAll();
			res.send(users);
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}

	async updateRole(req, res, next) {
		console.log(req.body)
		const { id, newRole } = req.body; // Получаем данные из запроса
		console.log(id)
		try {
			const user = await User.findOne({ where: { id } }); // Находим пользователя в базе данных по id
			user.role = newRole; // Устанавливаем новую роль
			await user.save(); // Сохраняем изменения в базе данных
			return res.sendStatus(200); // Возвращаем успешный статус
		} catch (error) {
			return next(ApiError.internal('Не удалось обновить роль пользователя')); // Возвращаем ошибку, если не удалось сохранить изменения
		}
	}

}

module.exports = new UserController()