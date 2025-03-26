document.addEventListener("DOMContentLoaded", function () {
    loadReports();

    document.getElementById("uploadForm").addEventListener("submit", function (event) {
        event.preventDefault();
        let formData = new FormData(this);

        fetch("upload_lab.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadReports();
                alert("Report uploaded successfully!");
                document.getElementById("uploadForm").reset();
            } else {
                alert("Upload failed: " + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
});

function loadReports() {
    fetch("fetch_reports.php?timestamp=" + new Date().getTime())
    .then(response => response.json())
    .then(data => {
        let reportList = document.getElementById("reportList");
        reportList.innerHTML = "";

        if (data.length === 0) {
            reportList.innerHTML = "<p>No reports found.</p>";
            return;
        }

        data.forEach(report => {
            let div = document.createElement("div");
            div.classList.add("report-item");
            div.innerHTML = `
                <a href="${report.file_path}" target="_blank">${report.file_name}</a>
                <button class="delete-btn" onclick="deleteReport(${report.id})">Delete</button>
            `;
            reportList.appendChild(div);
        });
    })
    .catch(error => console.error('Error:', error));
}

function deleteReport(reportId) {
    if (confirm("Are you sure you want to delete this report?")) {
        fetch(`delete_report.php?id=${reportId}&timestamp=${new Date().getTime()}`, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loadReports();
                alert("Report deleted successfully!");
            } else {
                alert("Deletion failed: " + data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }
}
