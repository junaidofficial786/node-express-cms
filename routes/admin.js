const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');


const authenticated = require('../middleware/authenticated');
const notAuthenticated = require('../middleware/notAuthenticated');
const isAdmin = require('../middleware/isAdmin');

const articleController = require('../controllers/articleController');
const categoryController = require('../controllers/categoryController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');

//login routes
router.get('/', notAuthenticated, userController.loginPage);
router.post('/index', notAuthenticated, userController.adminLogin);
router.get('/logout', authenticated, userController.logout);

router.get('/dashboard', authenticated, userController.dashboard);
router.get('/settings', authenticated, isAdmin, userController.settings);
router.post('/save-settings', authenticated, isAdmin, upload.single('website_logo'), userController.saveSettings);

//User CRUD Routes
router.get('/users', authenticated, isAdmin, userController.allUser);
router.get('/add-user', authenticated, isAdmin, userController.addUserPage);
router.post('/add-user', authenticated, isAdmin, userController.addUser);
router.get('/update-user/:id', authenticated, isAdmin, userController.updateUserPage);
router.post('/update-user/:id', authenticated, isAdmin, userController.updateUser);
router.delete('/delete-user/:id', authenticated, isAdmin, userController.deleteUser);

//category CRUD Routes
router.get('/category', authenticated, isAdmin, categoryController.allCategory);
router.get('/add-category', authenticated, isAdmin, categoryController.addCategoryPage);
router.post('/add-category', authenticated, isAdmin, categoryController.addCategory);
router.get('/update-category/:id', authenticated, isAdmin, categoryController.updateCategoryPage);
router.post('/update-category/:id', authenticated, isAdmin, categoryController.updateCategory);
router.delete('/delete-category/:id', authenticated, isAdmin, categoryController.deleteCategory);

//article CRUD Routes
router.get('/article', authenticated, articleController.allArticle);
router.get('/add-article', authenticated, articleController.addArticlePage);
router.post('/add-article', authenticated, upload.single('image'), articleController.addArticle);
router.get('/update-article/:id', authenticated, articleController.updateArticlePage);
router.post('/update-article/:id', authenticated, upload.single('image'), articleController.updateArticle);
router.delete('/delete-article/:id', authenticated, articleController.deleteArticle);

//comment Routes
router.get('/comments', authenticated, commentController.allComments);

// 404 Middleware
router.use(authenticated, (req, res, next) => {
    res.status(404).render('admin/404', {
        message: 'Page not found',
        role: req.role
    })
});

// 500 Error Handler
router.use(authenticated, (err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    let view;
    switch (status) {
        case 401:
            view = 'admin/401';
            break;
        case 404:
            view = 'admin/404';
            break;
        case 500:
            view = 'admin/500';
            break;
        default:
            view = 'admin/500';
    }
    res.status(status).render(view, {
        message: err.message || 'Something went wrong',
        role: req.role
    })
});

module.exports = router;