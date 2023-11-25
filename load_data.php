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

    // 데이터베이스에서 데이터 불러오기
    $sql = "SELECT * FROM mainlist WHERE userID = '$userID'";
    $result = $conn->query($sql);

    $data = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row["memo"];
        }
        echo json_encode($data); // 데이터를 JSON 형식으로 반환
    } else {
        echo "No data found";
    }
}

$conn->close();
?>
