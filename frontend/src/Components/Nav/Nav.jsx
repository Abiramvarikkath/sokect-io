import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './Nav.scss';
import axios from 'axios';
import route from '../router';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("Auth");

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    try {
      const { status, data } = await axios.get(`${route()}nav`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (status === 200) {
        setUser(data.user);
      } else {
        alert(data.msg);
        navigate('/signin');
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate('/signin');
    }
  };

  const handleDropdownToggle = () => {
    setShowDropdown(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("Auth");
    alert("Logged out");
    navigate('/signin');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <nav className="home-nav">
      <div className="left-section">
        <h1><FaWhatsapp /> Whatsapp</h1>
      </div>

      <div className="right-section">
        <img
          src={user.profile || '/default-profile.png'}
          alt="profile"
          className="profile-img"
        />

        <div className="profile-dropdown">
          <h2>{user.username}</h2>
          <h6 onClick={handleDropdownToggle} className="profile-label">
            Profile ▼
          </h6>

          {showDropdown && (
            <ul className="dropdown-menu">
              <li onClick={goToProfile}>👤 Profile</li>
              <li onClick={handleLogout}>🔓 Logout</li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
