import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUpPage from './routes/signup';
import LoginPage from './routes/login';
import Posts from './routes/posts';
import CreatePost from './routes/postCreate.jsx';
import Header from './routes/header.jsx';
import './styles/posts.css'
import ViewPost from './routes/viewPost.jsx';
import EditPost from './routes/editPost.jsx';

const router = createBrowserRouter([
  {
    path: "/signup",
    element: < SignUpPage />,
  },
  {
    path: '/login',
    element: < LoginPage />
  },
  {
    path: '/',
    element: <Posts />
  },
  {
    path: '/post/create',
    element: <CreatePost />
  },
  {
    path: '/post/:id',
    element: <ViewPost />
  },
  {
    path: '/edit/post/:id',
    element: <EditPost />
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>
);

