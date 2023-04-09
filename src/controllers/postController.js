const commentModel = require('../models/commentModel')
const postModel = require('../models/postModel')

exports.createPost = async function (req, res) {

    try {
        let data = req.body
        data.userId = req.decode.userId
        if (!data.post) {
            return res.status(400).send({ status: false, message: "post is missing" })
        }
        let createPost = await postModel.create(data)

        return res.status(201).send({ status: true, message: createPost })
    } 

    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }

}

exports.getPost = async function (req, res) {


    try {
        let postData = await postModel.find()

        res.status(200).send({ status: true, message: postData })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

exports.getPostById = async function (req, res) {


    try {
        let postId = req.params.postId

        let comments = await commentModel.find({ postId: postId }).lean()
        for (let i = 0; i < comments.length; i++) {
            let commentReply = await commentModel.find({ commentReplyId: comments[i]._id })
            comments[i].Reply = commentReply
        }

        let postData = await postModel.findById(postId)

        postData = postData.toObject()
        postData.comment = comments
        res.status(200).send({ status: true, message: postData })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

exports.updatePost = async function (req, res) {

    try {
        let postId = req.params.postId

        let checkAuth = await postModel.findById(postId)

        if(checkAuth.userId != req.decode.userId){
            return res.status(403).send({status:false, message:"You are not autherised"})
        }

        let post = req.body.post

        let updatedPost = await postModel.findByIdAndUpdate(postId, {post:post}, { new: true })

        res.status(200).send({ status: true, message: updatedPost })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}
