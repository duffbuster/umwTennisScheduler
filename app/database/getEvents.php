<?php
    require 'config.php'; // database connection script
    
    try {
        global $stmt;
        $stmt = $conn->prepare("SELECT * FROM events");
        $stmt->execute;

        // set array to associative
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        echo json_encode($result);
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
?>