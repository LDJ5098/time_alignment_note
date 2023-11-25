<?php
// 데이터베이스 연결 설정
$servername = "localhost"; // 또는 '119.200.201.60'
$username = "timememo_user";
$password = "5097";
$dbname = "timememoDB";

// POST 요청으로 전송된 데이터 가져오기
$ID = $_POST['ID'];
$mainlist = $_POST['mainlist'];

// 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("데이터베이스 연결 실패: " . $conn->connect_error);
}

// 데이터베이스에 데이터 삽입
$sql = "INSERT INTO user_timememo (ID, mainlist) VALUES ('$ID', '" . json_encode($mainlist) . "')";
if ($conn->query($sql) === TRUE) {
    echo "데이터베이스에 데이터 삽입 성공";
} else {
    echo "데이터베이스에 데이터 삽입 실패: " . $conn->error;
}

// 데이터베이스 연결 종료
$conn->close();
?>
