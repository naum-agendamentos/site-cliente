import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import BarChartComponent from '../../components/barChart/BarChartComponent';

const Dashboard = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response1 = await axios.get('http://example.com/endpoint1');
      setData1(response1.data);

      const response2 = await axios.get('http://example.com/endpoint2');
      setData2(response2.data);

      const response3 = await axios.get('http://example.com/endpoint3');
      setData3(response3.data);

      const response4 = await axios.get('http://example.com/endpoint4');
      setData4(response4.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.charts}>
      <BarChartComponent data={{ labels: data1.labels, datasets: [{ label: 'Data 1', data: data1.values }] }} />
      <BarChartComponent data={{ labels: data2.labels, datasets: [{ label: 'Data 2', data: data2.values }] }} />
      <BarChartComponent data={{ labels: data3.labels, datasets: [{ label: 'Data 3', data: data3.values }] }} />
      <BarChartComponent data={{ labels: data4.labels, datasets: [{ label: 'Data 4', data: data4.values }] }} />
      </div>
    </div>
  );
};
export default Dashboard;