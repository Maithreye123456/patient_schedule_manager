<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "food";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Database connection failed"]));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mealType = $_POST["mealType"] ?? "";
    $mealName = $_POST["mealName"] ?? "";
    $mealTime = $_POST["mealTime"] ?? "";

    if (empty($mealType) || empty($mealName) || empty($mealTime)) {
        echo json_encode(["success" => false, "error" => "All fields are required"]);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO meal_reminders (meal_type, meal_name, meal_time) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $mealType, $mealName, $mealTime);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Meal reminder saved successfully"]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to save reminder"]);
    }
    $stmt->close();
}
$conn->close();
?>
