<?php
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    include 'db.php'; // Database connection

    $username = htmlspecialchars(trim($_POST['username']));
    $password = $_POST['password'];

    if (empty($username) || empty($password)) {
        echo "<script>alert('Please fill all fields.'); window.location.href='login.php';</script>";
        exit();
    }

    // Use backticks to avoid conflict with reserved keyword
    $sql = "SELECT * FROM `use` WHERE username = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die("Error preparing statement: " . $conn->error);
    }

    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['username'] = $user['username'];
            header("Location: homepage.html");
            exit();
        } else {
            echo "<script>alert('Incorrect password!'); window.location.href='login.html';</script>";
        }
    } else {
        echo "<script>alert('No user found! Please register first.'); window.location.href='register.html';</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
