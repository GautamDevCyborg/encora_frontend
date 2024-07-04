import React, { useState, useContext, useEffect } from 'react';
import ProfilePosts from '../components/features/ProfilePosts';
import { AddressContext } from '../contexts/AddressContext';
import axios from 'axios';

const EditProfile = () => {
  const [user, setUser] = useState({
    profilePicture: '/images/sprout.png',
    username: 'John Doe',
    email: 'john.doe@example.com'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const { isLoggedIn, setLoggedIn } = useContext(AddressContext);
  const { setProfilePicture } = useContext(AddressContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user/userdetails`, {
          withCredentials: true,
        });

        if (response.data.isLoggedIn) {
          const { user, posts } = response.data.user;
          setUser(user);
          setEditedUser(user);
          setPosts(posts);
          setProfilePicture(user.profilePicture);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking user auth', error);
        setLoggedIn(false);
      }
    };

    checkUserAuth();
  }, [setLoggedIn, setUser, setProfilePicture]);

  if (!isLoggedIn) {
    return <div style={{ fontSize: "100px", margin: "80px" }}>You are not logged in.</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") return; // Prevent changes to email
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSave = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/user/update/${user._id}`, {
        username: editedUser.username,
        profilePicture: editedUser.profilePicture
      }, { withCredentials: true });
  
      if (response.data.success) {
        setUser({ ...editedUser });
        setIsEditing(false);
      } else {
        console.error('Error updating profile:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedUser((prev) => ({ ...prev, profilePicture: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <>
      <section className="bg-image pt-40 pb-40">
        <div className="container">
          <h2 className="wow fadeInUp" data-wow-duration="1.2s" data-wow-delay=".2s">Profile</h2>
        </div>
      </section>
      <div style={styles.container}>
        <div style={styles.profileSection}>
          <div style={styles.profilePictureWrapper}>
            <img 
              src={user.profilePicture || "/images/sprout.png"} 
              alt="Profile" 
              style={styles.profilePicture} 
            />
            {isEditing && (
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleProfilePictureChange} 
                style={styles.fileInput}
              />
            )}
          </div>
          <div style={styles.profileInfo}>
            {isEditing ? (
              <>
                <input 
                  type="text" 
                  name="username" 
                  value={editedUser.username} 
                  onChange={handleChange} 
                  style={styles.input}
                />
              </>
            ) : (
              <>
                <h2>{user.username}</h2>
                <p>{user.email}</p>
              </>
            )}
          </div>
          <div style={styles.buttonContainer}>
            {isEditing ? (
              <>
                <button onClick={handleSave} style={styles.button}>Save</button>
                <button onClick={handleCancel} style={styles.button}>Cancel</button>
              </>
            ) : (
              <button onClick={handleEdit} style={styles.button}>Edit Profile</button>
            )}
          </div>
        </div>
      </div>
      <ProfilePosts initialData={posts} />
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    backgroundColor: '#f4f4f4',
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    margin: '0px 0',
  },
  profilePictureWrapper: {
    position: 'relative',
    marginRight: '20px'
  },
  profilePicture: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  fileInput: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0',
    cursor: 'pointer'
  },
  profileInfo: {
    flexGrow: 1
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    fontWeight:'bold',
    padding: '10px 20px',
    margin: '0 10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#8BC34A',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  }
};

export default EditProfile;
