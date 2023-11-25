<?php
$servername = "localhost";
$username = "timememo_user";
$password = "5097";
$dbname = "timememoDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("데이터베이스 연결 실패: " . $conn->connect_error);
}

$ID = $conn->real_escape_string($_POST['ID']);
$mainlist = $conn->real_escape_string($_POST['mainlist']);

$sql = "INSERT INTO user_timememo (ID, mainlist) VALUES ('$ID', '$mainlist')";

if ($conn->query($sql) === TRUE) {
    echo "데이터베이스에 데이터 삽입 성공";
} else {
    echo "데이터베이스에 데이터 삽입 실패: " . $conn->error;
    error_log("SQL 에러: " . $conn->error);
}

$conn->close();
?>
