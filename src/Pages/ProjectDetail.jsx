import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header2 from "../Components/Header2";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [userInfo, setUserInfo] = useState();
  const navigate = useNavigate();

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
        console.log("Error checking authentication: ", error);
        navigate("/login");
      }
    };
  
    checkAuthentication(); // ✅ Call it here
  }, []); // ✅ Add this to run on mount
  

  useEffect(()=>{
    const getName = async () => {
      try {
        const response =  await axios.post("http://localhost:3000/getname",userInfo.id, {withCredentials : true});
        console.log(response.data);
      } catch (error) {
        console.log(error)
      }
    }
    getName();

  },[]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/project/${id}`, {
          withCredentials: true
        });
        setProject(response.data.project);
      } catch (error) {
        console.log("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [id]);

  
  

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <Header2 />
      <div className="explore-container">
        <h1 className="explore-title">{project.title}</h1>
        <p className="project-description" style={{ fontSize: "1.1rem", color:"#080F0E" , textAlign : "center" }}>

          {project.description}
        </p>
        <button className="reach-btn">Send Message</button>
      </div>
      <Footer />
    </div>
  );
}

export default ProjectDetail;
