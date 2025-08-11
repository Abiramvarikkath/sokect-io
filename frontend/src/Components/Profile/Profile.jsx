
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import route from '../router';
import './Profile.scss'; // ✅ Import the SCSS

function Profile() {
  const token = localStorage.getItem("Auth");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { status, data } = await axios.get(`${route()}profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (status === 200) {
        console.log("Fetched data", data);
        setProfile(data.user);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Profile</h1>
        <img src={profile.profile || '/default-profile.png'} alt="Profile" />
        <h2>Username:{profile.username}</h2>
        <h4>Email:{profile.email}</h4>
        <h4>Phone No:{profile.phone}</h4>
      </div>
    </div>
  );
}

export default Profile;
