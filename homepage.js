function fetchPatientInfo() {
    fetch('fetch_profile.php')
    .then(response => response.json())
    .then(data => {
        if (data && data.name) {
            document.getElementById("sidebar-patient-name").innerText = "👤 " + data.name;
            document.getElementById("sidebar-phone").innerText = "📞 " + data.phone;
            document.getElementById("sidebar-email").innerText = "✉️ " + data.email;
            document.getElementById("sidebar-blood-group").innerText = "🩸 " + data.blood_group;

            // Force cache bypass by appending timestamp
            const profilePic = data.profile_pic ? `${data.profile_pic}?t=${new Date().getTime()}` : "https://via.placeholder.com/100";
            document.getElementById("sidebar-profile-pic").src = profilePic;

            // Update Dashboard
            document.getElementById("dashboard-name").innerText = data.name;
            document.getElementById("dashboard-blood-group").innerText = data.blood_group;
        } else {
            console.warn("No patient data available.");
        }
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Ensure homepage updates when profile is updated
if (localStorage.getItem("profileUpdated") === "true") {
    fetchPatientInfo();
    localStorage.removeItem("profileUpdated");
}

// Fetch patient info when homepage loads
window.onload = fetchPatientInfo;
