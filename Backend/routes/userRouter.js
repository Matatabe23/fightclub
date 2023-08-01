const Router = require('express') // Подключаем библиотеку Express и получаем функцию Router
const router = new Router() // Создаем объект роутера с помощью функции Router
const userController = require('../controllers/userController') // Подключаем контроллер пользователя
const authMiddleware = require('../middleware/authMiddleware') // Подключаем middleware для проверки авторизации
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/registration', userController.registration) // Создаем маршрут для регистрации, указываем метод POST и функцию-обработчик
router.post('/login', userController.login) // Создаем маршрут для входа, указываем метод POST и функцию-обработчик
router.get('/check', authMiddleware, userController.check) // Создаем маршрут для проверки авторизации, указываем метод GET, middleware для проверки авторизации и функцию-обработчик
router.get('/CheckDataWeb', authMiddleware, userController.CheckDataWeb) //Проверка данных пользователя в бд
router.get('/UserData', checkRole(['ADMIN', 'DEVELOPER']), userController.UserData) //Получение всех пользователей
router.post('/updateRole', checkRole(['ADMIN', 'DEVELOPER']), userController.updateRole) //Получение всех пользователей


module.exports = router // Экспортируем объект роутера для использования в других модулях
