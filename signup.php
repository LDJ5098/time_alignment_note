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
    $userPassword = $conn->real_escape_string($_POST['password']);
    $confirmPassword = $conn->real_escape_string($_POST['confirmPassword']);

    // 입력값이 비어있는지 확인
    if (empty($userId) || empty($userPassword) || empty($confirmPassword)) {
        echo "모든 필드를 입력해야 합니다";
    } else {
        // 비밀번호와 비밀번호 확인 일치 여부 확인
        if ($userPassword !== $confirmPassword) {
            echo "비밀번호가 일치하지 않습니다";
        } else {
            // 아이디 중복 확인 및 회원가입 데이터 서버에 전송
            $checkQuery = "SELECT ID FROM userdata WHERE ID = '$userId'";
            $checkResult = $conn->query($checkQuery);

            if ($checkResult->num_rows > 0) {
                echo "exists";
            } else {
                // 입력받은 ID가 중복이 아닌 경우, 새로운 레코드 추가
                $insertQuery = "INSERT INTO userdata (ID, Password) VALUES ('$userId', '$userPassword')";
                if ($conn->query($insertQuery) === TRUE) {
                    echo "not_exists_and_inserted";
                } else {
                    echo "Error: " . $insertQuery . "<br>" . $conn->error;
                }
            }
        }
    }
}

$conn->close();

?>
