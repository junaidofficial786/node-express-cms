const express = require('express');
const router = express.Router();

router.get('/', index);
router.get('/category/:name', articlesByCategories);
router.get('/single/:id', singleArticle);
router.get('/search', search);
router.get('/author/:name', author);
router.post('/single/:id', addComment);

module.exports = router;