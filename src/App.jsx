import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home"
import Explore from './Pages/Explore';
import Onboard from "./Pages/Onboard"
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import NewProject from './Pages/NewProject';



function App() {



  return (
    <div>
      <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/onboard' element={<Onboard />} />   
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/newproject' element={<NewProject />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
