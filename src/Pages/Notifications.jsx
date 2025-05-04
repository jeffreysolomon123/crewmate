import {React, useEffect, useState} from "react";
import Header2 from "../Components/Header2";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Notifications() {
    const [userInfo, setUserInfo] = useState();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([])
    

    useEffect(() => {
        if (!userInfo) return;
      
        const getMessages = async () => {
          try {
            const response = await axios.post("https://crewmate-api-v2.onrender.com/getmessages", { userId: userInfo.id }, { withCredentials: true });
            //console.log(response.data.Messages);
            setMessages(response.data.Messages);
          } catch (error) {
            console.log(error);
          }
        };
      
        getMessages();
      }, [userInfo]); // run when userInfo is available
      

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
      


    return(
        <div className="page-wrapper"> 
            <Header2 />
            <main className="notif-page-content page-content">
  <h2 className="notif-heading">Messages</h2>
  {messages.length === 0 ? (
    <p className="notif-no-messages">No messages found.</p>
  ) : (
    <div className="notif-message-container">
      {messages.map((msg, index) => (
        <div className="notif-message-card" key={index}>
          <p className="notif-message-text"><strong>Message:</strong> {msg.message}</p>
          <p className="notif-sender-info"><strong>From:</strong> {msg.senderName} ({msg.senderEmail})</p>
        </div>
      ))}
    </div>
  )}
</main>
            <Footer />
        </div>
    )
}


export default Notifications;
