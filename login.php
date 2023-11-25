<?php
$servername = "localhost";
$username = "timememo_user";
$password = "5097";
$dbname = "timememoDB";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("데이터베이스 연결 실패: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userId = $conn->real_escape_string($_POST['userName']);
    $userPassword = $conn->real_escape_string($_POST['userPassword']);

    // 입력값이 비어있는지 확인
    if (empty($userId) || empty($userPassword)) {
        echo "아이디와 비밀번호를 모두 입력해야 합니다";
    } else {
        // 아이디와 비밀번호 일치 여부 확인
        $checkQuery = "SELECT ID, Password FROM userdata WHERE ID = '$userId' AND Password = '$userPassword'";
        $checkResult = $conn->query($checkQuery);

        if ($checkResult->num_rows > 0) {
            echo "exists";
        } else {
            echo "로그인 실패: 아이디 또는 비밀번호가 일치하지 않습니다";
        }
    }
}

$conn->close();
?>
