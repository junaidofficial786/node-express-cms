const mongoose = require('mongoose')

const categoryModel = require('../models/Category');
const NewsModel = require('../models/News');
const userModel = require('../models/User');
const commentModel = require('../models/Comment');

const index = async (req, res) => { }
const articleByCategory = async (req, res) => { }
const singleArticle = async (req, res) => { }
const search = async (req, res) => { }
const author = async (req, res) => { }
const addComment = async (req, res) => { }

exports = {
    index,
    articleByCategory,
    singleArticle,
    search,
    author,
    addComment
}

