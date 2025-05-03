import React from "react";
import "../App.css"
import { Link } from "react-router-dom"; 
import { FaArrowRight } from "react-icons/fa6";



function Header() {
    return (
      <header className="header">
        <div className="logo"><a href="/" style={{color:"white" , textDecoration : "none"}}>Crewmate</a></div>
        <nav className="nav">
          <Link to="/explore" className="exploreBtn">Explore</Link>
          <Link to="/login" className="loginBtn">Login <FaArrowRight style={{ position: 'relative', top: '2px' }}/></Link>
        </nav>
      </header>
    );
  }
  

export default Header;