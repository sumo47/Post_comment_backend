const jwt = require('jsonwebtoken')
const postModel = require('../models/postModel')

exports.authentication = function(req,res,next){

    try {
        let token= req.headers["x-api-key"]
        if(!token){
            return res.status(400).send({status:false, message:"token is not present in header"})
        }
    
        let decode = jwt.verify(token, 'secret code', (err,decode)=>{
            if(err){
                return res.status(401).send({status:false, message:err.message})
            }
            else{
                req.decode = decode
                next()
            }
        })
    }
    catch (error) {
        return res.status(500).send({status:false, error:error.message})
    }

}