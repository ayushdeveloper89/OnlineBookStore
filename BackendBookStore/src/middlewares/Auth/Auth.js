const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    // if(isLoggedIn){
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SEC_ACCESS_TOKEN, (err, user) => {
            if (err) res.status(403).json("Token is not valid!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
    // }else{
    //   return res.status(401).json("You are not logged in!");
    // }
};

exports.verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role == 'appAdmin') {
            next();
        } else {
            res.status(403).json("You are not alowed to do that!");
        }
    });
};

exports.verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.role === 'appAdmin') {
            next();
        } else {
            res.status(403).json("You are not allowed to do that!");
        }
    });
};