<?php
$servername = "localhost";
$username = "root"; // Change if needed
$password = "";
$dbname = "food";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $medicine = $_POST["medicine"];
    $dosage = $_POST["dosage"];
    $time = $_POST["time"];

    $stmt = $conn->prepare("INSERT INTO reminders (medicine_name, dosage, reminder_time) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $medicine, $dosage, $time);

    if ($stmt->execute()) {
        echo "Reminder added successfully";
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}
$conn->close();
?>
