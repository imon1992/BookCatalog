<?php

include_once '../WorkWithDb.class.php';
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) 
        && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

    $dataJson = file_get_contents('php://input');
    $dataObj = json_decode($dataJson);
    foreach ($dataObj->genersId as $genreId) {
        $genersArrayId[] = $genreId;
    }
    echo $dataObj->authors;
    foreach ($dataObj->authors as $author) {
        $authorsArray[] = $author;
    }
    $title = $dataObj->title;
    $fullInformationAbouTheBook = $dataObj->fullInformationAbouTheBook;
    $shortInformationAboutTheBook = $dataObj->shortInformationAbouTheBook;
    $price = $dataObj->price;
    $workWithDb = WorkWithDb::getInstance();
    $workWithDb->addTitlePriceDateOfWritingInformationAboutTheBook($title, $fullInformationAbouTheBook, $shortInformationAboutTheBook, $price);
    $workWithDb->addAuthor($authorsArray);
    $workWithDb->addGenresToBook_genre($genersArrayId, $title);
    $workWithDb->addAuthorsToBook_author($authorsArray, $title);
}

