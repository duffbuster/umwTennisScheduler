<?php
    require '../app/database/config.php'; // database connection script
    
    try {
        $stmt = $conn->prepare("SELECT * FROM events");
        $stmt->execute;

        // set array to associative
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        echo json_encode($result);
    }
    catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
?>