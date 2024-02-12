import React from 'react';
import { Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import Blog from '../pages/Blog';
import MyAccount from '../pages/MyAccount';
import RootLayout from "../layout/RootLayout";
import { Sign } from 'crypto';

const router = createBrowserRouter ([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/signIn',
        element: <SignIn />
      },
      {
        path: '/signUp',
        element: <SignUp />
      },
      {
        path: '/blog',
        element: <Blog />
      },
      {
        path: '/myAccount',
        element: <MyAccount />
      },
    ]
  },
])

const AppRoutes = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

export default AppRoutes;
