<?php
$servername = "119.200.201.60";
$username = "timememo_user";
$password = "5097";
$dbname = "timememoDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("데이터베이스 연결 실패: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = $conn->real_escape_string($_POST['userId']);

    // 아이디 중복 확인
    $checkQuery = "SELECT ID FROM userdata WHERE ID = '$userId'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult->num_rows > 0) {
        echo "exists";
    } else {
        echo "not_exists";
    }
}

$conn->close();
?>
