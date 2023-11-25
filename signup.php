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
    $userId = $conn->real_escape_string($_POST['userId']);

    // 아이디 중복 확인
    $checkQuery = "SELECT ID FROM userdata WHERE ID = '$userId'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult->num_rows > 0) {
        echo "exists";
    } else {
        // 입력받은 ID가 중복이 아닌 경우, 새로운 레코드 추가
        $password = $conn->real_escape_string($_POST['password']);
        
        $insertQuery = "INSERT INTO userdata (ID, Password) VALUES ('$userId', '$password')";
        if ($conn->query($insertQuery) === TRUE) {
            echo "not_exists_and_inserted";
        } else {
            echo "Error: " . $insertQuery . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>
