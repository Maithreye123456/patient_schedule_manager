

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

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
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
        title: `${patientName} - ${eventType}`,
        start: eventDate,
        allDay: false,
        backgroundColor: getColor(eventType)
    };
    
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    sendNotification(newEvent.title, eventDate);
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

    events.forEach((event, index) => {
        let div = document.createElement('div');
        div.innerHTML = `
            <strong>${event.title}</strong> - ${new Date(event.start).toLocaleString()}
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        div.style.marginBottom = '10px';
        div.querySelector('button').style.marginLeft = '10px';
        eventList.appendChild(div);
    });
}

function deleteEvent(index) {
    if (confirm('Are you sure you want to delete this schedule?')) {
        let events = JSON.parse(localStorage.getItem('events')) || [];
        events.splice(index, 1);
        localStorage.setItem('events', JSON.stringify(events));
        location.reload();
    }
}

function sendNotification(title, date) {
    let audio = new Audio('notificatio.mp3');
    if (Notification.permission === "granted") {
        new Notification("New Schedule Added", {
            body: `${title} on ${new Date(date).toLocaleString()}`,
            icon: "https://cdn-icons-png.flaticon.com/512/148/148767.png"
        });
        audio.play().catch(error => console.log('Audio play failed:', error));
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("New Schedule Added", {
                    body: `${title} on ${new Date(date).toLocaleString()}`,
                    icon: "https://cdn-icons-png.flaticon.com/512/148/148767.png"
                });
                audio.play().catch(error => console.log('Audio play failed:', error));
            }
        });
    }
}
