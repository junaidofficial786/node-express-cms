const express = require('express');
const router = express.Router();

const articleController = require('../controllers/articleController');
const categoryController = require('../controllers/categoryController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');

//login routes
router.get('/', userController.loginPage);
router.post('/index', userController.adminLogin);
router.get('/logout', userController.logout);

router.get('/dashboard', userController.dashboard);
router.get('/settings', userController.settingsPage);

//User CRUD Routes
router.get('/users', userController.allUsers);
router.get('/add-user', userController.addUserPage);
router.post('/add-user', userController.addUser);
router.get('/update-user/:id', userController.updateUserPage);
router.post('/update-user/:id', userController.updateUser);
router.post('/delete-user/:id', userController.deleteUser);

//category CRUD Routes
router.get('/category', categoryController.allCategory);
router.get('/add-category', categoryController.addCategoryPage);
router.post('/add-category', categoryController.addCategory);
router.get('/update-category/:id', categoryController.updateCategoryPage);
router.post('/update-category/:id', categoryController.updateCategory);
router.post('/delete-category/:id', categoryController.deleteCategory);

//article CRUD Routes
router.get('/article', articleController.allArticles);
router.get('/add-article', articleController.addArticlePage);
router.post('/add-article', articleController.addArticle);
router.get('/update-article/:id', articleController.updateArticlePage);
router.post('/update-article/:id', articleController.updateArticle);
router.post('/delete-article/:id', articleController.deleteArticle);

//comment Routes
router.get('/comments', commentController.allComments);


module.exports = router;