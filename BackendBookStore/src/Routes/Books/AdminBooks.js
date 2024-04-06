const router = require("express").Router();

const { verifyTokenAndAdmin } = require('../../middlewares/Auth/Auth');
const { addNewBook, updateBook, deleteBook,  addImage  } = require('../../Controllers/AdminControllers/BookController');

router.route(`/addNewBook`).post(verifyTokenAndAdmin, addImage, addNewBook());
router.route(`/updateBook`).post(verifyTokenAndAdmin, addImage, updateBook());
router.route(`/deleteBook/:id`).post(verifyTokenAndAdmin, deleteBook());

module.exports = { adminBookRoute: router }
