const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.Model');
const captainService = require('../services/captain.service');
const blackListTokenModel =require('../models/blackListToken.model')
module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

  
    const { fullName, email, password, vehicle } = req.body;
    const alreadyExists = await captainModel.findOne({email});

    if (alreadyExists) {
        return res.status(400).json({
            message: "Captain already exists"
        })
    }

    const hashedPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        email
    })
    if (!captain) {
        return res.status(400).json({
            message: "Invalid data"
        })
    }
    const token = captain.generateAuthToken();
    return res.status(201).json({
        token, captain
    })

}

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isMatch = await captain.comparePassword(password, captain.password);
    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = captain.generateAuthToken();
    res.cookie('token',token);
    return res.status(200).json({
        success:true,
        token, captain
    })

}

module.exports.getCaptainProfile=async (req,res)=>{
    res.status(200).json({captain:req.captain});
}

module.exports.logoutCaptain=async(req,res)=>{
    const token =req.cookies.token|| req.headers.authrization?.split(' ')[1]; 
        await blackListTokenModel.create({token});
        res.clearCookie('token');   
        res.status(200).json({
            message:"Logged Out Successfully"
        })
}
