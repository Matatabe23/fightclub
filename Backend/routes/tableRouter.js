const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const tableController = require('../controllers/tableController')

router.get('/Receiving', checkRole(['ADMIN', 'DEVELOPER']), tableController.Receiving )

module.exports = router
