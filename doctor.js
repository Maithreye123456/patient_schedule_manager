document.getElementById("doctorForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);
    formData.append("action", "add");

    fetch("doctor.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchDoctors();
        this.reset();
    })
    .catch(error => console.error("Error:", error));
});

function fetchDoctors() {
    fetch("doctor.php")
    .then(response => response.json())
    .then(doctors => {
        let doctorList = document.getElementById("doctorList");
        doctorList.innerHTML = "<h2>Doctor Profiles</h2>";

        doctors.forEach(doctor => {
            let doctorCard = document.createElement("div");
            doctorCard.classList.add("doctor-card");

            let img = document.createElement("img");
            img.src = doctor.profile_pic ? doctor.profile_pic : "default-profile.png";

            let doctorInfo = document.createElement("div");
            doctorInfo.innerHTML = `
                <h3>${doctor.name}</h3>
                <p><strong>Specialization:</strong> ${doctor.specialization}</p>
                <p><strong>Experience:</strong> ${doctor.experience} years</p>
                <p><strong>Doctor Number:</strong> ${doctor.doctor_number}</p>
                <p><strong>Email:</strong> ${doctor.email}</p>
                <p><strong>Duty Time:</strong> ${doctor.duty_time}</p>
            `;

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete Profile";
            deleteBtn.style.backgroundColor = "red";
            deleteBtn.onclick = function() {
                deleteDoctor(doctor.id);
            };

            doctorCard.appendChild(img);
            doctorCard.appendChild(doctorInfo);
            doctorCard.appendChild(deleteBtn);
            doctorList.appendChild(doctorCard);
        });
    })
    .catch(error => console.error("Error fetching doctors:", error));
}

function deleteDoctor(id) {
    let formData = new FormData();
    formData.append("action", "delete");
    formData.append("id", id);

    fetch("doctor.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        fetchDoctors();
    })
    .catch(error => console.error("Error deleting doctor:", error));
}

fetchDoctors();
