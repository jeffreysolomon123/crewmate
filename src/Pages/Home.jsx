import React, { use } from "react";
import { useEffect, useState } from 'react';
import '../App.css';
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import Footer from "../Components/Footer";
import Header2 from "../Components/Header2";

import axios from "axios";


function Home() {
    const[isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const checkAuthentication = async () => {
          try {
            const response = await axios.get("http://localhost:3000/auth/check", {
              withCredentials: true,
            });
    
            if (response.data.authenticated) {
              setIsLogged(true)
            }
          } catch (error) {
            console.log("Error checking authentication:", error);
          }
        };
    
        checkAuthentication();
      },[]);

    return (
        <div>
            {isLogged === true ? <Header2 /> : <Header />}
            <div className="hero-section-home">
                <h1 className="hero-heading">
                    Find Your Crew
                    <br />
                    Build Something Legendary.
                </h1>
                <h3 className="hero-subheading">
                    Find the right teammates to build, launch, and grow real
                    projects—together
                </h3>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "25px",
                        marginTop: "35px",
                    }}
                >
                    <a className="learn-more-button scroll-link" href="#howItWorks">Learn More</a>
                    <Link to="/login" className="whitebutton">
                        Get Started
                        <FaArrowRight style={{ position: "relative", top: "2px" }} />
                    </Link>
                </div>
            </div>

            <div className="howitworks-section" id="howItWorks">
                <h1 className="hiw-heading">How it works</h1>
                <div className="hiw-cards-section">
                    <div className="hiw-card">
                        <h1 className="hiw-number">1</h1>
                        <h2 className="hiw-card-heading">Create Your Profile</h2>
                        <h3 className="hiw-card-content">Showcase your skills, experience, and the types of projects you're looking to collaborate on.</h3>
                    </div>

                    <div className="hiw-card">
                        <h1 className="hiw-number">2</h1>
                        <h2 className="hiw-card-heading">Find or Post Projects</h2>
                        <h3 className="hiw-card-content">Browse through a list of open projects or create your own to find the right people to collaborate with.</h3>
                    </div>


                    <div className="hiw-card">
                        <h1 className="hiw-number">3</h1>
                        <h2 className="hiw-card-heading">Start Collaborating</h2>
                        <h3 className="hiw-card-content">Once you find your match, start working together, exchange ideas, and build amazing projects</h3>
                    </div>
                </div>
                    
            </div>
            <Footer />
        </div>
    );
}

export default Home;