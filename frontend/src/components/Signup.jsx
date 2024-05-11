
import React, { useState } from 'react';
import styles from '../styles/signup.module.css'; 
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    year: '',
    field: ''
  });

  const { username, password, year, field } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      let res = await axios.post("http://127.0.0.1:8080/students/signup", formData)
      console.log(res)
    } catch (error) {
      
    }
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles["form-container"]}>
      <h2>Signup</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
        <input type="number" placeholder="Year" name="year" value={year} onChange={onChange} required />
        <input type="text" placeholder="Field/Stream" name="field" value={field} onChange={onChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Signup;
