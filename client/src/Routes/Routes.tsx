import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import MyAccount from "../pages/MyAccount";
import BlogDetails from "../pages/BlogDetails";
import PrivateRoutes from "../Routes/PrivateRoute";
import BlogPage from "../pages/BlogPage";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/signIn", element: <SignIn /> },
  { path: "/signUp", element: <SignUp /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/blog/:id", element: <BlogDetails /> },
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
            <Route element={<MyAccount />} path="/myAccount" />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default AppRoutes;
