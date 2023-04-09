const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

exports.loginUser = async function (req, res) {
    try {
        let data = req.body
        let { email, password } = data

        let checkEmail = await userModel.findOne({ email: email })
        
        if (!checkEmail) {
            let userData = userModel.create(data)

            let token = jwt.sign({userId:userData._id}, 'secret code')
            return res.status(200).send({ status: true, token:token })
        }
        else {
            if (checkEmail.password == password) {
                let token = jwt.sign({userId:checkEmail._id}, 'secret code')
                return res.status(200).send({ status: true, token:token })
            }
            else {
                return res.status(401).send({ status: false, message: "Please enter correct password" })
            }
        }
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}