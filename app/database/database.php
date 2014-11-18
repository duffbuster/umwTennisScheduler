<?php
    class Database {
        private $host = DB_HOST;
        private $user = DB_USER;
        private $pass = DB_PASS;
        private $dbname = DB_NAME;
        
        private $dbh;
        private $error;
        private $stmt;
        
        public function __construct() {
            // Set DSN
            $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbname;
            // Set Options
            $options = array(
                PDO::ATTR_PERSISTENT => true,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            );
            // Create a new PDO instance
            try {
                $this->dbh = new PDO($dsn, $this->user, $this->pass, $options);
            } catch(PDOException $e) {
                $this->error = $e->getMessage();
            }
        }
        
        public function query($query) {
            $this->stmt = $this->dbh->prepare($query);
        }
        
        public function bind($param, $value, $type = null) {
            if (is_null($type)) {
                switch(true) {
                    case is_int($value):
                        $type = PDO::PARAM_INT;
                        break;
                    case is_bool($value):
                        $type = PDO::PARAM_BOOL;
                        break;
                    case is_null:
                        $type = PDO::PARAM_NULL;
                        break;
                    default:
                        $type = PDO::PARAM_STR;
                }
            }
            $this->stmt->bindValue($param, $value, $type);
        }
        
        /* Method Wrappers */
        
        // executes the prepared statement
        public function execute() {
            return $this->stmt->execute();
        }
        // returns an array of the result set rows
        public function resultSet() {
            $this->execute();
            return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        // returns a single record
        public function single() {
            $this->execute();
            return $this->stmt->fetch(PDO::FETCH_ASSOC);
        }
        // returns number of effected rows from previous delete, update, or insert
        public function rowCount() {
            return $this->stmt->rowCount();
        }
        // retruns the last inserted id as a string
        public function lastInsertId() {
            return $this->dbh->lastInsertId();
        }
        // begin a transaction
        public function beginTransaction() {
            return $this->dbh->beginTransaction();
        }
        // end transaction and commit changes
        public function endTransaction() {
            return $this->dbh->commit();
        }
        // cancel a transaction and rollback changes
        public function cancelTransaction() {
            return $this->dbh->rollBack();
        }
        // dumps info that was contained in prepared statement
        public function debugDumpParams() {
            return $this->stmt->debugDumpParams();
        }
    }
?>