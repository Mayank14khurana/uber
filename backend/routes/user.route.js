const express=require('express');
const router=express.Router();
const {body} =require('express-validator');
const userController=require('../controllers/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),body('fullName.firstName').isLength({min:3}).withMessage('First Name must be  atleast 3 character long'),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 character long")
],userController.registerUser);

router.post('/login',[
    body('email').isEmail().withMessage("Invalid Email"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 character long")
], userController.loginUser);

module.exports=router;