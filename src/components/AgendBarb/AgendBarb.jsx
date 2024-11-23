import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './AgendBarb.module.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import api from '../../api';

const localizer = momentLocalizer(moment);

const messages = {
  allDay: 'Dia Todo',
  previous: '<',
  next: '>',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'Não há eventos neste intervalo.',
  showMore: (total) => `+ Ver mais (${total})`
};

const formats = {
  timeGutterFormat: (date, culture, localizer) => localizer.format(date, 'HH:mm', culture),
  eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
  agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
    `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`
};

const AgendBarb = () => {
  const [events, setEvents] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {

        const options = {
          method: 'GET',
          url: `agendamentos/barbeiroBloq/${id}`,
          headers: {
            'User-Agent': 'insomnia/8.6.1',
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
          }
        };
        api.request(options)
          .then(function (response) {

            if (response.data && response.data.length > 0) {
              console.log(response.data);

              const eventData = response.data.map(item => {

                console.log("ITEM: " + item);
                const { dataHoraAgendamentoInicio, dataHoraAgendamentoFim, cliente, servicos } = item;
                const { nome: nomeCliente } = cliente != null ? cliente : "";
                var totalTempoServico = 0;
                var nomesServicos = "";

                if(cliente !== null){
                  totalTempoServico = servicos.reduce((total, servico) => total + servico.tempoServico, 0);
                  nomesServicos = servicos.map(servico => servico.nomeServico).join(', ');
                  return {
                    title: `${nomesServicos} - ${nomeCliente}`,
                    start: moment(dataHoraAgendamentoInicio).toDate(),
                    end: moment(dataHoraAgendamentoInicio).add(totalTempoServico, 'minutes').toDate()
                  };
                }
                else{
                  const inicio = new Date(dataHoraAgendamentoInicio);
                  const fim = new Date(dataHoraAgendamentoFim);

                  // Calcular a diferença em milissegundos
                  const diferencaEmMilissegundos = fim - inicio;

                  // Converter a diferença de milissegundos para minutos
                  const diferencaEmMinutos = Math.floor(diferencaEmMilissegundos / (1000 * 60));
                  return {
                    title: `Você bloqueou esse horário!`,
                    start: moment(dataHoraAgendamentoInicio).toDate(),
                    end: moment(dataHoraAgendamentoInicio).add(diferencaEmMinutos, 'minutes').toDate()
                  };
                }
            
                
              });
              setEvents(eventData);
            } else {
              console.error("A resposta da API está vazia");
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles['calendar-container']}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={messages}
        formats={formats}
        min={new Date(2024, 4, 23, 6, 0)} // Hora mínima às 6:00
        max={new Date(2024, 4, 23, 20, 0)} // Hora máxima às 20:00
      />
    </div>
  );
};

export default AgendBarb;
