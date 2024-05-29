import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import BarChartComponent from '../../components/barChart/BarChartComponent';
//import NavbarBarbeiros from '../../components/navbarBarbeiro/NavbarBarbeiro';

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

      const options = {
        method: 'GET',
        url: 'http://localhost:8080/dashboards/cortes-por-barbeiro',
        headers: {
          'User-Agent': 'insomnia/8.6.1',
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      };
      axios.request(options)
        .then(function (response) {
          if (response.data.length > 0) {
            setData1(response.data);
          } else {
            console.error("A resposta da API está vazia");
          }
        })
        .catch(function (error) {
          console.error(error);
        });


        const options2 = {
          method: 'GET',
          url: 'http://localhost:8080/dashboards/lucro-por-barbeiro',
          headers: {
            'User-Agent': 'insomnia/8.6.1',
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        };
        axios.request(options2)
          .then(function (response) {
            if (response.data.length > 0) {
              setData2(response.data);
            } else {
              console.error("A resposta da API está vazia");
            }
          })
          .catch(function (error) {
            console.error(error);
          });


          const options3 = {
            method: 'GET',
            url: 'http://localhost:8080/dashboards/top-servicos',
            headers: {
              'User-Agent': 'insomnia/8.6.1',
              Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
          };
          axios.request(options3)
            .then(function (response) {
              if (response.data.length > 0) {
                setData3(response.data);
              } else {
                console.error("A resposta da API está vazia");
              }
            })
            .catch(function (error) {
              console.error(error);
            });

            const options4 = {
              method: 'GET',
              url: 'http://localhost:8080/dashboards/agendamentos-semanais',
              headers: {
                'User-Agent': 'insomnia/8.6.1',
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
              }
            };
            axios.request(options4)
              .then(function (response) {
                if (response.data.length > 0) {
                  setData4(response.data);
                } else {
                  console.error("A resposta da API está vazia");
                }
              })
              .catch(function (error) {
                console.error(error);
              });

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