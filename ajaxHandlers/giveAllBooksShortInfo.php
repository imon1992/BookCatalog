<?php

include_once '../WorkWithDb.class.php';
include_once '../DataToIdMapConverter.class.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $workWithDb = WorkWithDb::getInstance();
    $allBooksShortInfo = $workWithDb->giveAllBooksShortInfo($fromWhich);
    $conewrsion = new conversion;
    $allBooksShortInfo = $conewrsion->conversionBooksShortInfo($allBooksShortInfo);
    $allBooksShortInfo = json_encode($allBooksShortInfo);
    echo $allBooksShortInfo;
}
