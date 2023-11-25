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

$sql = "SELECT mainlist FROM user_timememo WHERE ID = '$ID'";
$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $mainlist = json_decode($row['mainlist']);
        echo json_encode($mainlist);
    } else {
        echo "해당 ID에 대한 데이터가 없습니다.";
    }
} else {
    echo "쿼리 실행 에러: " . $conn->error;
    error_log("SQL 에러: " . $conn->error);
}

$conn->close();
?>
