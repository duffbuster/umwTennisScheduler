<?php
    require 'config.php'; // database connection script
    
    $database->query('SELECT * FROM events');
    $rows = $database->resultSet();
    echo json_encode($rows);
?>