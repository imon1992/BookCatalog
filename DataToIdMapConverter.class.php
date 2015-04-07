<?php

class conversion {

    function conversionBooksShortInfo($booksArray) {
        foreach ($booksArray as $booksInfo) {
            $data[$booksInfo['id']] = array(
                'id' => $booksInfo['id'],
                'short_information_about_the_book' => $booksInfo['short_information_about_the_book'],
                'title' => $booksInfo['title'],
                'name' => array($booksInfo['name']),
                'author' => array($booksInfo['author'])
            );
        }
        foreach ($booksArray as $booksInfo) {
            if (array_key_exists($booksInfo['id'], $data)) {
                if (array_search($booksInfo['name'], $data[$booksInfo['id']]['name']) === false) {
                    $data[$booksInfo['id']]['name'][] = $booksInfo['name'];
                    $as++;
                }
                if (array_search($booksInfo['author'], $data[$booksInfo['id']]['author']) === false) {
                    $data[$booksInfo['id']]['author'][] = $booksInfo['author'];
                    $sa++;
                }
            }
        }
        return $data;
    }

    function conversionBooksFullInfo($bookArray) {
        foreach ($bookArray as $bookInfo) {
            $data[$bookInfo['id']] = array(
                'id' => $bookInfo['id'],
                'full_information_about_the_book' => $bookInfo['full_information_about_the_book'],
                'price' => $bookInfo['price'],
                'title' => $bookInfo['title'],
                'name' => array($bookInfo['name']),
                'author' => array($bookInfo['author'])
            );
        }
        foreach ($bookArray as $bookInfo) {
            if (array_key_exists($bookInfo['id'], $data)) {
                if (array_search($bookInfo['name'], $data[$bookInfo['id']]['name']) === false) {
                    $data[$bookInfo['id']]['name'][] = $bookInfo['name'];
                }
                if (array_search($bookInfo['author'], $data[$bookInfo['id']]['author']) === false) {
                    $data[$bookInfo['id']]['author'][] = $bookInfo['author'];
                }
            }
        }
        return $data;
    }

    function conversionBookAllInfo($booksArray) {
        foreach ($booksArray as $booksInfo) {
            $data[$booksInfo['id']] = array(
                'id' => $booksInfo['id'],
                'short_information_about_the_book' => $booksInfo['short_information_about_the_book'],
                'full_information_about_the_book' => $booksInfo['full_information_about_the_book'],
                'title' => $booksInfo['title'],
                'name' => array($booksInfo['name']),
                'author' => array($booksInfo['author']),
                'price' => $booksInfo['price']
            );
        }
        foreach ($booksArray as $booksInfo) {
            if (array_key_exists($booksInfo['id'], $data)) {
                if (array_search($booksInfo['name'], $data[$booksInfo['id']]['name']) === false) {
                    $data[$booksInfo['id']]['name'][] = $booksInfo['name'];
                    $as++;
                }
                if (array_search($booksInfo['author'], $data[$booksInfo['id']]['author']) === false) {
                    $data[$booksInfo['id']]['author'][] = $booksInfo['author'];
                    $sa++;
                }
            }
        }
        return $data;
    }

}
