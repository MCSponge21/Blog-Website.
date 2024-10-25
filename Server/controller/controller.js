const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport')
const { findUserById, findUserByUsername, addUser, getAllPosts, 
  createPost, getPostbyId, deletePost, getComments, createComment, publish,
editPost, unpublish, deleteComment, userPosts, publishedPosts, latestPost, editComment } = require('../prisma/query')

function postSignup(req, res, err) {
  res.send(req.body);
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    await addUser(req.body.username, hashedPassword);
  });
  res.redirect('/login');
}

function userInfo(req, res, err) {
  const user = req.user.account;
  res.json(user);
}

async function postPosts(req, res, err) {
  const user = req.user.account;
  const { title, text, about, url } = req.body;
  const post = await createPost(user.id, title, about, text, user.username, url);
  res.sendStatus(200).end();
};

async function getPosts(req, res, err) {
  const posts = await getAllPosts();
  res.json(posts);
}

async function getPost(req, res, err) {
  const post = await getPostbyId(req.params.id);
  post.createdAt = post.createdAt.toDateString();
  res.json(post);
}

async function deletePostController(req, res, err) {
  await deletePost(req.params.id);
  res.json("Post successfully deleted.")
}

async function postLogin(req, res, next) {
  passport.authenticate('local', async function (err, user, info) {
    if (!user) {
      res.json("unauthorized");
    } else {
      const { username, password } = req.body;
      const account = await findUserByUsername(username);

      const accessToken = jwt.sign({ account }, 'secret key');
      res.json({
        accessToken
      })
    }
    return null;
  })(req, res, next);
}

async function getCommentsController(req, res, err){
  const comments = await getComments(req.params.id);
  for(let i =0 ; i < comments.length; i++){
    comments[i].createdAt = comments[i].createdAt.toDateString();
  }
  res.json(comments);
}

async function postComments(req, res, err){
  const comment = await createComment(req.params.id, req.body.comment, req.user.account.id, req.user.account.username);
  console.log(comment);
  res.sendStatus(200).end();
}

async function postPublish(req, res, err){
  const post = await publish(req.params.id);
  res.json(post);
}

async function postUnpublish(req, res, err){
  const post = await unpublish(req.params.id);
  res.json(post);
}

async function editPostController(req, res, err){
  const {title, about, text, url} = req.body;
  const post = await editPost(req.params.id, title, about, text, url);
  res.json(post);
}

async function deleteCommentController(req, res, err) {
  await deleteComment(req.params.id);
  res.json("Post successfully deleted.")
}

async function getUserPosts(req, res, err){
  const posts = await userPosts(req.user.account.id);
  res.json(posts);
}

async function getPublishedPosts(req, res, err){
  const posts = await publishedPosts();
  for(let i =0 ; i < posts.length; i++){
    posts[i].createdAt = posts[i].createdAt.toDateString();
  }
  res.json(posts);
}

async function getLatestPost(req, res, err){
  const posts = await latestPost();
  for(let i =0 ; i < posts.length; i++){
    posts[i].createdAt = posts[i].createdAt.toDateString();
  }
  res.json(posts);
}

async function putComment(req, res, err){
  const comment = await editComment(req.params.id, req.body.edit);
  res.json(comment);
}

module.exports = {
  postLogin,
  postLogin,
  postSignup,
  getPosts,
  userInfo,
  postPosts,
  getPost,
  deletePostController,
  getCommentsController,
  postComments,
  postPublish,
  editPostController,
  postUnpublish,
  deleteCommentController,
  getUserPosts, getPublishedPosts, getLatestPost,
  putComment
}