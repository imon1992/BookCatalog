<?php

include_once '../WorkWithDb.class.php';
include_once '../DataToIdMapConverter.class.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $authorId = $_GET['id'];
    $fromWhich = $_GET['fromWhich'];
    $workWithDb = WorkWithDb::getInstance();
    $booksWithCertainAuthor = $workWithDb->giveBooksByAuthur($authorId, $fromWhich);
    $conewrsion = new conversion;
    $booksWithCertainAuthor = $conewrsion->conversionBooksShortInfo($booksWithCertainAuthor);
    $booksWithCertainAuthor = json_encode($booksWithCertainAuthor);
    echo $booksWithCertainAuthor;
}

