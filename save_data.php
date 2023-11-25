<?php
$servername = "119.200.201.60";
$username = "timememo_user";
$password = "5097";
$database = "timememo_userdatabase";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userID = $_POST["userID"];
    $memo = $_POST["memo"];

    // 데이터베이스에 데이터 저장
    $sql = "INSERT INTO mainlist (userID, memo) VALUES ('$userID', '$memo')";

    if ($conn->query($sql) === TRUE) {
        echo "Data saved successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
