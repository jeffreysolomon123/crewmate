import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Explore() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState()
  useEffect(() => {
    const checkAuthentication = async ()=>{
        try {
            const response = await axios.get("https://crewmate-api-v2.vercel.app/auth/check", {
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
    
  },[])



    return (
        <div>
          <h1>explore page</h1>
          {userInfo? (
            <h1>{userInfo.id}</h1>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
    )
}

export default Explore;