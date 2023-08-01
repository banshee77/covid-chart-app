import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
Chart.register(CategoryScale);

const App = () => {
  const [chartData, setChartData] =  useState({datasets: []});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/getCovidData');
      console.log(response.data)
      setChartData(response.data);
      setChartOptions({
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            min: 0,
            max: response.data.labels.length - 1,
            ticks: {
              callback: (value, index) => response.data.labels[index],
            },
          },
        },
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>COVID-19 Data in 2021 by Month</h1>
      <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Bar data={chartData} options={chartOptions} />
      <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default App;
