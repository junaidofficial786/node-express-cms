const jwt = require('jsonwebtoken');

const authenticated = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/admin'); // Redirect to login if no token is found
    }

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.role = tokenData.role; // Store user role in request object
        req.fullname = tokenData.fullname; // Store username in request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authenticated;