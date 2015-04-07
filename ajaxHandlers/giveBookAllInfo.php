<?php

include_once '../WorkWithDb.class.php';
include_once '../DataToIdMapConverter.class.php';
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) 
        && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $bookId = $_GET['id'];
    $workWithDb = WorkWithDb::getInstance();
    $booksAllInfo = $workWithDb->giveBookAllInfo($bookId);
    $conwersion = new conversion();
    $booksAllInfo = $conwersion->conversionBookAllInfo($booksAllInfo);
    $booksAllInfo = json_encode($booksAllInfo);
    echo $booksAllInfo;
}