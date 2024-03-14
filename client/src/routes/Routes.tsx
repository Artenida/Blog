import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../pages/Home/Home";
import About from "../pages/Home/About";
import Contact from "../pages/Home/Contact";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/Register";
import MyAccount from "../pages/Blog/MyAccount";
import BlogDetails from "../pages/Blog/BlogDetails";
import PrivateRoutes from "./PrivateRoute";
import Blog from "../pages/Blog/Blog";
import AuthorsPage from "../pages/Blog/AuthorsPage";
import CreatePost from "../pages/Blog/CreatePost";
import {new_blogs} from "../constants/data"
import UpdatePost from "../pages/Blog/UpdatePost";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/signIn", element: <SignIn /> },
  { path: "/signUp", element: <SignUp /> },
  { path: "/blog", element: <Blog /> },
  { path: "/authors", element: <AuthorsPage/> },
  { path: "/blog/:postId", element: <BlogDetails/> },
  { path: "*", element: <Home /> },
];

const AppRoutes = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" />
            <Route element={<MyAccount />} path="/dashboard" />
            <Route element={<CreatePost />} path="/createPost/:id" />
            <Route element={<UpdatePost />} path="/updatePost/:id" />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default AppRoutes;
