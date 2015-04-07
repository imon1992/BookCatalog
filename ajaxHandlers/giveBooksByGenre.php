<?php

include_once '../WorkWithDb.class.php';
include_once '../DataToIdMapConverter.class.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $genreId = $_GET['id'];
    $fromWhich = $_GET['fromWhich'];
    $workWithDb = WorkWithDb::getInstance();
    $booksWithCertainGenre = $workWithDb->giveBooksByGenre($genreId, $fromWhich);
    $conewrsion = new conversion;
    $booksWithCertainGenre = $conewrsion->conversionBooksShortInfo($booksWithCertainGenre);
    $booksWithCertainGenre = json_encode($booksWithCertainGenre);
    echo $booksWithCertainGenre;
}
