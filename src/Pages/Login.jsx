import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "../Components/Header.jsx"
import Footer from "../Components/Footer.jsx"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try { 
        await axios.post("http://localhost:3000/login", {email,password}, {withCredentials:true});
        navigate('/explore');
  
      } catch (error) {
        alert("Username or Password is wrong!");
        console.log("error login");
      }
  }
  return (
<div>    
  <Header />

  <div className="login-page-container">
    <h1 className="login-heading">Login</h1>

    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailInputField">Email</label>
        <input
          type="email"
          id="emailInputField"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="passwordInputField">Password</label>
        <input
          type="password"
          id="passwordInputField"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       <a 
  href="/signup" 
  style={{
    fontWeight: "100",
    fontSize: "15px",
    marginTop: "20px",
    color: "white",
    textDecoration: "underline",
    display: "inline-block" // ensure spacing works properly
  }}
>
  Don't have an account? Create a new account
</a>
        <button type="submit" className="login-button whitebutton" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  </div>

  <Footer />
</div>

  );
}

export default Login;
