<?php
    $username = "mackeyde_devteam";
    $password = "3devTeam!";
    $hostname = "localhost";
    $database = "mackeyde_angularScheduler"

    try {
        $conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password, array(PDO::ATTR_PERSISTENT => true));
        echo "Connected successfully";
    } catch(PDOException $e) {
        echo $e->getMessage();
    }
?>