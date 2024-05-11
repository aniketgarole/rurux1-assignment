import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'; 

const Performance = () => {
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    // Fetch performance data from backend when component mounts
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      // Make GET request to fetch performance data
      const response = await axios.get('/api/student/performance');
      setPerformanceData(response.data);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  useEffect(() => {
    if (performanceData) {
      renderChart();
    }
  }, [performanceData]);

  const renderChart = () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: performanceData.subjects.map(subject => subject.name),
        datasets: [{
          label: 'Marks Distribution',
          data: performanceData.subjects.map(subject => subject.marks),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ]
        }]
      },
      options: {
        responsive: true
      }
    });
  };

  return (
    <div className="my-performance-page">
      <h2>My Performance</h2>
      {performanceData ? (
        <div>
          <h3>Subject-wise Marks</h3>
          <ul>
            {performanceData.subjects.map((subject) => (
              <li key={subject.name}>{subject.name}: {subject.marks}</li>
            ))}
          </ul>
          <div>
            <h3>Marks Distribution</h3>
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
        </div>
      ) : (
        <p>Loading performance data...</p>
      )}
    </div>
  );
};

export default Performance;
