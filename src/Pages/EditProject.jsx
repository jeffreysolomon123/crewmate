import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header2 from "../Components/Header2";
import Footer from "../Components/Footer";

function EditProject() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("https://crewmate-api-v2.vercel.app/auth/check", {
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
    const fetchProject = async () => {
      try {
        const response = await axios.get(`https://crewmate-api-v2.vercel.app/edit/${id}`, {
          withCredentials: true,
        });
        setTitle(response.data.project.title);
        setDescription(response.data.project.description);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          alert("You are not allowed to edit this project.");
          navigate("/"); // or navigate to 403 page
        } else {
          console.log("Error fetching project:", error);
        }
      }
    };
    fetchProject();
  }, [id, navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://crewmate-api-v2.vercel.app/edit/${id}`,
        { title, description },
        { withCredentials: true }
      );
      navigate(`/project/${id}`);
    } catch (error) {
      console.log("Error updating project:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <Header2 />
      <main className="page-content">
        <div className="edit-form-wrapper">
          <h2>Edit Project</h2>
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button type="submit">Update Project</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default EditProject;
