const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainModel = require('../models/captain.Model');
const blackListModel = require('../models/blackListToken.model');

module.exports.authUser = async (req, res, next) => {

    const rawToken = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!rawToken) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }

    const token = rawToken.replace(/^"(.*)"$/, '$1');
    console.log('Sanitized token:', token);
    const isBlacklisted = await blackListModel.findOne({ token: token })

    if (isBlacklisted) {
        return res.status(404).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded._id).select('-password');

        if (!user) return res.status(404).json({ message: 'User not found' });

        req.user = user;
        return next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const isBlacklisted = await blackListModel.findOne({ token: token })

    if (isBlacklisted) {
        return res.status(404).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const captain = await captainModel.findById(decoded._id).select('-password');

        if (!captain) return res.status(404).json({ message: 'User not found' });

        req.captain = captain;
        return next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}