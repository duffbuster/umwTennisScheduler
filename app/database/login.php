<?php
    require 'config.php'; // database connection script

    if (isset($_POST['credentials'])) {
        $username = $_POST['username'];
        $password = $_POST['password'];
        
        // Protect from SQL injection
        $username = stripslashes($username);
        $password = stripslashes($password);
        $username = mysql_real_escape_string($username);
        $password = mysql_real_escape_string($password);
        
        $database->query("SELECT * FROM users WHERE username='" + $username + "' AND password=password('" + $password + "')");
        $row = $database->single();
        echo json_encode("testing, testing 123");
    }
?>