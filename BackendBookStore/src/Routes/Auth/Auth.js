const router = require("express").Router();

const { signup, logIn, refreshTokenAPI } = require('../../Controllers/AuthControllers/Auth');
const { catchErrors } = require('../../handler/ErrorHandler/AuthErrorHandler');

// const { signup, logIn, refreshTokenAPI } = require('@controllers/AuthControllers/Auth');
// const { catchErrors } = require('@errorHandlers/AuthErrorHandler');

router.route(`/signup`).post(catchErrors(signup()));
router.route(`/login`).post(catchErrors(logIn()));
router.route(`/refreshToken`).post(catchErrors(refreshTokenAPI()));

module.exports = { authRoute: router }