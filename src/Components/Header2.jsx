import React from "react";
import "../App.css"
import { Link } from "react-router-dom"; 
import { FaArrowRight } from "react-icons/fa6";



function Header2() {
    return (
      <header className="header">
        <div className="logo header2-logo-options"><a href="/" style={{color:"white" , textDecoration : "none"}}>Crewmate</a></div>
        <nav className="nav">
          <Link to="/explore" className="exploreBtn explore-btn-options">Explore Projects</Link>
          <Link to="/dashboard" className="loginBtn dashboard-options">Dashboard <FaArrowRight style={{ position: 'relative', top: '2px' }}/></Link>
        </nav>
      </header>
    );
  }
  

export default Header2;