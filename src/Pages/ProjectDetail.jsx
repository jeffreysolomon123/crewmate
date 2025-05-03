import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header2 from "../Components/Header2";
import Footer from "../Components/Footer";

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

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
        <p className="project-description" style={{ fontSize: "1.1rem" }}>
          {project.description}
        </p>
        <button className="reach-btn">Send Message</button>
      </div>
      <Footer />
    </div>
  );
}

export default ProjectDetail;
