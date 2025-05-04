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
  const [userDetails,setUserDetails] = useState();
  const [projectUserName, setPorjectUserName] = useState('');
  const [projectUserEmail, setProjectUserEmail] = useState('');
  const[message, setMessage] = useState('');
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


  useEffect(()=>{
    if (!userInfo) return; 
    const getName = async () => {
      try {
        const response =  await axios.post("http://localhost:3000/getname", {projectId : id}, {withCredentials : true});
        // setUserDetails(response.data.user); 
        console.log(response.data.projectUserDetails);
        setPorjectUserName(response.data.projectUserDetails.name);
        setProjectUserEmail(response.data.projectUserDetails.email);
      } catch (error) {
        console.log(error)
      }
    }
    getName();

  },[userInfo]);



  
  

  if (!project) return <p>Loading...</p>;

  return (
    <div className="page-wrapper">
      <Header2 />
      <main className="page-content">
      <div className="explore-container">
        <h1 className="explore-title">{project.title}</h1>
        <p className="project-description" style={{ fontSize: "1.1rem", color:"#080F0E" , textAlign : "center" }}>

          {project.description}
        </p>
        <h4 style={{textAlign: "center", marginTop: "20px"}}>Project by : {projectUserName}</h4>
        <div className="message-container">
          
        <h4>Start working now!</h4>
        <textarea
            className="message-project-textarea"
            id="project-description"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here to start working with project owner..."
        />
        <button className="reach-btn">Send Message</button>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProjectDetail;
