<?php

    require 'config.php';
    $database->query('SELECT * FROM reservations');
    $rows = $database->resultSet();
    echo json_encode($rows);

?>