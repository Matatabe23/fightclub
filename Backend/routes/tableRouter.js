const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const tableController = require('../controllers/tableController')

router.get('/interpreter', checkRole(['ADMIN', 'DEVELOPER']), tableController.interpreter )

module.exports = router
