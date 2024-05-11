const express = require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { studentModel } = require("../model/student.model");

const studentRouter = express.Router()


studentRouter.post("/register", async(req, res)=> {
    const {password} = req.body

    try {
        bcrypt.hash(password, 5, async function(err, hash) {
            if (hash) {
                const user = new studentModel({...req.body, "password": hash})
                await user.save()
                res.status(200).json({"msg": "New student has been registered"})
            } else if (err) {
                res.status(200).json({"msg": err.message})
            }
        });
        
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})


studentRouter.post("/login", async(req, res)=> {
    

    try {
        const {email, password} = req.body

        let user = await studentModel.findOne({email})

        if (user) {
            let passwordSentByUser = password
            let passwordFromDB = user.password
            let userId = user._id

            bcrypt.compare(passwordSentByUser, passwordFromDB, function(err, result) {
                if (result) {
                    var token = jwt.sign({ email, userId }, 'avenger');
                    try {
                        res.status(200).json({"msg": "Login Successful", "token": token})
                    } catch (error) {
                        res.status(200).json({"msg": "please login"})
                    }
                }
            });
        } else {
            res.status(200).json({"msg": "User not found"})
        }
        
    } catch (error) {
        res.status(400).json({"err": error.message})
    }

    
})



module.exports = {studentRouter}

