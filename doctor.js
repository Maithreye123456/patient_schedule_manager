// Handle Form Submission (Add or Update)
document.getElementById("doctorForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);
    let doctorId = document.getElementById("doctorId").value;
    let action = doctorId ? "update" : "add";

    formData.append("action", action);

    fetch("doctor.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(`${action === "add" ? "Doctor added" : "Doctor updated"} successfully.`);
            clearForm();
            fetchDoctors();
        } else {
            alert(`Error: ${data.message}`);
        }
    })
    .catch(error => console.error("Error:", error));
});

// Fetch and Display Doctors
function fetchDoctors() {
    fetch("doctor.php?action=fetch")
    .then(response => response.json())
    .then(doctors => {
        let doctorList = document.getElementById("doctorList");
        doctorList.innerHTML = "<h2>Doctor Profiles</h2>";

        doctors.forEach(doctor => {
            let doctorCard = document.createElement("div");
            doctorCard.classList.add("doctor-card");

            let img = document.createElement("img");
            img.src = doctor.profile_pic ? `uploads/${doctor.profile_pic}?t=${Date.now()}` : "default-profile.png";
            img.alt = "Doctor Profile Picture";

            let doctorInfo = document.createElement("div");
            doctorInfo.innerHTML = `
                <h3>${doctor.name}</h3>
                <p><strong>Specialization:</strong> ${doctor.specialization}</p>
                <p><strong>Experience:</strong> ${doctor.experience} years</p>
                <p><strong>Doctor Number:</strong> ${doctor.doctor_number}</p>
                <p><strong>Email:</strong> ${doctor.email}</p>
                <p><strong>Duty Time:</strong> ${doctor.duty_time}</p>
            `;

            let updateBtn = document.createElement("button");
            updateBtn.textContent = "Update Profile";
            updateBtn.onclick = function() {
                populateFormForUpdate(doctor);
            };

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete Profile";
            deleteBtn.style.backgroundColor = "red";
            deleteBtn.onclick = function() {
                deleteDoctor(doctor.id);
            };

            doctorCard.appendChild(img);
            doctorCard.appendChild(doctorInfo);
            doctorCard.appendChild(updateBtn);
            doctorCard.appendChild(deleteBtn);
            doctorList.appendChild(doctorCard);
        });
    })
    .catch(error => console.error("Error fetching doctors:", error));
}

// Populate Form with Doctor Details for Update
function populateFormForUpdate(doctor) {
    document.getElementById("doctorId").value = doctor.id;
    document.getElementById("doctorName").value = doctor.name;
    document.getElementById("specialization").value = doctor.specialization;
    document.getElementById("experience").value = doctor.experience;
    document.getElementById("doctorNumber").value = doctor.doctor_number;
    document.getElementById("email").value = doctor.email;
    document.getElementById("dutyTime").value = doctor.duty_time;

    document.getElementById("submitBtn").textContent = "Update Doctor";
}

// Clear Form After Submission
function clearForm() {
    document.getElementById("doctorForm").reset();
    document.getElementById("submitBtn").textContent = "Add Doctor";
    document.getElementById("doctorId").value = "";
}
