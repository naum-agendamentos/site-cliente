import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './AgendBarb.module.css';
import axios from 'axios';

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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://662a666667df268010a3c38f.mockapi.io/barbearias/agendamento');
        const eventData = response.data.map(item => ({
          title: `${item.servico} - ${item.nome}`,
          start: moment(item.data, 'DD/MM/YYYY HH:mm').toDate(),
          end: moment(item.data, 'DD/MM/YYYY HH:mm').add(item.tempo, 'minutes').toDate(),
        }));
        setEvents(eventData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);

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
