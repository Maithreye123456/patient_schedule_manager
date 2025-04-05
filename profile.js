// Function to save form data
function saveInfo() {
    let formData = new FormData(document.getElementById("patient-form"));

    fetch('save_patient.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        updateSidebar();
        localStorage.setItem("profileUpdated", "true"); // Flag for homepage update
    })
    .catch(error => console.error('Error:', error));
}

// Function to update the sidebar dynamically
function updateSidebar() {
    // Update Name
    document.getElementById("sidebar-patient-name").innerText = 
        document.getElementById("patient-name").value || "Patient Name";

    // Update Phone
    document.getElementById("sidebar-phone").innerText = 
        "📞 " + (document.getElementById("phone").value || "Phone");

    // Update Email
    document.getElementById("sidebar-email").innerText = 
        "✉️ " + (document.getElementById("email").value || "Email");

    // Update Blood Group
    const bloodGroup = document.getElementById("blood-group").value;
    document.getElementById("sidebar-blood-group").innerText = 
        "🩸 " + (bloodGroup || "Blood Group");
}

// Function to update the profile picture
function updateProfilePic(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("display-profile-pic").src = e.target.result;
            document.getElementById("sidebar-profile-pic").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Function to fetch patient information
function fetchPatientInfo() {
    fetch('fetch_profile.php')
    .then(response => response.json())
    .then(data => {
        document.getElementById("sidebar-patient-name").innerText = data.name || "Patient Name";
        document.getElementById("sidebar-phone").innerText = "📞 " + (data.phone || "Phone");
        document.getElementById("sidebar-email").innerText = "✉️ " + (data.email || "Email");
        document.getElementById("sidebar-blood-group").innerText = "🩸 " + (data.blood_group || "Blood Group");
        document.getElementById("sidebar-profile-pic").src = data.profile_pic || "https://via.placeholder.com/100";
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Function to delete profile (if needed)
function deleteProfile() {
    if (confirm("Are you sure you want to delete this profile?")) {
        fetch('delete_profile.php', { method: 'POST' })
        .then(response => response.text())
        .then(data => {
            alert(data);
            window.location.reload(); // Reload after deletion
        })
        .catch(error => console.error('Error:', error));
    }
}

// Initialize the form with existing data
window.onload = function() {
    fetchPatientInfo(); // Load patient info on page load
};
