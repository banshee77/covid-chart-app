import React from 'react';
import ReactApexBarChart from './components/ReactApexBarChart';
import ReactApexLineChart from './components/ReactApexLineChart';

const App = () => {
  return (
    <div className="fancy-page">
      <h1>Dashboard with multiple charts</h1>
        <ReactApexBarChart />
        <ReactApexLineChart />
    </div>
  );
};

export default App;