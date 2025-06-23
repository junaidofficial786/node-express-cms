const jwt = require('jsonwebtoken');

const notAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        return res.redirect('/admin/dashboard'); // Redirect to login if no token is found
    }
    next(); // Proceed to the next middleware or route handler
}

module.exports = notAuthenticated;