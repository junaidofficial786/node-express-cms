const express = require('express');
const cors = require('cors'); // ✅ Import cors
require('dotenv').config();
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// import newly created models so that its db tables could be created 
require('./models/User'); // Import User model to ensure it's registered
require('./models/Category'); // Import Category model to ensure it's registered

const app = express();

// ✅ Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // if you use cookies or HTTP authentication
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    console.log('MySQL connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
