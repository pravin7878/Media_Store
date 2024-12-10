const express = require("express");
const { registerNewUser, authenticateUser } = require("../controlers/user.controler");
const { model } = require("mongoose");
const validateRegisterBody = require("../middelware/validateRegisterBody");

const userRouter = express.Router()

// register a new user
userRouter.post("/register" ,validateRegisterBody, registerNewUser)

// login user after success full registertion
userRouter.post("/login" , authenticateUser)


module.exports = userRouter
