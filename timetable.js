document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: JSON.parse(localStorage.getItem('events')) || [],
        eventClick: function(info) {
            alert('Event: ' + info.event.title + '\nDate: ' + info.event.start);
        },
        eventColor: '#3788d8'
    });
    calendar.render();
    
    updateEventList();
});

function openForm() {
    document.getElementById('scheduleForm').style.display = 'block';
}

function closeForm() {
    document.getElementById('scheduleForm').style.display = 'none';
}

function saveSchedule() {
    let patientName = document.getElementById('patientName').value;
    let eventDate = document.getElementById('eventDate').value;
    let eventType = document.getElementById('eventType').value;
    
    if (!patientName || !eventDate) {
        alert('Please enter all details');
        return;
    }
    
    let newEvent = {
        title: patientName + ' - ' + eventType,
        start: eventDate,
        allDay: false,
        backgroundColor: getColor(eventType)
    };
    
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    
    location.reload();
}

function getColor(eventType) {
    switch(eventType) {
        case 'Appointment': return '#3788d8';
        case 'Checkup': return '#28a745';
        case 'Operation': return '#dc3545';
        case 'Medication': return '#ffc107';
        default: return '#6c757d';
    }
}

function updateEventList() {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    let eventList = document.getElementById('eventList');
    eventList.innerHTML = '';
    
    events.forEach(event => {
        let div = document.createElement('div');
        div.innerHTML = `<strong>${event.title}</strong> - ${new Date(event.start).toLocaleString()}`;
        div.style.marginBottom = '10px';
        eventList.appendChild(div);
    });
}
