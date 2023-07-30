const Router = require('express')
const router = new Router()
const postsController = require('../controllers/postsController')
const checkRolePosts = require('../middleware/checkRolePostsMiddleware')

router.post('/push', checkRolePosts(['ADMIN', 'DEVELOPER']), postsController.push )
router.get('/receive', postsController.receive)



module.exports = router
