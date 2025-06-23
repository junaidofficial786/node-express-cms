const userModel = require('../models/User');

const loginPage = async (req, res) => {
    res.render('admin/login', {
        layout: false
    })
}
const adminLogin = async (req, res) => { }
const logout = async (req, res) => { }

const allUsers = async (req, res) => {
    const users = await userModel.find()
    res.render('admin/users', {
        users: users
    })
}
const addUserPage = async (req, res) => {
    res.render('admin/users/create')
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
        res.render('admin/users/update', { user })
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
    res.render('admin/dashboard')
}

const settingsPage = async (req, res) => {
    res.render('admin/settings')
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