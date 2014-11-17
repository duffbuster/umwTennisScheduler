<?php
$username = "mackeyde_devteam";
$password = "3devTeam!";
$hostname = "localhost";
$database = "mackeyde_angularScheduler"

// connection
$dbhandle = mysql_connect($hostname, $username, $password)
    or die("Unable to connect to MySQL");
echo "Connected to MySQL<br>";

$selected = mysql_select_db($database, $dbhandle)
    or die("Could not select database");

$result = mysql_query("SELECT * FROM events");

?>