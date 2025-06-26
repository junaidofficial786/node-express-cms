const path = require('path');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout', 'layout');

// View engine setup
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

//routes
app.use('/', require('./routes/frontend'));

app.use('/admin', (req, res, next) => {
    res.locals.layout = 'admin/layout';
    next();
});

app.use('/admin', require('./routes/admin'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
