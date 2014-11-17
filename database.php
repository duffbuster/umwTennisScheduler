<?php
$username = "mackeyde_devteam";
$password = "3devTeam!";
$hostname = "localhost";

// connection
$dbhandle = mysql_connect($hostname, $username, $password)
    or die("Unable to connect to MySQL");
echo "Connected to MySQL<br>";
?>