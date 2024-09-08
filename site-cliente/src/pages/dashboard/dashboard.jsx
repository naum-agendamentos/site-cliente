import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styles from './dashboard.module.css';
import BarChartComponent from '../../components/barChart/BarChartComponent';
import HorizontalBarChartComponent from '../../components/barChart/HorizontalBarChartComponent';
//import LineChartComponent from '../../components/barChart/LineChartComponent';
import BarChartTopServices from '../../components/barChart/BarChartTopServices';
import NavbarBarbeiros from "../../components/navbarBarbeiro/NavbarBarbeiro";
import api from '../../api';

const Dashboard = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [lucro, setLucro] = useState(0);
  const [TotAgenHoje, setTotAgenHoje] = useState(0);
  const [compAgend, setCompAgend] = useState(0);
  const [mediaAva, setMediaAva] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const endpoints = [
        'dashboards/cortes-por-barbeiro',
        'dashboards/lucro-por-barbeiro',
        'dashboards/top-servicos',
        'dashboards/lucro',
        'dashboards/total-agendamento-hoje',
        'dashboards/porcentagem-agendamento-hoje-ontem',
        'dashboards/media-avaliacao/1'
      ];

      const options = {
        headers: {
          'User-Agent': 'insomnia/8.6.1',
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      };

      const responses = await Promise.all(endpoints.map(endpoint => api.get(endpoint, options)));

      setData1(responses[0].data.map(service => ({ name: service.nome.slice(0, 15), value: service.cortes })));
      setData2(responses[1].data.map(service => ({ name: service.nome.slice(0, 7), value: service.lucro })));
      setData3(responses[2].data.map(service => ({ name: service.nome.slice(0, 7), value: service.qtdMes })));
      setLucro(responses[3].data);
      setTotAgenHoje(responses[4].data);
      setCompAgend(responses[5].data);
      setMediaAva(responses[6].data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };


  return (
    <div className="borda-gradiente-left">
      <div className="borda-gradiente-right">
        <NavbarBarbeiros />
        <div className={styles["dashboard"]}>
          <div className={styles["container-kpis"]}>
            <div className={styles["bloco-kpi"]}>
              <p>Lucro total da Barbearia<br />
                <span>R${lucro.toFixed(2)}</span>
              </p>
            </div>
            <div className={styles["bloco-kpi"]}>
              <p>Total Agendamentos no Dia<br />
                <span> {TotAgenHoje} </span>
                <span className={compAgend < 0 ? styles["vermelho"] : compAgend > 0 ? styles["verde"] : styles["neutro"]}>
                  {compAgend < 0 ? '-' : compAgend > 0 ? '+' : ''}{Math.abs(compAgend.toFixed(2))}% Que ontem
                </span>

              </p>
            </div>
            <div className={styles["bloco-kpi"]}>
              <p>Média de avaliação<br />
                <span>{mediaAva ? mediaAva.toFixed(2) : '0'}</span>
                <span className={styles["estrela"]}> &#9733;</span>
              </p>
            </div>
          </div>
          <div className={styles["charts"]}>

            <HorizontalBarChartComponent className={styles["chart"]} title="Barbeiro com mais cortes" data={data1} color="#8884d8" isFirstChart={true} />
            <BarChartComponent title="Barbeiro com mais lucros" data={data2} color="#82ca9d" />
            <BarChartTopServices title="Top Serviços" data={data3} color="#ffc658" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
