<?php
include 'db_connect.php';

// Fetch the latest patient record
$sql = "SELECT * FROM patient ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode([
        "name" => "Patient Name",
        "phone" => "Phone",
        "email" => "Email",
        "blood_group" => "Blood Group",
        "profile_pic" => "https://via.placeholder.com/100"
    ]);
}

$conn->close();
?>
