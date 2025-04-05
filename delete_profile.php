<?php
include 'db_connect.php';

// Verify connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if there are records
$checkSql = "SELECT id FROM patient ORDER BY id DESC LIMIT 1";
$result = $conn->query($checkSql);

if ($result && $result->num_rows > 0) {
    $latest = $result->fetch_assoc();
    $id = $latest['id'];

    // Delete the latest patient record
    $deleteSql = "DELETE FROM patient WHERE id = $id";
    
    if ($conn->query($deleteSql) === TRUE) {
        echo "Patient profile with ID $id deleted successfully";
    } else {
        echo "Error: " . $conn->error;
    }
} else {
    echo "No patient records found to delete.";
}

$conn->close();
?>
