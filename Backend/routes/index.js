const Router = require('express')
const router = new Router()
const postsRouter = require('./postsRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/posts', postsRouter)

module.exports = router
