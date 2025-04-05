
<?php
$servername = "localhost"; // Change if using a different host
$username = "root"; // Change to your database username
$password = ""; // Change to your database password
$database = "profile"; // Replace with your actual database name

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
