<?php

include_once '../WorkWithDb.class.php';
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) 
        && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $dataJson = file_get_contents('php://input');
    $bookId = json_decode($dataJson);
    $workWithDb = WorkWithDb::getInstance();
    $workWithDb->deleteBook($bookId);
}