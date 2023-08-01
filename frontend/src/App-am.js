import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Legend, XYChart, CategoryAxis, ValueAxis, ColumnSeries, XYCursor, XYChartScrollbar } from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4core from '@amcharts/amcharts4/core';
import am4lang_en from '@amcharts/amcharts4/lang/en_US';
import { create as am4core_create } from '@amcharts/amcharts4/core';

am4core.useTheme(am4themes_animated);

const App = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/getCovidDataAmChart');
      console.log(response.data);
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    renderChart();
    return () => {
      cleanupChart();
    };
  }, [chartData]);

  const renderChart = () => {
    const chart = am4core_create('chartdiv', XYChart);
    chart.language.locale = am4lang_en;
    chart.data = chartData;

    const categoryAxis = chart.xAxes.push(new CategoryAxis());
    categoryAxis.dataFields.category = 'month';
    categoryAxis.renderer.minGridDistance = 30;

    const valueAxis = chart.yAxes.push(new ValueAxis());

    createSeries(chart, 'Confirmed Cases', 'confirmed_cases', '#ff0000');
    createSeries(chart, 'Deaths', 'deaths', '#0000ff');
    createSeries(chart, 'Recovered', 'recovered', '#00ff00');

    chart.cursor = new XYCursor();
    chart.scrollbarX = new XYChartScrollbar();
    chart.scrollbarX.series.push(chart.series.getIndex(0));

    chart.legend = new Legend();
    chart.legend.useDefaultMarker = true;

    chart.legend.itemContainers.template.clickable = false;
    chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;
    chart.legend.itemContainers.template.events.on('hit', (event) => event.target.isActive = !event.target.isActive);
  };

  const createSeries = (chart, name, value, color) => {
    const series = chart.series.push(new ColumnSeries());
    series.dataFields.valueY = value;
    series.dataFields.categoryX = 'month';
    series.name = name;
    series.columns.template.tooltipText = `{name}: [bold]{valueY}[/]`;
    series.stroke = am4core.color(color);
    series.fill = am4core.color(color);
  };

  const cleanupChart = () => {
    if (document.getElementById('chartdiv')) {
      document.getElementById('chartdiv').innerHTML = '';
    }
  };

  return (
    <div>
      <h1>COVID-19 Data in 2021 by Month</h1>
      <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default App;
