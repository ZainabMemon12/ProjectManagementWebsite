const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const Validatetoken = asyncHandler(async (req, res,next) => {
    let token;
    let authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            console.log(decoded);
           
            req.admin = decoded.admin;
               next();
        });
    } else {
        return res.status(400).json({ message: 'No token provided' });
    }
});
module.exports = Validatetoken;
