<?php
    require 'config.php'; // database connection script

    if ($_GET['e']) {
        $database->query('SELECT * FROM events WHERE event_id=:id');
        $database->bind(':id', $_GET['e']);
        $res = $database->single();
        echo json_encode($res);
    }
    else {
        $database->query('SELECT * FROM events');
        $rows = $database->resultSet();
        echo json_encode($rows);
    }  
?>