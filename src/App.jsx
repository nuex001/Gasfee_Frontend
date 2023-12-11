import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/layout/Nav'
import Home from './components/pages/Home';
import Footer from './components/layout/Footer';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Dashboard from './components/pages/user/Dashboard';
import PrivateRoutes from './components/pages/PrivateRoutes';
import Stake from './components/pages/Stake';
function App() {

  return (
    <BrowserRouter>
      <div className='container'>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/stake" element={<Stake />} />
          <Route element={<PrivateRoutes />}>
          <Route exact path="/user/*" element={<Dashboard />} />
            {/* <Route exact path="/admin/*" element={<Admin />} /> */}
          </Route>

        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>

  )
}

export default App
