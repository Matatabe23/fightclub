const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const tableController = require('../controllers/tableController')

//Посещаемость 1 таблицы
router.get('/Interpreter', checkRole(['ADMIN', 'DEVELOPER']), tableController.Interpreter )

//Дроп
router.get('/Drop', checkRole(['ADMIN', 'DEVELOPER']), tableController.Drop )
router.get('/IncomeBoss', checkRole(['ADMIN', 'DEVELOPER']), tableController.IncomeBoss )
router.get('/Expenses', checkRole(['ADMIN', 'DEVELOPER']), tableController.Expenses )


module.exports = router
