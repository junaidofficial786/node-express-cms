const userModel = require('../models/User');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcryptjs');

const loginPage = async (req, res) => {
    res.render('admin/login', {
        layout: false
    })
}
const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const jwtData = { id: user._id, role: user.role, fullname: user.fullname };

        const token = jwt.sign(jwtData, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 }); // 1 hour

        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin');
}

const allUsers = async (req, res) => {
    const users = await userModel.find()
    res.render('admin/users', {
        users: users,
        role: req.role
    })
}
const addUserPage = async (req, res) => {
    res.render('admin/users/create', {
        role: req.role
    })
}
const addUser = async (req, res) => {
    await userModel.create(req.body)
    res.redirect('/admin/users')
}
const updateUserPage = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.render('admin/users/update', { user, role: req.role })
    } catch (error) {
        res.status(500).send('Server Error')
    }
}
const updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.redirect('/admin/users')
    } catch (error) {
        res.status(500).send('Server Error')
    }
}
const deleteUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send('User not found')
        }
        res.json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (error) {
        res.status(500).send('Server Error')
    }
}

const dashboard = async (req, res) => {
    res.render('admin/dashboard', { role: req.role, fullname: req.fullname })
}

const settingsPage = async (req, res) => {
    res.render('admin/settings', { role: req.role })
}

module.exports = {
    loginPage,
    adminLogin,
    logout,
    allUsers,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser,
    deleteUser,
    dashboard,
    settingsPage
}