const router = require("express").Router();

const { verifyTokenAndAuthorization } = require('../../middlewares/Auth/Auth');
const { getCartdata, updateCart } = require('../../Controllers/UserControllers/CartController');

router.route(`/getCartdata`).post(verifyTokenAndAuthorization,  getCartdata());
router.route(`/updateCart`).post(verifyTokenAndAuthorization,  updateCart());

module.exports = { userCartRoute: router }