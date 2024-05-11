// src/components/Profile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from  '../styles/profile.module.css'; // Import CSS file for styling

const StudentProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    // Implement backend API call to fetch student profile
    axios.get('/api/students/profile')
      .then(res => {
        setProfileData(res.data);
      })
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  return (
    <div className={styles["profile-container"]}>
      <h2>My Profile</h2>
      {profileData ? (
        <div>
          <p>Username: {profileData.username}</p>
          <p>Year: {profileData.year}</p>
          <p>Field/Stream: {profileData.field}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StudentProfile;
