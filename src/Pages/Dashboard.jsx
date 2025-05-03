import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header3 from "../Components/Header3";
import { FaPlus } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaBell } from "react-icons/fa";


function Dashboard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/check", {
          withCredentials: true,
        });

        if (!response.data.authenticated) {
          navigate("/login");
        } else {
          setUserInfo(response.data.user);
        }
      } catch (error) {
        console.log("Error checking authentication:", error);
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    const fetchUserProjects = async () => {
      if (!userInfo) return;

      try {
        const response = await axios.post(
          "https://crewmate-api-v2.vercel.app/fetchuserprojects",
          { userId: userInfo.id },
          { withCredentials: true }
        );
        setProjects(response.data.projects); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProjects();
  }, [userInfo]);

  return (
    <div>
      <Header3 />
      <div>
      <div className="dashboard-top-container">
  <h1 className="dashboard-heading">Dashboard</h1>
  
  <div className="dashboard-buttons-left">
    <button className="dashboard-notifications-button">Notifications <FaBell style={{ position: 'relative', top: '2px' }}/></button>
    <button className="dashboard-editprofile-button">Edit Profile  <FaPen style={{ position: 'relative', top: '2px' }} /></button>
  </div>

  <div className="dashboard-buttons-right">
    <a href="/newproject"><button className="dashboard-newpost-button">New Project <FaPlus style={{ position: 'relative', top: '2px' }} /></button></a>
  </div>

</div>



            <div className="dashboard-projects-container">
            <h1 className="dashboard-heading">My Projects</h1>
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-buttons">
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                  </div>
                </div>
              ))}
            </div>
      </div>
    </div>
  );
}

export default Dashboard;
