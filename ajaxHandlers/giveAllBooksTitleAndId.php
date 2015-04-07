<?php

include_once '../WorkWithDb.class.php';
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) 
        && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $workWithDb = WorkWithDb::getInstance();
    $booksAllInfo = $workWithDb->giveAllBooksAllInfo();
    $booksAllInfo = json_encode($booksAllInfo);
    echo $booksAllInfo;
}