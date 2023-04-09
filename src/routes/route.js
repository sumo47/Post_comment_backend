const express = require('express')
const router = express.Router()
const {loginUser} = require('../controllers/userController')
const {createPost, getPost, getPostById, updatePost} = require('../controllers/postController')
const {commentOnPost, replyOnComment} = require('../controllers/commentController')
const {authentication} = require('../middleware/middleware')
 
router.get('/test', (req,res)=>{
    res.send("api is working fine")
})

router.post('/loginUser', loginUser)
router.post('/createPost', authentication, createPost)

router.get('/getPost', authentication, getPost)
router.get('/getPost/:postId', authentication, getPostById)
router.put('/updatePost/:postId', authentication, updatePost)

router.post('/commentOnPost', authentication, commentOnPost)
router.post('/replyOnComment', authentication, replyOnComment)


module.exports= router