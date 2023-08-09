const Router = require('express')
const router = new Router()
const postsController = require('../controllers/postsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/push', checkRole(['ADMIN', 'DEVELOPER']), postsController.push )
router.get('/receive', postsController.receive)
router.post('/delete', checkRole(['ADMIN', 'DEVELOPER']), postsController.delete)

module.exports = router
