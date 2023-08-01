import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';


const ReactApexLineChart = () => {
  const [chartData, setChartData] = useState([]);
  const [chartTimestamp, setTimestamp] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/getCovidDataAmChart');
      console.log(response.data)
      setChartData(response.data.data);
      setTimestamp(response.data.timestamp);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getSeries = (field) => {
    return chartData.map((data) => data[field]);
  };

  const getCategories = () => {
    return chartData.map((data) => data.month);
  };

  const getTimestamp = () => {
    const year = chartTimestamp.slice(0, 4);
    const month = chartTimestamp.slice(4, 6);
    const day = chartTimestamp.slice(6, 8);
    const hours = chartTimestamp.slice(8, 10);
    const minutes = chartTimestamp.slice(10, 12);
    const seconds = chartTimestamp.slice(12, 14);;

    // Create a new Date object with the extracted components
    const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}`);
    console.log(date.toLocaleString());
    return date.toLocaleString();
  };

  const chartOptions = {
    chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true | '<img src="/static/icons/reset.png" width="20">',
            customIcons: []
          },
          export: {
            csv: {
              filename: undefined,
              columnDelimiter: ',',
              headerCategory: 'category',
              headerValue: 'value',
              dateFormatter(timestamp) {
                return new Date(timestamp).toDateString()
              }
            },
            svg: {
              filename: undefined,
            },
            png: {
              filename: undefined,
            }
          },
          autoSelected: 'zoom' 
        }
    },    
    xaxis: {
        categories: getCategories(),
        labels: {
          show: true,
        },
        tickPlacement: 'on',
      },
      // yaxis: {
      //   labels: {
      //     formatter: function (val) {
      //       return val.toFixed(0);
      //     },
      //   },
      // },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(0);
        },
      },
      stroke: {
        curve: 'straight',
      },
      fill: {
        opacity: 1,
      },
      title: {
        text: "Covid chart",
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize:  '24px',
          fontWeight:  'bold',
          fontFamily:  undefined,
          color:  '#263238'
        },
      },
      subtitle: {
        text: getTimestamp(),
        align: 'center',
        margin: 10,
        offsetX: 0,
        offsetY: 40,
        floating: false,
        style: {
          fontSize:  '12px',
          fontWeight:  'normal',
          fontFamily:  undefined,
          color:  '#9699a2'
        },
      },
      tooltip: {
        enable: true,
        shared: true,
        followCursor: true,
        intersect: false,
      },
      legend: {
        show: true,
        position: 'right',
        offsetY: 250,
      },
    }


  return (
    <div className="chart-container">
      <ReactApexChart
        options={chartOptions}
        series={[
        { name: 'Confirmed Cases', data: getSeries('confirmed_cases') },
        { name: 'Deaths', data: getSeries('deaths') },
        { name: 'Recovered', data: getSeries('recovered') },
        ]}
        type="line"
        title="Line chart"
        height={600}
        width={1200}
      />
    </div>  
  );
};

export default ReactApexLineChart;
