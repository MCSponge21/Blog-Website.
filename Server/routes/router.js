const express = require('express');
const Router = express.Router();
const {postLogin, postSignup, getPosts, userInfo, 
    postPosts, getPost,
    deletePostController, getCommentsController, postComments, postPublish,
    editPostController, postUnpublish, deleteCommentController,
    getUserPosts, getPublishedPosts, getLatestPost, putComment
} = require('../controller/controller');
const {verifyToken} = require("../middleware/middleware")

Router.post("/signup", postSignup);

Router.post('/login', postLogin);

Router.get('/userinfo', verifyToken, userInfo);

Router.get('/post/:id', getPost);
Router.put('/post/:id', verifyToken, editPostController)
Router.delete('/post/:id', verifyToken, deletePostController)

Router.get('/comments/:id', getCommentsController);
Router.post('/comments/:id', verifyToken, postComments)
Router.delete('/comments/:id', verifyToken, deleteCommentController);
Router.put('/comments/:id', verifyToken, putComment);

Router.get('/posts', getPosts);
Router.post('/posts', verifyToken, postPosts);

Router.get('/userposts', verifyToken, getUserPosts);

Router.post('/publish/:id', verifyToken, postPublish);
Router.post('/unpublish/:id', verifyToken, postUnpublish)

Router.get('/publishedposts', getPublishedPosts);
Router.get('/latestpost', getLatestPost);


module.exports = Router;