document.addEventListener("DOMContentLoaded", function () {
    loadReports();
});

function uploadReport() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a report to upload.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const reportData = {
            name: file.name,
            url: e.target.result,
            type: file.type
        };
        saveReport(reportData);
    };
    reader.readAsDataURL(file);
}

function saveReport(report) {
    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.push(report);
    localStorage.setItem("reports", JSON.stringify(reports));
    displayReports();
}

function displayReports() {
    const reportContainer = document.getElementById("reportContainer");
    reportContainer.innerHTML = "";

    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.forEach((report, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("report-card");

        // Show PDF or Image Preview
        let previewElement;
        if (report.type.includes("image")) {
            previewElement = `<img src="${report.url}" alt="Report Preview">`;
        } else {
            previewElement = `<img src="pdf-icon.png" alt="PDF Icon">`;
        }

        listItem.innerHTML = `
            ${previewElement}
            <a href="${report.url}" target="_blank">${report.name}</a>
            <button onclick="deleteReport(${index})">Delete</button>
        `;

        reportContainer.appendChild(listItem);
    });
}

function deleteReport(index) {
    let reports = JSON.parse(localStorage.getItem("reports")) || [];
    reports.splice(index, 1);
    localStorage.setItem("reports", JSON.stringify(reports));
    displayReports();
}

function loadReports() {
    displayReports();
}
