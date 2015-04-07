<?php

include_once '../WorkWithDb.class.php';
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) 
        && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

    $dataJson = file_get_contents('php://input');
    $dataObj = json_decode($dataJson);

    $title = $dataObj->title;
    $fullInfo = $dataObj->fullInformationAbouTheBook;
    $shortInfo = $dataObj->shortInformationAbouTheBook;
    $price = $dataObj->price;
    $bookId = $dataObj->id;
    $workWithDb = WorkWithDb::getInstance();
    $workWithDb->chengBookInfo($title, $price, $bookId, $fullInfo, $shortInfo);
}

