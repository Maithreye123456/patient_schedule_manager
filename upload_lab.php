<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection
$conn = new mysqli("localhost", "root", "", "report");
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Database connection failed: " . $conn->connect_error]));
}

// Check file upload
if (isset($_FILES['reportFile']) && $_FILES['reportFile']['error'] === UPLOAD_ERR_OK) {
    $targetDir = "uploads/";
    if (!is_dir($targetDir)) mkdir($targetDir, 0777, true);

    $fileName = basename($_FILES["reportFile"]["name"]);
    $uniqueName = time() . "_" . uniqid() . "_" . $fileName;
    $targetFilePath = $targetDir . $uniqueName;

    if (move_uploaded_file($_FILES["reportFile"]["tmp_name"], $targetFilePath)) {
        $stmt = $conn->prepare("INSERT INTO rep (file_name, file_path, uploaded_at) VALUES (?, ?, NOW())");
        $stmt->bind_param("ss", $fileName, $targetFilePath);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => $stmt->error]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "error" => "File upload failed"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "No file uploaded or upload error"]);
}

$conn->close();
?>
