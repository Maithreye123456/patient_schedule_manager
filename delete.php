<?php
header("Content-Type: application/json");

$connection = new mysqli("localhost", "root", "", "hospital");

if ($connection->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $connection->connect_error]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id"])) {
    $id = intval($_POST["id"]);

    // Debugging Log
    error_log("Delete request received for ID: $id");

    // Execute the delete query
    $query = "DELETE FROM doctors WHERE id = $id";
    
    if ($connection->query($query) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Doctor with ID $id deleted successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error deleting doctor: " . $connection->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}

$connection->close();
?>
