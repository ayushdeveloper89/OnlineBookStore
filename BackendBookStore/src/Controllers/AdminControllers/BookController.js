const BookInfo = require('../../models/bookInfo');

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        req.body.uniqueFileId = uuidv4() + '-' + Date.now();
        cb(null, './public/bookImages');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.uniqueFileId + path.extname(file.originalname));
        // cb(null, './uploads');
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

exports.addImage = (req, res, next) => {
    return upload.single('imageFile')(req, res, () => {
        console.log(req.body)
        // Remember, the middleware will call it's next function
        // so we can inject our controller manually as the next()
        if (req.body.imageFile) {
            if (!req.file) return res.json({ error: "errr" })
        }
        next()
    })
}

exports.addNewBook = () => {
    return async function (req, res, next) {
        let bookConst = JSON.parse(req.body.bookConst);

        bookConst.image = req.file.filename;
        const newUser = new BookInfo({
            title: bookConst.title,
            author: bookConst.author,
            image: bookConst.image,
            price: bookConst.price,
            category: bookConst.category,
        });

        try {
            const savedUser = await newUser.save();
            return res.status(201).json(
                {
                    status: true,
                    message: "Book Added successfully."
                }
            );
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

exports.updateBook = () => {
    return async function (req, res, next) {
        let bookConst = JSON.parse(req.body.bookConst);
        let id = req.body.id;
        if (req.file) {
            bookConst.image = req.file.filename;
        }

        try {
            const updatedJaapBooking = await BookInfo.findByIdAndUpdate(
                id,
                {
                    $set: bookConst,
                },
                { new: true }
            );
            res.status(200).json(updatedJaapBooking);
            return;
        } catch (err) {
            res.status(500).json(err);
            return;
        }
    }
}

exports.deleteBook = () => {
    return async function (req, res, next) {
        let id = req.params.id
        try {
            await BookInfo.findByIdAndDelete(id);
            res.status(200).json("Book has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}