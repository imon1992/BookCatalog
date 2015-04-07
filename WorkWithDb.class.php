<?php

include_once 'ConnectToDb.class.php';

class WorkWithDb {

    protected $_db;
    protected static $_instance;

    private function __construct() {
        $db = new ConnectToDB();
        $db->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
        $db->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, FALSE);  
        $this->_db = $db;
    }

    public function __destruct() {
        unset($this->_db);
    }

    private function __clone() {
        
    }

    public static function getInstance() {
        if (null === self::$_instance) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    protected function db2Arr($data) {
        $arr = array();
        while ($row = $data->fetch(PDO::FETCH_ASSOC))
            $arr[] = $row;
        return $arr;
    }

    function giveBooksByGenre($genreId, $fromWhich, $howMany = 20) {
        $stmt = $this->_db->db->prepare(
                "SELECT  
                    books.id,
                    books.short_information_about_the_book,
                    books.title,
                    genres.name,
                    authors.author
                 FROM books
                 INNER JOIN book_genre ON book_genre.book_id = books.id
                 INNER JOIN genres ON book_genre.genre_id = genres.id
                 INNER JOIN book_author ON book_author.book_id = books.id
                 INNER JOIN authors ON authors.id = book_author.author_id
                 WHERE genres.id = ?
                 ORDER BY books.date_of_add
                 LIMIT ?, ?");
        $stmt->execute(array($genreId, $fromWhich, $howMany));
        return $this->db2Arr($stmt);
    }

    function giveBooksByAuthur($authorId, $fromWhich, $howMany = 20) {
        $stmt = $this->_db->db->prepare(
                "SELECT 
                    books.id,
                    books.short_information_about_the_book,
                    books.title,
                    genres.name,
                    authors.author
                 FROM books
                 INNER JOIN book_author ON book_author.book_id = books.id
                 INNER JOIN authors ON book_author.author_id = authors.id
                 INNER JOIN book_genre ON book_genre.book_id = books.id
                 INNER JOIN genres ON book_genre.genre_id = genres.id
                 WHERE authors.id = :authorId
                 ORDER BY books.date_of_add
                 LIMIT :fromWhich,:howMany");
        $stmt->bindParam(':authorId', $authorId);
        $stmt->bindParam(':fromWhich', $fromWhich);
        $stmt->bindParam(':howMany', $howMany);
        $stmt->execute();
        return $this->db2Arr($stmt);
    }

    function addGenres($genresArray) {
        foreach ($genresArray as $genre) {
            $stmt = $this->_db->db->prepare(
                    "INSERT INTO genres(name) 
                    VALUES(:name)");
            $stmt->bindParam(':name', $genre);
            $stmt->execute();
        }
    }

    function addAuthor($authorsArray) {
        foreach ($authorsArray as $author) {
            $stmt = $this->_db->db->prepare(
                    "INSERT INTO authors(author) 
                    VALUES(:author)");
            $stmt->bindParam(':author', $author);
            $stmt->execute();
        }
    }

    function addGenresToBook_genre($bookGenresIdArray, $title) {
        foreach ($bookGenresIdArray as $genreId) {
            $stmt = $this->_db->db->prepare(
                    "INSERT INTO book_genre(genre_id,book_id) 
                     VALUES ( :genreId,(SELECT books.id
                                      FROM books
                                      WHERE books.title = :title))");
            $stmt->bindParam(':genreId', $genreId);
            $stmt->bindParam(':title', $title);

            $stmt->execute();
        }
    }

    function addAuthorsToBook_author($bookAuthorsArray, $title) {
        foreach ($bookAuthorsArray as $author) {
            $stmt = $this->_db->db->prepare(
                    "INSERT INTO book_author(author_id,book_id) 
                     VALUES ((SELECT authors.id
                                           FROM authors
                                           WHERE authors.author = :author),(SELECT books.id
                                                                              FROM books
                                                                              WHERE books.title = :title))");
            $stmt->bindParam(':author', $author);
            $stmt->bindParam(':title', $title);

            $stmt->execute();
        }
    }

    function addTitlePriceDateOfWritingInformationAboutTheBook($title, $fullInformationAbouTheBook, $shortInformationAboutTheBook, $price) {
        $stmt = $this->_db->db->prepare(
                "INSERT INTO books(title,
                    full_information_about_the_book,
                    short_information_about_the_book,
                    price,
                    date_of_add)
                VALUES(:title,
                :fullInformationAbouTheBook,
                :shortInformationAboutTheBook,
                :price,
                now())");
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':fullInformationAbouTheBook', $fullInformationAbouTheBook);
        $stmt->bindParam(':shortInformationAboutTheBook', $shortInformationAboutTheBook);
        $stmt->bindParam(':price', $price);
        $stmt->execute();
    }

    function giveAllBooksShortInfo($fromWhich, $howMany = 20) {
        $stmt = $this->_db->db->prepare(
                "SELECT 
                    books.id,
                    books.short_information_about_the_book, 
                    books.title, 
                    genres.name,
                    authors.author
                FROM books 
                INNER JOIN book_genre ON book_genre.book_id = books.id
                INNER JOIN genres ON genres.id = book_genre.genre_id
                INNER JOIN book_author ON book_author.book_id = books.id
                INNER JOIN authors ON authors.id = book_author.author_id
                ORDER BY books.date_of_add
                LIMIT :fromWhich,:howMany");
        $stmt->bindParam(':fromWhich', $fromWhich);
        $stmt->bindParam(':howMany', $howMany);
        $stmt->execute();
        return $this->db2Arr($stmt);
    }

    function giveBookAllInfo($bookId) {
        $stmt = $this->_db->db->prepare(
                "SELECT 
                    books.*, 
                    genres.name,
                    authors.author
                FROM books 
                INNER JOIN book_genre ON book_genre.book_id = books.id
                INNER JOIN genres ON genres.id = book_genre.genre_id
                INNER JOIN book_author ON book_author.book_id = books.id
                INNER JOIN authors ON authors.id = book_author.author_id
                WHERE books.id = :bookId
                ORDER BY books.date_of_add");
        $stmt->bindParam(':bookId', $bookId);
        $stmt->execute();
        return $this->db2Arr($stmt);
    }

    function giveAllBooksAllInfo() {
        $stmt = $this->_db->db->prepare(
                "SELECT 
                    books.id,
                    books.title
                FROM books ");

        $stmt->execute();
        return $this->db2Arr($stmt);
    }

    function giveBookFullInfo($bookId) {
        $stmt = $this->_db->db->prepare(
                "SELECT 
                    books.id,
                    books.full_information_about_the_book,
                    books.price, 
                    books.title, 
                    genres.name,
                    authors.author
                FROM books 
                INNER JOIN book_genre ON book_genre.book_id = books.id
                INNER JOIN genres ON genres.id = book_genre.genre_id
                INNER JOIN book_author ON book_author.book_id = books.id
                INNER JOIN authors ON authors.id = book_author.author_id
                WHERE books.id = :bookId");
        $stmt->bindParam(':bookId', $bookId);
        $stmt->execute();
        return $this->db2Arr($stmt);
    }

    function deleteBook($bookId) {
        $stmt = $this->_db->db->prepare(
                "DELETE 
                    FROM books
                    WHERE books.id = ?");
        $stmt->execute(array($bookId));
    }

    function chengBookInfo($title, $price, $bookId, $fullInfo, $shortInfo) {
        $stmt = $this->_db->db->prepare(
                "UPDATE books
                SET  
                    full_information_about_the_book = ?,
                    short_information_about_the_book = ?,
                    title = ?,
                    price = ?
                WHERE id = ?    
                    ");
        $stmt->execute(array($fullInfo, $shortInfo, $title, $price, $bookId));
    }

    function giveAllAuthors() {
        $stmt = $this->_db->db->prepare(
                "SELECT *
                FROM authors");

        $stmt->execute();
        return $this->db2Arr($stmt);
    }

    function giveAllGenres() {
        $stmt = $this->_db->db->prepare(
                "SELECT *
                FROM genres");

        $stmt->execute();
        return $this->db2Arr($stmt);
    }

    protected function getCountBooks() {
        $stmt = $this->_db->db->prepare(
                "SELECT COUNT(books.id) 
                 FROM books");

        $stmt->execute();
        return $this->db2Arr($stmt);
    }

}
