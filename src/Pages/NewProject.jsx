import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header2 from "../Components/Header2";
import Footer from "../Components/Footer";
function NewProject() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState()
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        console.log({title,description})
    try{
        const response = await axios.post("http://localhost:3000/newproject", {title, description , userId: userInfo.id}, {withCredentials:true});
        if(response.status === 200) {
            navigate('/dashboard');
          }
    } catch (error) {
        console.log("Error signing up: ",error)
    }
  }
    

  useEffect(() => {
    const checkAuthentication = async ()=>{
        try {
            const response = await axios.get("http://localhost:3000/auth/check", {
                withCredentials: true // Allows Cookies to Be Sent/Received
            })

            if(!response.data.authenticated){
                navigate("/login") // redirect to login page if not authenticated
            }

            else {
                setUserInfo(response.data.user);

            }
        } catch (error) {
            console.log("Error checking authentication: ",error);
            navigate("/login");
        }
    }



    checkAuthentication();
    
  })

    return (
        <div className="page-wrapper">
            <Header2 />
            <main className="page-content">
          <div className="new-project-container">
            <h1 className="new-project-heading">New Project</h1>
            <form onSubmit={handleSubmit} className="new-project-form">
  <label htmlFor="project-title" className="new-project-label">Project Requirement *</label>
  <input
    className="new-project-input"
    type="text"
    id="project-title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="e.g. Looking for a Flutter Developer for a Finance Tracker App"
  />

  <label htmlFor="project-description" className="new-project-label">Project Description *</label>
  <textarea
    className="new-project-textarea"
    id="project-description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Briefly describe your project and what are the skills you're expecting..."
  />

  <button type="submit" className="new-project-submit-button">Submit</button>
</form>

          </div>
          </main >
          <Footer />
        </div>
    )
}

export default NewProject;