import React from "react";
import "../App.css"
import { Link } from "react-router-dom"; 
import { FaArrowRight } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Header3() {
  const navigate = useNavigate();

  const handleLogOutBtn = async ()=> {
    try {
      const response = await axios.post("https://crewmate-api-v2.onrender.com/logout",null, {withCredentials: true})
      navigate("/login")
      console.log("logged out successfully")
    } catch (error) {
      console.log("error in loggin out",error)
    }
  } 

    return (
      <header className="header">
        <div className="logo header2-logo-options"><a href="/" style={{color:"white" , textDecoration : "none"}}>Crewmate</a></div>
        <nav className="nav">
          <Link to="/explore" className="exploreBtn explore-btn-options">Explore Projects</Link>
          <button className="loginBtn dashboard-options" style={{color: "white", backgroundColor : "red" , cursor: "pointer"}} onClick={handleLogOutBtn}>Log Out</button>
        </nav>
      </header>
    );
  }
  

export default Header3;