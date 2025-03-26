<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "medical_dashboard";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action'])) {
    if ($_POST['action'] == "add") {
        $name = $_POST['doctorName'] ?? '';
        $specialization = $_POST['specialization'] ?? '';
        $experience = $_POST['experience'] ?? 0;
        $doctorNumber = $_POST['doctorNumber'] ?? '';
        $email = $_POST['email'] ?? '';
        $dutyTime = $_POST['dutyTime'] ?? '';

        if (empty($name) || empty($specialization) || empty($email)) {
            die("Required fields are missing.");
        }

        $target_dir = "uploads/";
        if (!file_exists($target_dir)) {
            mkdir($target_dir, 0777, true);
        }

        $profilePic = "";
        if (!empty($_FILES["profilePic"]["name"])) {
            $profilePic = $target_dir . basename($_FILES["profilePic"]["name"]);
            if (!move_uploaded_file($_FILES["profilePic"]["tmp_name"], $profilePic)) {
                die("Error uploading file.");
            }
        }

        $stmt = $conn->prepare("INSERT INTO doctor (name, specialization, experience, doctor_number, email, duty_time, profile_pic) 
                                VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssissss", $name, $specialization, $experience, $doctorNumber, $email, $dutyTime, $profilePic);

        if ($stmt->execute()) {
            echo "Doctor added successfully";
        } else {
            echo "Database Error: " . $stmt->error;
        }
        $stmt->close();
        exit;
    }

    if ($_POST['action'] == "delete" && isset($_POST['id'])) {
        $id = intval($_POST['id']);
        $stmt = $conn->prepare("DELETE FROM doctor WHERE id = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo "Doctor deleted successfully";
        } else {
            echo "Error deleting doctor: " . $stmt->error;
        }
        $stmt->close();
        exit;
    }
}

$result = $conn->query("SELECT * FROM doctor");
$doctors = [];
while ($row = $result->fetch_assoc()) {
    $doctors[] = $row;
}

header('Content-Type: application/json');
echo json_encode($doctors);
$conn->close();
?>
