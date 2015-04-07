<?php

include_once '../WorkWithDb.class.php';
if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    $workWithDb = WorkWithDb::getInstance();
    $allAuthors = $workWithDb->giveAllAuthors();
    $allAuthors = json_encode($allAuthors);
    echo $allAuthors;
}
