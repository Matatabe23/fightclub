// Подключаем библиотеку для работы с переменными окружения
require('dotenv').config() 

// Подключаем ORM Sequelize для работы с базой данных (db), создаем экземпляр приложения и модели (models)
const sequelize = require('./db')
const express = require('express')
const models = require('./models/models')

// Подключаем middleware для обработки CORS-запросов и маршрутизатор
const cors =require('cors')
const router = require('./routes/index')

const PORT = process.env.PORT || 5000 // Указываем порт, на котором будет работать приложение

const app = express() // Создаем экземпляр приложения Express
app.use(cors()) // Используем middleware для обработки CORS-запросов
app.use(express.json()) // Парсим JSON-данные при запросе
app.use('/api', router) // Используем маршрутизатор

const start = async() =>{
	try{
		await sequelize.authenticate() // Аутентификация в базе данных
		await sequelize.sync() // Синхронизация моделей с базой данных
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) // Запуск сервера на указанном порту
	} catch (e){
		console.log(e) // Вывод ошибки при возникновении исключений
	}
}

start() // Вызов функции для запуска приложения
const UpdateData = require('./UpdateData')
