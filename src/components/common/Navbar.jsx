import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import axios from 'axios';

import '../../assets/css/bootstrap.min.css';
import '../../assets/css/all.min.css';
import '../../assets/css/swiper-bundle.min.css';
import '../../assets/css/magnific-popup.css';
import '../../assets/css/animate.css';
import '../../assets/css/nice-select.css';
import '../../assets/css/style.css';

import { AddressContext } from '../../contexts/AddressContext';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isLoggedIn, setLoggedIn } = useContext(AddressContext);
  const { profilePicture } = useContext(AddressContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const isActive = (path) => pathname === path;

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };


  const handleLinkClick = () => {
    setMenuActive(false);
    setProfileMenuOpen(false);
  };

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/signout`, {}, { withCredentials: true });
      setLoggedIn(false); // Update the userLoggedIn state
      navigate('/'); // Redirect to home page or login page
    } catch (error) {
      console.error('Logout failed:', error.response ? error.response.data : error.message);
    }
  };

  const profileIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    cursor: 'pointer',
  };

  const profileMenuStyle = {
    position: 'absolute',
    right: 0,
    background: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
    zIndex: 1000, // Ensure the profile menu stays on top
  };

  const profileMenuItemStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/check`, { withCredentials: true });
        setLoggedIn(response.data.loggedIn);
      } catch (error) {
        console.error('Error checking auth status:', error);
        setLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, [setLoggedIn]);

  return (
    <header className="header">
      <div className="header-section">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-menu">
              <Link to="/" onClick={handleLinkClick}><img src={'/images/encoraa-logo-d.png'} alt="logo" /></Link>
            </div>
            <div className="header-bar d-xl-none" onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <ul className={`main-menu ${menuActive ? 'active' : ''}`}>
              <li className={`header-menu-bg ${isActive('/') ? 'active' : ''}`}>
                <Link to="/" onClick={handleLinkClick}>Home</Link>
              </li>
              <li className={`header-menu-bg ${isActive('/TreeRegistry') ? 'active' : ''}`}>
                <Link to="/TreeRegistry" onClick={handleLinkClick}>TRP - Tree Registry Platform</Link>
              </li>
              <li className={`header-menu-bg ${isActive('/trees') ? 'active' : ''}`}>
                <Link to="/trees" onClick={handleLinkClick}>Trees</Link>
              </li>
              <li className={`header-menu-bg ${isActive('/map') ? 'active' : ''}`}>
                <Link to="/map" onClick={handleLinkClick}>Map</Link>
              </li>
              <li className={`header-menu-bg ${pathname.includes('/statistics') ? 'active' : ''}`}>
                <Link to="/statistics/chart" onClick={handleLinkClick}>Statistics</Link>
              </li>
              <li className={`header-menu-bg ${isActive('/upload') ? 'active' : ''}`}>
                <Link to="/upload" onClick={handleLinkClick}>Upload</Link>
              </li>
              <li className={`header-menu-bg ${isActive('/contact') ? 'active' : ''}`}>
                <Link to="/contact" onClick={handleLinkClick}>Contact Us</Link>
              </li>
              <li className="header-menu-bg profile-menu" style={{ position: 'relative' }}>
                <div className="profile-icon" onClick={handleProfileMenuToggle} style={profileIconStyle}>
                  {isLoggedIn ? (
                    <img src={profilePicture} alt="Profile" style={profileIconStyle} />
                  ) : (
                    <FaUser style={profileIconStyle} />
                  )}
                </div>
                {profileMenuOpen && (
                  <ul className="profile-sub-menu" style={profileMenuStyle}>
                    {isLoggedIn ? (
                      <>
                        <li style={profileMenuItemStyle} className={`${isActive('/profile') ? 'active' : ''}`}><Link to="/profile" onClick={handleLinkClick}>Profile</Link></li>
                        <li style={profileMenuItemStyle} className={`${isActive('/login') ? 'active' : ''}`}><Link to="/" onClick={logout}>Logout</Link></li>
                      </>
                    ) : (<>
                      <li style={profileMenuItemStyle} className={`${isActive('/login') ? 'active' : ''}`}><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
                       <li style={profileMenuItemStyle} className={`${isActive('/login') ? 'active' : ''}`}><Link to="/signup" onClick={handleLinkClick}>SignUp</Link></li>
                       </>
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
