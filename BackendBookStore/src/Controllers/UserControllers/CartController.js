const Cart = require('../../models/cart');

exports.getCartdata = () => {
    return async function (req, res, next) {
        let id = req.body.id;
        try {
            const cartData = await Cart.findOne({_id: id})
            res.status(200).json(cartData);
        } catch (error) {
            res.status(500).json(err);
            return;
        }
    }
}

exports.updateCart = () => {
    return async function (req, res, next) {
        console.log(req.body)
        try {
            const updatedJaapBooking = await Cart.findByIdAndUpdate(
                req.body.id,
                {
                    $set: req.body,
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