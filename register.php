<?php
include 'db.php'; // Ensure this file has a correct connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    // Validate empty fields
    if (empty($username) || empty($email) || empty($password)) {
        echo "All fields are required!";
        exit();
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Check if username/email already exists
    $stmt = $conn->prepare("SELECT id FROM `use` WHERE username = ? OR email = ?");
    if (!$stmt) {
        die("Error preparing statement: " . $conn->error);
    }

    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Username or Email already exists!";
    } else {
        // Insert user into the database
        $stmt = $conn->prepare("INSERT INTO `use` (username, password, email) VALUES (?, ?, ?)");
        if (!$stmt) {
            die("Error preparing insert: " . $conn->error);
        }

        $stmt->bind_param("sss", $username, $hashedPassword, $email);

        if ($stmt->execute()) {
            echo "Registration successful! <a href='login.html'>Login Here</a>";
        } else {
            echo "Error inserting record: " . $conn->error;
        }
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}
?>
