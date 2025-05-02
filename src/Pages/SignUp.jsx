import React, { useState } from "react";
import "../App.css";
import { useNavigate, useNavigationType } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  function addSkill(e) {
    e.preventDefault(); // prevents form submission
    if (skill.trim()) {
      setSkills([...skills, skill.trim()]);
      setSkill("");
    }
  }

  function removeSkill(index) {
    setSkills(skills.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log({ name, email, password, skills });
    try {
        const response = await axios.post("http://localhost:3000/signup", {name, email, password, skills}, {withCredentials:true});
        if(response.status === 200) {
            navigate('/onboard');
          }
    } catch (error) {
        console.log("Error signing up: ",error)
    }
  }

  return (
    <div id="signUpFormContainer">
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

        <label htmlFor="skillInputField">Skills</label>
        <input
          type="text"
          id="skillInputField"
          placeholder="Enter a skill"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addSkill(e)}
        />
        <button onClick={addSkill}>Add</button>

        <ul>
          {skills.map((s, i) => (
            <li key={i}>
              {s} <button type="button" onClick={() => removeSkill(i)}>x</button>
            </li>
          ))}
        </ul>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
