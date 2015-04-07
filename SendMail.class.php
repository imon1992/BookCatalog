<?php

class SendMailToAdmin {

    function sendMail($address, $name, $lastName, $patronymic, $numberOfCopies, $title) {

        $message = "Некий $lastName $name $patronymic \r\n" . "Который проживает по адрессу $address\r\n" . "Заказал книгу: $title\r\n" .
                "В количестве равном $numberOfCopies";
        mail('caffeinated@example.com', 'My Subject', $message);
    }

}
