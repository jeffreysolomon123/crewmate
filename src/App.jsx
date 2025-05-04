import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home"
import Explore from './Pages/Explore';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Dashboard from './Pages/Dashboard';
import NewProject from './Pages/NewProject';
import ProjectDetail from './Pages/ProjectDetail';
import EditProject from './Pages/EditProject';
import Notifications from './Pages/Notifications';



function App() {



  return (
    <div>
      <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/newproject' element={<NewProject />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/edit/:id" element={<EditProject />} />
            <Route path='/notifications' element={<Notifications />}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
