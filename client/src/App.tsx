import React from 'react'
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'

import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
// import Faq from "./pages/Faq"
import NotFound from "./pages/NotFound"


import RootLayout from "./layout/RootLayout"
import { NOTFOUND } from 'dns'

const router = createBrowserRouter (
  createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
       <Route path='/home' element={<Home />}/>
       <Route path='/about' element={<About />}/>
       <Route path='/contact' element={<Contact />}/>       
       <Route path='/signIn' element={<SignIn />}/>       
       <Route path='/signUp' element={<SignUp />}/>
       {/* <Route>
        <Route path='faq' element={<Faq />}/>
       </Route> */}

       <Route path='*' element={<NotFound />}/>
      </Route>
  )
)

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
