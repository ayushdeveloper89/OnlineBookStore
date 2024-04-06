exports.catchErrors = (fn) => {
    return function (req, res, next) {
        console.log("here")
        console.log(req.body)
        return fn(req, res, next).catch((error) => {
        console.log(req.body)

            if (error.name == 'alreadyExists') {
                return res.status(401).json({
                    status: false,
                    message: "Email already exists"
                });
            } else if (error.name == 'notExists') {
                return res.status(401).json({
                    status: false,
                    message: "User doesn't exists"
                });
            } else if (error.name == 'wrongCredentials') {
                return res.status(401).json({
                    status: false,
                    message: "Wrong credentials!!"
                });
            } else {
                // Server Error
                res.status(500).json({
                    success: false,
                    result: null,
                    message: error.message,
                    controller: fn.name,
                    error: error,
                });
            }
        });
    };
};