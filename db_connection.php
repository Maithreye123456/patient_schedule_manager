<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "medical_dashboard";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Database connected successfully!";
}


// Directory for profile pictures
$profile_pic_dir = "uploads/";
if (!is_dir($profile_pic_dir)) {
    mkdir($profile_pic_dir, 0777, true);
}

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

?>
