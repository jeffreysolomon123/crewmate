import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header2 from "../Components/Header2";
import Footer from "../Components/Footer";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Explore() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log("Error checking authentication: ", error);
        navigate("/login");
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!userInfo) return;
      try {
        const response = await axios.get("https://crewmate-api-v2.onrender.com/fetchprojects", {
          withCredentials: true,
        });
        setProjects(response.data.projects);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [userInfo]);

  return (
    <div className="page-wrapper">
      <Header2 />
      <div className="explore-container">
        <h1 className="explore-title">Explore Projects</h1>
        {loading ? (
          <p className="loading-text">Fetching cool projects...</p>
        ) : (
          <div className="project-list">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <h2 className="project-title">{project.title}</h2>
                <p className="project-description">
                  {project.description}
                </p>
                <Link to={`/project/${project.id}`} className="reach-btn">
                  Reach Out <FaArrowRight style={{ position: 'relative', top: '2px' }} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
