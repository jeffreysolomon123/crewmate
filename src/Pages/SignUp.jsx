import React, { useState , useEffect } from "react";
import "../App.css";
import { useNavigate, useNavigationType } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("https://crewmate-api-v2.onrender.com/auth/check", {
          withCredentials: true,
        });

        if (response.data.authenticated) {
          navigate("/explore");
        }
      } catch (error) {
        console.log("Error checking authentication:", error);
        navigate("/");
      }
    };

    checkAuthentication();
  }, [navigate]);


  async function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, email, password});
    try {
        const response = await axios.post("https://crewmate-api-v2.onrender.com/signup", {name, email, password}, {withCredentials:true});
        if(response.status === 200) {
            navigate('/onboard');
          }
    } catch (error) {
        console.log("Error signing up: ",error)
    }
  }

  return (
    <div>
      <Header />
    <div className="login-page-container">
      <h1 className="login-heading">Register</h1>

      <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="nameInputField">Name</label>
        <input 
          type="text"
          id="nameInputField"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
        <button type="submit" className="login-button whitebutton">Submit</button>

      </form>
      <a 
  href="/login" 
  style={{
    fontWeight: "100",
    fontSize: "15px",
    marginTop: "20px",
    color: "white",
    textDecoration: "underline",
    display: "inline-block" // ensure spacing works properly
  }}
>
  Already have an account? Login into account
</a>
      
      </div>
    </div>
    <Footer />
    </div>
  );
}

export default SignUp;
