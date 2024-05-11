// src/components/Login.js

import React, { useState } from 'react';
import styles from '../styles/login.module.css'; // Import CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'student' // Default user type is student
  });

  const { username, password, userType } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    // Implement backend API call to log in user
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles["form-container"]}>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
        <select name="userType" value={userType} onChange={onChange}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
