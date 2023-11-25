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

// 기존 레코드 확인
$check_sql = "SELECT * FROM user_timememo WHERE ID = '$ID'";
$result = $conn->query($check_sql);

if ($result->num_rows > 0) {
    // 이미 존재하는 레코드가 있으면 업데이트
    $update_sql = "UPDATE user_timememo SET mainlist = '$mainlist' WHERE ID = '$ID'";
    if ($conn->query($update_sql) === TRUE) {
        echo "데이터베이스 업데이트 성공";
    } else {
        echo "데이터베이스 업데이트 실패: " . $conn->error;
        error_log("SQL 에러: " . $conn->error);
    }
} else {
    // 존재하지 않으면 새로운 레코드 삽입
    $insert_sql = "INSERT INTO user_timememo (ID, mainlist) VALUES ('$ID', '$mainlist')";
    if ($conn->query($insert_sql) === TRUE) {
        echo "데이터베이스에 데이터 삽입 성공";
    } else {
        echo "데이터베이스에 데이터 삽입 실패: " . $conn->error;
        error_log("SQL 에러: " . $conn->error);
    }
}

$conn->close();
?>
