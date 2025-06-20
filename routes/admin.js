const express = require('express');
const router = express.Router();

//login routes
router.get('/', loginPage);
router.post('/index', adminLogin);
router.get('/logout', logout);

//User CRUD Routes
router.get('/users', allUsers);
router.get('/add-user', addUserPage);
router.post('/add-user', addUser);
router.get('/update-user/:id', updateUserPage);
router.post('/update-user/:id', updateUser);
router.post('/delete-user/:id', deleteUser);

//category CRUD Routes
router.get('/category', allCategory);
router.get('/add-category', addCategoryPage);
router.post('/add-category', addCategory);
router.get('/update-category/:id', updateCategoryPage);
router.post('/update-category/:id', updateCategory);
router.post('/delete-category/:id', deleteCategory);

//article CRUD Routes
router.get('/article', allArticle);
router.get('/add-article', addArticlePage);
router.post('/add-article', addArticle);
router.get('/update-article/:id', updateArticlePage);
router.post('/update-article/:id', updateArticle);
router.post('/delete-article/:id', deleteArticle);

//comment Routes
router.get('/comments', allComments);


module.exports = router;