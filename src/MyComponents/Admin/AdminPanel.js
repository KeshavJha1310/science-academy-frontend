import React, { useEffect } from 'react';
import Navbar2 from './NavbarAdmin';
import Sidebar from './AdminSideBar';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function AdminPanel() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/AdminLogin');
    }
  }, []);

  // Apply dark theme styling for charts
  const chartStyle = {
    backgroundColor: '#0F1A2D',
    style: {
      color: '#FFFFFF',
    },
  };

  const studentPerformanceOptions = {
    chart: {
      type: 'column',
      ...chartStyle,
    },
    title: {
      text: 'Average Subject Performance (Class 1–10)',
      style: { color: '#fff' },
    },
    xAxis: {
      categories: ['Hindi', 'Marathi', 'English', 'Maths', 'Science', 'Geography', 'History'],
      labels: { style: { color: '#ccc' } },
    },
    yAxis: {
      title: {
        text: 'Average Score (%)',
        style: { color: '#ccc' },
      },
      labels: { style: { color: '#ccc' } },
    },
    legend: {
      itemStyle: { color: '#fff' },
    },
    series: [
      {
        name: 'Class 1–5',
        data: [65, 70, 75, 72, 68, 60, 62],
        color: '#00bcd4',
      },
      {
        name: 'Class 6–10',
        data: [78, 82, 85, 80, 83, 75, 77],
        color: '#4caf50',
      },
    ],
  };
  

  const businessAnalyticsOptions = {
    chart: {
      type: 'pie',
      ...chartStyle,
    },
    title: {
      text: 'Class Revenue Distribution',
      style: { color: '#fff' },
    },
    tooltip: {
      pointFormat: '{series.name}: <b>₹{point.y}</b>',
    },
    legend: {
      itemStyle: { color: '#fff' },
    },
    series: [
      {
        name: 'Revenue',
        colorByPoint: true,
        data: [
          { name: 'Class 1', y: 12300, color: '#ff9800' },
          { name: 'Class 2', y: 30000, color: '#2196f3' },
          { name: 'Class 3', y: 20000, color: '#9c27b0' },
          { name: 'Class 4', y: 8000, color: '#f44336' },
          { name: 'Class 5', y: 7000, color: '#e91e63' },
          { name: 'Class 6', y: 10000, color: '#3f51b5' },
          { name: 'Class 7', y: 12000, color: '#00bcd4' },
          { name: 'Class 8', y: 9000, color: '#009688' },
          { name: 'Class 9', y: 11000, color: '#8bc34a' },
          { name: 'Class 10', y: 40000, color: '#ffc107' },
        ],
        
      },
    ],
  };

  const studentGrowthOptions = {
    chart: {
      type: 'line',
      ...chartStyle,
    },
    title: {
      text: 'Yearly Student Growth',
      style: { color: '#fff' },
    },
    xAxis: {
      categories: ['2019', '2020', '2021', '2022', '2023', '2024'],
      labels: { style: { color: '#ccc' } },
    },
    yAxis: {
      title: { text: 'Number of Students', style: { color: '#ccc' } },
      labels: { style: { color: '#ccc' } },
    },
    legend: { itemStyle: { color: '#fff' } },
    series: [
      {
        name: 'Total Students',
        data: [120, 150, 180, 220, 300, 350],
        color: '#03a9f4',
      },
    ],
  };


  return (
    <div className='AdminPanelMain'style={{ backgroundColor: '#0F1A2D', display: 'flex' , flexDirection: 'column', height: '100%'}}>
      <Navbar2 />
      <div className='contentgraph'>
        <div style={{ marginBottom: '10rem',position:'relative',top:'5rem',display:'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <HighchartsReact highcharts={Highcharts} options={businessAnalyticsOptions} />
        <HighchartsReact highcharts={Highcharts} options={studentGrowthOptions} />
        </div>
        <div>
        <HighchartsReact highcharts={Highcharts} options={studentPerformanceOptions} />
        </div>
      </div>
      <div className='sidebar'>
        <Sidebar />
      </div>
    
    </div>
  );
}

export default AdminPanel;
