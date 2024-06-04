import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import BarChartComponent from '../../components/barChart/BarChartComponent';
import NavbarBarbeiros from "../../components/navbarBarbeiro/NavbarBarbeiro";

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
      const endpoints = [
        'http://localhost:8080/dashboards/cortes-por-barbeiro',
        'http://localhost:8080/dashboards/lucro-por-barbeiro',
        'http://localhost:8080/dashboards/top-servicos',
        'http://localhost:8080/dashboards/agendamentos-semanais'
      ];

      const options = {
        headers: {
          'User-Agent': 'insomnia/8.6.1',
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      };

      const responses = await Promise.all(endpoints.map(endpoint => axios.get(endpoint, options)));

      setData1(responses[0].data.map(service => ({ name: service.nome, value: service.cortes })));
      setData2(responses[1].data.map(service => ({ name: service.nome, value: service.lucro })));
      setData3(responses[2].data.map(service => ({ name: service.nome, value: service.qtdMes })));
      setData4(responses[3].data.map(service => ({ name: service.nome, value: service })));
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <div class="borda-gradiente-left">
      <div class="borda-gradiente-right">
        <NavbarBarbeiros />
        <div className={styles["dashboard"]}>
          <h1>Dashboard</h1>
          <div className={styles["charts"]}>
            <BarChartComponent className={styles["chart"]} title="Barbeiro com mais cortes" data={data1} color="#8884d8" />
            <BarChartComponent title="Barbeiro com mais lucros" data={data2} color="#82ca9d" />
            <BarChartComponent title="Top Serviços" data={data3} color="#ffc658" />
            <BarChartComponent title="Serviços" data={data4} color="#ff7300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
