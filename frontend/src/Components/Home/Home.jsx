// import React, { useEffect, useState } from 'react';
// import './Home.scss';
// import { FaPlus } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import route from '../router'

// function Home() {
//   const token = localStorage.getItem('Auth');
//   const [chatList, setChatList] = useState([]);
//   const navigate = useNavigate()

//   useEffect(() => {
//     fetchChatList();
//   }, []);

//   const fetchChatList = async () => {
//     try {
//       const { status, data } = await axios.get(`${route()}chatlist`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (status === 200) {
//         //Assuming data.chat is an array of user object or chat objects
//         setChatList(data.chatList);
//       }else {
//         alert(data.msg || 'Failed to fetch chat list');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('error fetching chat list');
      
//     }
//   };
 
//   const  handleUserClick = (id) => {
//     navigate(`/chat/${id}`);
//   };
//   const handlClick = () =>{
//     navigate(`/listuser`)
//   }

//   return (
//     <>
    
//     <div className="home-container">
//   <h2>Chat List</h2>
//   <div className="chat-list">
//     {chatList.length === 0 ? (
//       <p>No chats found.</p>
//     ) : (
//       chatList.map((user) => (
//         <div
//           key={user._id}
//           className="chat-item"
//           onClick={() => handleUserClick(user._id)}
//         >
//           <img
//             src={user.profile || 'https://via.placeholder.com/100'}
//             alt="profile"
//             className="profile-img"
//           />
//           <span className="username">{user.username}</span>
//         </div>
//       ))
//     )}
//   </div>

//   <div className="dv1" onClick={handlClick}>
//     <FaPlus className="Fa" />
//   </div>
// </div>

//     </>
//   );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import "./Home.scss";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import router from "../router"; // ✅ frontend helper, not backend import

function Home() {
  const token = localStorage.getItem("Auth");
  const [chatList, setChatList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChatList();
  }, []);

  const fetchChatList = async () => {
    try {
      const { status, data } = await axios.get(`${router()}chatlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (status === 200) {
        // assuming data.chatList is an array of user objects or chat objects
        setChatList(data.chatList);
      } else {
        alert(data.msg || "Failed to fetch chat list");
      }
    } catch (error) {
      console.error(error);
      alert("Error fetching chat list");
    }
  };

  const handleUserClick = (id) => {
    navigate(`/chat/${id}`);
  };

  const handleClick = () => {
    navigate(`/listuser`);
  };

  return (
    <div className="home-container">
      <h2>Chat List</h2>
      <div className="chat-list">
        {chatList.length === 0 ? (
          <p>No chats found.</p>
        ) : (
          chatList.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user._id)}
              className="chat-list-item"
              style={{
                cursor: "pointer",
                padding: "10px",
                borderBottom: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={user.profile || "/default-avatar.png"} // fallback if no profile image
                alt={user.username}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <span>{user.username}</span>
            </div>
          ))
        )}
      </div>
      <div className="dv1" onClick={handleClick}>
        <FaPlus className="Fa" />
      </div>
    </div>
  );
}

export default Home;