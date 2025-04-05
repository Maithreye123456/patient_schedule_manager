// app.js
document.getElementById('pill-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const pillName = document.getElementById('pill-name').value;
    const pillTime = document.getElementById('pill-time').value;
    const pillFrequency = document.getElementById('pill-frequency').value;
    const pillImage = document.getElementById('pill-image').files[0];
    const pillAlarm = document.getElementById('pill-alarm').checked;

    if (pillName && pillTime && pillFrequency && pillImage) {
        const reader = new FileReader();
        reader.onload = function(e) {
            addPill(pillName, pillTime, pillFrequency, e.target.result, pillAlarm);
        };
        reader.readAsDataURL(pillImage);
        this.reset();
    }
});

function addPill(name, time, frequency, image, alarm) {
    const pillList = document.getElementById('pill-list');

    const listItem = document.createElement('li');
    listItem.className = 'pill-item animated-item';
    listItem.innerHTML = `
        <div class="pill-info">
            <img src="${image}" alt="Pill Image" class="pill-image">
            <div>
                <strong>${name}</strong><br>
                <span class="pill-time">⏰ Time: ${time}</span><br>
                <span class="pill-frequency">🔁 Frequency: ${frequency}</span>
                <br><span class="pill-alarm">🔔 Alarm: ${alarm ? 'On' : 'Off'}</span>
            </div>
        </div>
        <button class="delete-btn">Delete</button>
    `;

    listItem.querySelector('.delete-btn').addEventListener('click', function() {
        listItem.classList.add('fade-out');
        setTimeout(() => listItem.remove(), 500);
    });

    pillList.appendChild(listItem);
    if (alarm) {
        setAlarm(name, time);
    }
}

function setAlarm(name, time) {
    const alarmTime = new Date();
    const [hour, minute] = time.split(":");
    alarmTime.setHours(hour, minute, 0);

    const now = new Date();
    const timeToAlarm = alarmTime.getTime() - now.getTime();

    if (timeToAlarm >= 0) {
        setTimeout(() => {
            const audio = new Audio('alarm.mp3');
            audio.play();
            alert(`⏰ Time to take your pill: ${name}`);
        }, timeToAlarm);
    }
}
