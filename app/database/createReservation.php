<?php
    require 'config.php';

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    
    // Data
    $sortname = $request->res_sort_name;
    $name = $request->res_name;
    $date = $request->res_date;
    $starttime = $request->res_start_time;
    $endtime = $request->res_end_time;
    $phone = $request->res_phone;
    $email = $request->res_email;
    $numplayers = $request->res_num_players;
    $court = $request->num_players;
    $playertype = $request->res_player_type;
    $createdby = $request->res_created_by;
    $created = $request->res_created;
    
    $database->query("INSERT INTO reservations (
        res_sortname, res_name, res_date, res_start_time, 
        res_end_time, res_phone, res_email, res_num_players, 
        res_court, res_player_type, res_created_by, res_created) 
        VALUES (':sortname', ':name', ':date', ':starttime', 
        ':endtime', ':phone', ':email', ':numplayers', ':court', 
        ':playertype', ':createdby', ':created')"
    );

    // Bind data
    $database->bind(':sortname', $sortname);
    $database->bind(':name', $name);
    $database->bind(':date', $date);
    $database->bind(':starttime', $starttime);
    $database->bind(':endtime', $endtime);
    $database->bind(':phone', $phone);
    $database->bind(':email', $email);
    $database->bind(':numplayers', $numplayers);
    $database->bind(':court', $court);
    $database->bind(':playertype', $playertype);
    $database->bind(':createdby', $createdby);
    $database->bind(':created', $created);

    $database->execute();
    $result = $database->lastInsertId();

    echo json_encode($result);

?>