const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
let users = 0;

async function findUserById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id
    },
    include: {
      Entity: true
    }
  })
  return user;
}

async function findUserByUsername(username) {
  const user = await prisma.user.findFirst({
    where: {
      username: username
    }
  })
  console.log(user);
  return user;
}

async function addUser(username, password) {
  let roler = 'USER'
  if(users == 0){
    roler = 'ADMIN'
  };
  const user = await prisma.user.create({
    data: {
      username,
      password,
      role: roler
    }
  })
  users++;

  return console.log("User created successfully");
}

async function createPost(userId, title, about, text, username, url) {
  const post = await prisma.post.create({
    data: {
      title: title,
      text: text,
      userId: userId,
      username: username,
      about: about,
      url: url
    }
  })
  console.log(post);
  return post;
}

async function getAllPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

async function deletePost(id) {
  await prisma.post.delete({
    where: {
      id: parseInt(id)
    }
  })
  console.log("Post successfully deleted")
}

async function getPostbyId(id) {
  id = parseInt(id);
  const post = await prisma.post.findFirst({
    where: {
      id: id
    }
  })
  return post;
}

async function getComments(id) {
  const comments = await prisma.comment.findMany({
    orderBy:{
      createdAt: 'desc'
    },
    where: {
      postId: parseInt(id)
    }
  })
  return comments;
}

async function createComment(postId, text, userId, username) {
  const comment = await prisma.comment.create({
    data: {
      postId: parseInt(postId),
      text: text,
      userId: parseInt(userId),
      username: username
    }
  })
  return comment;
}

async function editComment(commentId, newText){
  const comment = await prisma.comment.update({
    where:{
      id: parseInt(commentId)
    },
    data:{
      text: newText,
      edited: true
    }
  })
  return comment;
}

async function publish(postId) {
  const post = await prisma.post.update({
    where: {
      id: parseInt(postId)
    },
    data: {
      published: true,
      createdAt: new Date()
    }
  })
  return post;
}

async function unpublish(postId) {
  const post = await prisma.post.update({
    where: {
      id: parseInt(postId)
    },
    data: {
      published: false,
      createdAt: new Date()
    }
  })
  return post;
}

async function editPost(postId, title, about, text, url) {
  const post = await prisma.post.update({
    where: {
      id: parseInt(postId)
    },
    data: {
      createdAt: new Date(),
      title,
      about,
      text,
      url
    }
  })
  return post;
}

async function deleteComment(id) {
  await prisma.comment.delete({
    where: {
      id: parseInt(id)
    }
  })
  console.log("Comment successfully deleted")
}

async function userPosts(userId) {
  const posts = await prisma.post.findMany({
    where: {
      userId: parseInt(userId)
    }
  })
  return posts;
}

async function publishedPosts(){
  const posts = await prisma.post.findMany({
    where:{
      published: true
    }
  })
  return posts;
}

async function latestPost(){
  const posts = await prisma.post.findMany({
    orderBy:{
      createdAt: 'desc'
    },
    where:{
      published: true
    }
  })
  return posts;
}

module.exports = {
  findUserById,
  findUserByUsername,
  addUser,
  getAllPosts,
  createPost,
  getPostbyId,
  deletePost,
  getComments,
  createComment,
  publish,
  editPost,
  unpublish,
  deleteComment, userPosts, publishedPosts, latestPost,
  editComment
}