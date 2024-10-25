import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignUpPage from './routes/signup';
import LoginPage from './routes/login';
import Header from './routes/header.jsx';
import Home from './routes/home.jsx';
import ViewPost from './routes/viewpost.jsx';
import './styles/posts.css'
import Footer from './routes/footer.jsx';

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
    element: < Home />
  },
  {
    path: '/post/:id',
    element: <ViewPost />
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router} />
  </React.StrictMode>
);