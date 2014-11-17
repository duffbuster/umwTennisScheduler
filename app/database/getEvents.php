<?php
    require 'config.php'; // database connection script
    
    function getStmt() {
        static $stmt = null;
        if (is_null($stmt)) {
            $stmt = $conn->prepare("SELECT * FROM events");
        }
        return $stmt;
    }

    $stmt = getStmt();
    try {
        $stmt->execute;
        // set array to associative
        $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch(PDOException $e) {
        echo "Error: " . $e->getMessage();
    }     
?>