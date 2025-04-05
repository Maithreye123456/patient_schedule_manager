<?php
$conn = new mysqli("localhost", "root", "", "report");
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Database connection failed: " . $conn->connect_error]));
}

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $stmt = $conn->prepare("SELECT file_path FROM rep WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($file);
    $stmt->fetch();
    $stmt->close();

    if ($file && file_exists($file)) {
        if (unlink($file)) {
            $deleteStmt = $conn->prepare("DELETE FROM rep WHERE id = ?");
            $deleteStmt->bind_param("i", $id);
            $deleteStmt->execute();
            $deleteStmt->close();
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "File deletion failed"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "File not found"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "No report ID specified"]);
}

$conn->close();
?>
