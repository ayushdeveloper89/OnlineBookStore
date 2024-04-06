const mongoose = require('mongoose');

const User = require('../../models/user');
const Cart = require('../../models/cart');

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

exports.signup = () => {
    return async function (req, res, next) {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            throw { name: 'alreadyExists' };
        }

        const newCart = await new Cart().save();

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                JSON.stringify(req.body.password),
                process.env.PASS_SEC
            ).toString(),
            cart: newCart._id
        });

        try {
            const savedUser = await newUser.save();
            return res.status(201).json(
                {
                    status: true,
                    message: "Thanks For Registering! Your registration has been successful."
                }
            );
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}
let refreshTokens = [];

exports.refreshTokenAPI = () => {
    return async function (req, res, next) {
        const refreshToken = req.body.token;

        if (!refreshToken) return res.status(401).json("You are not authenticated!");
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid!");
        }

        jwt.verify(refreshToken, process.env.JWT_SEC_REFRESH_TOKEN, (err, user) => {
            err && console.log(err);
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            user._id = user.id;
            user.role.role = user.role;

            const newAccessToken = generateNewAccessToken(user);
            const newRefreshToken = generateNewRefreshToken(user);

            refreshTokens.push(newRefreshToken);

            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
    }
}

const generateNewAccessToken = (user) => {
    return jwt.sign({
        id: user.id,
        role: user.role,
    }, process.env.JWT_SEC_ACCESS_TOKEN, { expiresIn: "1h", });
};

const generateNewRefreshToken = (user) => {
    return jwt.sign({
        id: user.id,
        role: user.role,
    }, process.env.JWT_SEC_REFRESH_TOKEN);
};

const generateAccessToken = (user) => {
    return jwt.sign({
        id: user._id,
        userName: `${user.firstName} ${user.lastName}`,
        role: user.role,
        cartId: user.cart
    }, process.env.JWT_SEC_ACCESS_TOKEN, { expiresIn: "3d", });
};

const generateRefreshToken = (user) => {
    return jwt.sign({
        id: user._id,
        userName: `${user.firstName} ${user.lastName}`,
        role: user.role,
        cartId: user.cart
    }, process.env.JWT_SEC_REFRESH_TOKEN);
};

exports.logIn = () => {
    return async function (req, res, next) {
        const user = await User.findOne({ email: req.body.email })
            .populate('cart');
        if (!user) {
            throw { name: 'notExists' };
        }
        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const OriginalPassword = JSON.parse(hashedPassword.toString(CryptoJS.enc.Utf8));
        if (OriginalPassword != req.body.password) {
            throw { name: 'wrongCredentials' };
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        refreshTokens.push(refreshToken);

        return res.status(200)
            .cookie('token', accessToken, {
                maxAge: 365 * 24 * 60 * 60 * 1000,
                sameSite: 'Lax',
                httpOnly: true,
                secure: false,
                domain: req.hostname,
                path: '/',
                Partitioned: true,
            })
            .json({
                status: true,
                message: "Login Successfull",
                accessToken,
                refreshToken
            });
    }
}