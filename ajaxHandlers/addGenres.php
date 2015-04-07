<?php

include_once '../WorkWithDb.class.php';
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && !empty($_SERVER['HTTP_X_REQUESTED_WITH']) 
        && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

    $genresJson = file_get_contents('php://input');
    $genresObj = json_decode($genresJson);
    foreach ($genresObj->genres as $genre) {
        $genresArray[] = $genre;
    }
    $workWithDb = WorkWithDb::getInstance();
    $workWithDb->addGenres($genresArray);
    echo 'All is Good';
}