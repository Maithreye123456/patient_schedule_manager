<?php
include 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $conn->real_escape_string($_POST['name']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $email = $conn->real_escape_string($_POST['email']);
    $blood_group = $conn->real_escape_string($_POST['blood_group']);

    // Default profile picture
    $profile_pic = "https://via.placeholder.com/100";
    if (!empty($_FILES['profile_pic']['name'])) {
        $target_dir = "uploads/";
        if (!is_dir($target_dir)) {
            mkdir($target_dir, 0777, true);
        }
        $target_file = $target_dir . basename($_FILES["profile_pic"]["name"]);
        if (move_uploaded_file($_FILES["profile_pic"]["tmp_name"], $target_file)) {
            $profile_pic = $target_file;
        }
    }

    // Insert or update patient record
    $sql = "INSERT INTO patient (name, phone, email, blood_group, profile_pic) 
            VALUES ('$name', '$phone', '$email', '$blood_group', '$profile_pic') 
            ON DUPLICATE KEY UPDATE 
            name='$name', phone='$phone', email='$email', blood_group='$blood_group', profile_pic='$profile_pic'";

    if ($conn->query($sql) === TRUE) {
        echo "Patient information updated successfully";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>
