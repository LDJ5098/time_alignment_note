<?php
// 데이터베이스 연결 설정
$servername = "localhost"; // 또는 '119.200.201.60'
$username = "timememo_user";
$password = "5097";
$dbname = "timememoDB";

// POST 요청으로 전송된 데이터 가져오기
$ID = $_POST['ID'];

// 데이터베이스 연결
$conn = new mysqli($servername, $username, $password, $dbname);

// 연결 확인
if ($conn->connect_error) {
    die("데이터베이스 연결 실패: " . $conn->connect_error);
}

// 입력받은 ID와 일치하는 레코드의 mainlist 값을 가져오기
$sql = "SELECT mainlist FROM user_timememo WHERE ID = '$ID'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // 결과에서 데이터 추출
    $row = $result->fetch_assoc();
    $mainlist = json_decode($row['mainlist']);
    echo json_encode($mainlist);
} else {
    echo "해당 ID에 대한 데이터가 없습니다.";
}

// 데이터베이스 연결 종료
$conn->close();
?>
