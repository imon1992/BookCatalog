<?php

include_once '../WorkWithDb.class.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $workWithDb = WorkWithDb::getInstance();
    $allGenres = $workWithDb->giveAllGenres();
    $allGenres = json_encode($allGenres);
    echo $allGenres;
}

