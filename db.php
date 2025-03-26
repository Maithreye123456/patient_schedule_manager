<?php
$servername = "localhost";
$username = "root"; // Change if needed
$password = ""; // Change if needed
$database = "user_auth";

// Create a database connection
$conn = new mysqli($servername, $username, $password, $database);

// Set character set to UTF-8
$conn->set_charset("utf8");

// Check connection
if ($conn->connect_error) {
    die("Database connection failed. Please try again later.");
}

// Debugging (Remove in production)
if (!$conn) {
    error_log("Database connection error: " . mysqli_connect_error());
}
?>
