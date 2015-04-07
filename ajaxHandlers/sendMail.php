<?php

include_once '../SendMail.class.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $dataJson = file_get_contents('php://input');
    $dataObj = json_decode($dataJson);
    $address = $dataObj->address;
    $name = $dataObj->name;
    $lastName = $dataObj->lastName;
    $patronymic = $dataObj->patronymic;
    $numberOfCopies = $dataObj->numberOfCopies;
    $title = $dataObj->title;
    $sendMail = new SendMailToAdmin();
    $sendMail->sendMail($address, $name, $lastName, $patronymic, $numberOfCopies, $title);
}
