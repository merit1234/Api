const jwt = require('jsonwebtoken');

require('dotenv').config();

function authenticateToken(req, res, next) {
    const secretKey = process.env.JWT_SECRET;
    const token = req.cookies.token;
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
module.exports = {authenticateToken};