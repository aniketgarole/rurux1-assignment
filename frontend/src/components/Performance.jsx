// src/components/Performance.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/performance.module.css'; // Import CSS file for styling

const Performance = () => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    // Implement backend API call to fetch performance data
    axios.get('/api/students/performance')
      .then(res => {
        setPerformanceData(res.data);
      })
      .catch(err => console.error('Error fetching performance data:', err));
  }, []);

  return (
    <div className={styles["performance-container"]}>
      <h2>My Performance</h2>
      <ul>
        {performanceData.map((item, index) => (
          <li key={index}>{item.subject}: {item.marks}</li>
        ))}
      </ul>
    </div>
  );
};

export default Performance;
