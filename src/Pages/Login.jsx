import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


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
    <div id="signUpFormContainer">

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


        <button type="submit">Submit</button>
      </form>
      
    </div>
  );
}

export default Login;
