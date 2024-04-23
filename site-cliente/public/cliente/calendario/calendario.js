calendario();


function calendario(){
  
  document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      locale: 'pt-br',

      navLinks: true, // can click day/week names to navigate views
      selectable: true,
      selectMirror: true,
      select: function(arg) {
        var title = prompt('Event Title:');
        if (title) {
          calendar.addEvent({
            title: title,
            start: arg.start,
            end: arg.end,
            allDay: arg.allDay
          })
        }
        calendar.unselect()
      },
      eventClick: function(arg) {
        if (confirm('Are you sure you want to delete this event?')) {
          arg.event.remove()
        }
      },
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: [
        {
          //groupId: 999,//movidos juntos
          title: 'Corte simples',
          start: dataAtual()+'T10:30:00',
          end: dataAtual()+'T11:30:00',
          url: './mural.html'
        },
        {
         // groupId: 999,
          title: 'Luzes',
          start: dataAtual()+'T11:30:00',
          end: dataAtual()+'T13:30:00',
          url: './mural.html'
        },
        {
         // groupId: 999,
          title: 'Blindado',
          start: '2024-04-19T10:00:00',
          end: '2024-04-19T15:00:00',
          url: './mural.html'
        }
      ]
    });
  
    calendar.render();
  });

}


function dataAtual(){
  const dataAtual = new Date();
  const ano = (dataAtual.getFullYear()).toString().padStart(4,"0");
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2,"0");
  const dia = (dataAtual.getDate()).toString().padStart(2,"0");

  return `${ano}-${mes}-${dia}`
}