<?php
$conn = new mysqli("localhost", "root", "", "report");
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Database connection failed: " . $conn->connect_error]));
}

// Fetch data from correct table
$sql = "SELECT * FROM rep ORDER BY uploaded_at DESC";
$result = $conn->query($sql);
$reports = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $reports[] = [
            "id" => $row["id"],
            "file_name" => $row["file_name"],
            "file_path" => $row["file_path"]
        ];
    }
}

header("Content-Type: application/json");
echo json_encode($reports);
$conn->close();
?>
