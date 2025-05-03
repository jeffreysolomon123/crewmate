import React from "react";
import "../App.css"
import { Link } from "react-router-dom"; 
import { FaArrowRight } from "react-icons/fa6";



function Header3() {
    return (
      <header className="header">
        <div className="logo header2-logo-options"><a href="/" style={{color:"white" , textDecoration : "none"}}>Crewmate</a></div>
        <nav className="nav">
          <Link to="/explore" className="exploreBtn explore-btn-options">Explore Projects</Link>
          <Link to="/" className="loginBtn dashboard-options" style={{color: "white", backgroundColor : "red"}}>Log Out</Link>
        </nav>
      </header>
    );
  }
  

export default Header3;