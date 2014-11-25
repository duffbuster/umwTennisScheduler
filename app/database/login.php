<?php
    require 'config.php'; // database connection script

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $username = $request->username;
    $password = $request->password;

    // Protect from SQL injection
    $username = stripslashes($username);
    $password = stripslashes($password);
    /*$username = mysql_real_escape_string($username);
    $password = mysql_real_escape_string($password);*/

    $database->query("SELECT * FROM users WHERE username=:username AND password=password(:password)");
    $database->bind(':username', $username);
    $database->bind(':password', $password);
    $row = $database->single();
    echo json_encode($row);
?>