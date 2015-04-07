<?php

include_once '../WorkWithDb.class.php';
include_once '../DataToIdMapConverter.class.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $bookId = $_GET['id'];
    $workWithDb = WorkWithDb::getInstance();
    $bookFullInfo = $workWithDb->giveBookFullInfo($bookId);
    $conewrsion = new conversion();
    $bookFullInfo = $conewrsion->conversionBooksFullInfo($bookFullInfo);
    $bookFullInfo = json_encode($bookFullInfo);
    echo $bookFullInfo;
}

