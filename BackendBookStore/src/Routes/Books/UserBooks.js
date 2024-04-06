const router = require("express").Router();

const { verifyTokenAndAuthorization } = require('../../middlewares/Auth/Auth');
const { getBooks } = require('../../Controllers/UserControllers/BookController');

router.route(`/getBooks`).post(verifyTokenAndAuthorization,  getBooks());

module.exports = { userBookRoute: router }