const BookInfo = require('../../models/bookInfo');

exports.getBooks = () => {
    return async function ( req, res, next) {
        try {
            const allBooks = await BookInfo.find({}).sort({"createdAt": -1});
            return res.status(201).json(
                {
                    status: true,
                    allBooks: allBooks
                }
            );
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}