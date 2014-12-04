<?php
    require 'config.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    
    // Data
    $sortname = $request->event_sort_name;
    $name = $request->event_name;
    $startdate = $request->event_start_date;
    $enddate = $request->event_end_date;
    $starttime = $request->event_start_time;
    $endtime = $request->event_end_time;
    $allday = $request->event_all_day;
    $recurring = $request->event_recurring;
    $createdby = $request->event_created_by;
    $created = $request->event_created;
    
    $database->query("INSERT INTO events (
        event_sortname, event_name, event_start_date, event_end_date, event_start_time, 
        event_end_time, event_all_day, event_recurring, 
        event_created_by, event_created) 
        VALUES (':sortname', ':name', ':startdate', ':enddate', ':starttime', 
        ':endtime', ':allday', ':recurring', ':createdby', ':created')"
    );

    // Bind data
    $database->bind(':sortname', $sortname);
    $database->bind(':name', $name);
    $database->bind(':startdate', $startdate);
    $database->bind(':enddate', $enddate);
    $database->bind(':starttime', $starttime);
    $database->bind(':endtime', $endtime);
    $database->bind(':allday', $allday);
    $database->bind(':recurring', $recurring);
    $database->bind(':createdby', $createdby);
    $database->bind(':created', $created);

    $database->execute();
    $result = $database->lastInsertId();

    echo json_encode($result);

?>