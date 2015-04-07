<?php

class connectToDb {

    public $db;

    public function __construct() {
        try {
            $this->db = new PDO('mysql:host=localhost; dbname=bookcatalog', 'root', '1234');
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

    private function __clone() {
        
    }

    function __destruct() {
        
    }

}

?>