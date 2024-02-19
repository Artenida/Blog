import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home/Home";
import About from "../pages/Home/About";
import Contact from "../pages/Home/Contact";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/Register";
import MyAccount from "../pages/Blog/MyAccount";
import BlogDetails from "../pages/Blog/BlogDetails";
import PrivateRoutes from "../Routes/PrivateRoute";
import Blog from "../pages/Blog/Blog";
import AuthorsPage from "../pages/Blog/AuthorsPage";

import {new_blogs} from "../config/data"


const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/signIn", element: <SignIn /> },
  { path: "/signUp", element: <SignUp /> },
  { path: "/blog", element: <Blog /> },
  { path: "/authors", element: <AuthorsPage/> },
  { path: "/blog/:id", element: <BlogDetails blogs={new_blogs}/> },
  { path: "*", element: <Home /> },
];

const AppRoutes = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" />
            <Route element={<MyAccount />} path="/dashboard" />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default AppRoutes;
