import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header3 from "../Components/Header3";
import { FaPlus } from "react-icons/fa";
import Footer from "../Components/Footer";
import { FaBell } from "react-icons/fa6";

function Dashboard() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // new loading state

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("https://crewmate-api-v2.onrender.com/auth/check", {
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
          "https://crewmate-api-v2.onrender.com/fetchuserprojects",
          { userId: userInfo.id },
          { withCredentials: true }
        );
        setProjects(response.data.projects);
        console.log(projects)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // set loading to false after fetch
      }
    };

    fetchUserProjects();
  }, [userInfo]);

  const handleDelete = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;
  
    try {
      await axios.delete(`https://crewmate-api-v2.onrender.com/${projectId}`, {
        withCredentials: true,
      });
      setProjects(projects.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
  };
  

  return (
    <div className="page-wrapper">
      <Header3 />
      <main className="page-content">
      <div>
      <h1 className="dashboard-heading" style={{ fontSize: "25px" , textAlign:"center", marginTop : "20px" }}>Welcome back, {userInfo.name}</h1>
        <div className="dashboard-projects-container">
          <h1 className="dashboard-heading" style={{ fontSize: "30px" }}>My Projects</h1>
          <div className="dashboard-buttons-left">
            <a href="/newproject"><button className="dashboard-newpost-button">New Project <FaPlus style={{ position: 'relative', top: '2px' }} /></button></a>
            <a href="/notifications"><button className="dashboard-newpost-button">Notifications <FaBell style={{ position: 'relative', top: '2px' }} /></button></a>
          </div>

          {loading ? (
            <p className="loading-text">Loading your projects...</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="project-card">
                <h3 className="project-title">{project.title}</h3>
                <h4 className="project-description">{project.description}</h4>
                <div className="project-buttons">
                  <Link to={`/edit/${project.id}`} className="edit-button">Edit</Link>
                  <button className="delete-button" onClick={() => handleDelete(project.id)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
