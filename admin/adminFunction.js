$(document).ready(function () {
    
    $('#addGenre').on('click', function () {
        $('body').empty();
        $('body').append('<div><button id="addFilds">Добавить поле для ввода жанров</button></div>');
        $('body').append('<div><button id="send">Создать жанр(ы)</button></div>');
        $('body').append('<div id="genres"></div>');
        $('body').children('div').eq(2).append('<lable>Веедите Жанр(ы)</lable>');
        $('body').children('div').eq(2).append('<input></input>');
        
        $('#addFilds').on('click', function () {
            $('body').children('div').eq(2).append('<input></input>');
        });
        
        $('#send').on('click', function () {
            var genresLenght = $('#genres').children('input').length;
            var arrayWhithGanres = new Array();
            for (i = 0; i < genresLenght; i++) {
                var genres = $('#genres').children('input').eq(i).val();
                arrayWhithGanres[i] = genres;
            }
            var genresObj = new Object();
            genresObj.genres = arrayWhithGanres;
            var genres = JSON.stringify(genresObj);
            $.ajax({
                url: "../ajaxHandlers/addGenres.php",
                type: "POST",
                data: genres
            });
        });
    });
    
    $('#addBook').on('click', function () {
        var genres;
        $.ajax({
            type: "GET",
            url: "../ajaxHandlers/giveAllGenres.php",
            success: function (data) {
                data = JSON.parse(data);
                genres = data;
                $('body').empty();
                $('body').append('<div><H1>Если книгу писал не один автор нажми \'Добавить поле для ввода автора\'</H></div>');
                $('body').append('<div><button id="addFildsAuthor">Добавить поле для ввода автора</button></div>');
                $('body').append('<div><button id="addFildsGenres">Добавить поле для выбора жанра</button></div>');
                var uniqueIdForAuthorName = {id: 1};
                var uniqueIdForAuthorGenres = {id: 1};
                
                $('#addFildsAuthor').on('click', function () {
                    $('#addTable').children('tr').eq(1).children('td').eq(1).append('<lable>Еще автор</lable><input id="' + 'authorName' + uniqueIdForAuthorName.id + '"></input>');
                    uniqueIdForAuthorName.id = uniqueIdForAuthorName.id + 1
                });
                
                $('#addFildsGenres').on('click', function () {
                    $('#addTable').children('tr').eq(0).children('td').eq(1).append('<select id="' + 'genre' + uniqueIdForAuthorGenres.id + '"></select>');
                    for (var val in data) {
                        $('#genre' + uniqueIdForAuthorGenres.id + '').append('<option value =' + data[val]['id'] + '> ' + data[val]['name'] + ' </option>');
                    }
                    uniqueIdForAuthorGenres.id = uniqueIdForAuthorGenres.id + 1
                });
                $('body').append('<div><table><tbody id="addTable"></tbody></table></div>');
                $('#addTable').append('<tr></tr>');
                $('#addTable').children('tr').eq(0).append('<td><td>');
                $('#addTable').children('tr').eq(0).append('<td><td>');
                $('#addTable').children('tr').eq(0).children('td').eq(0).append('Выберите жанр');
                $('#addTable').children('tr').eq(0).children('td').eq(1).append('<select id="genre0"></select>');
                for (var val in data) {
                    $('#addTable').children('tr').eq(0).children('td').eq(1).children('select').append('<option value =' + data[val]['id'] + '> ' + data[val]['name'] + ' </option>');
                }
                $('#addTable').append('<tr></tr>');
                $('#addTable').children('tr').eq(1).append('<td><td>');
                $('#addTable').children('tr').eq(1).append('<td><td>');
                $('#addTable').children('tr').eq(1).children('td').eq(0).append('Введите автора');
                $('#addTable').children('tr').eq(1).children('td').eq(1).append('<input id="authorName0"></input>');
                $('#addTable').append('<tr></tr>');
                $('#addTable').children('tr').eq(2).append('<td><td>');
                $('#addTable').children('tr').eq(2).append('<td><td>');
                $('#addTable').children('tr').eq(2).children('td').eq(0).append('Введите название книги');
                $('#addTable').children('tr').eq(2).children('td').eq(1).append('<input id="title"></input>');
                $('#addTable').append('<tr></tr>');
                $('#addTable').children('tr').eq(3).append('<td><td>');
                $('#addTable').children('tr').eq(3).append('<td><td>');
                $('#addTable').children('tr').eq(3).children('td').eq(0).append('Введите кратное описание книги');
                $('#addTable').children('tr').eq(3).children('td').eq(1).append('<textarea id="shortInfo" cols="40" rows="3"></textarea>');
                $('#addTable').append('<tr></tr>');
                $('#addTable').children('tr').eq(4).append('<td><td>');
                $('#addTable').children('tr').eq(4).append('<td><td>');
                $('#addTable').children('tr').eq(4).children('td').eq(0).append('Введите полное описание книги');
                $('#addTable').children('tr').eq(4).children('td').eq(1).append('<textarea id="fullInfo" cols="40" rows="3"></textarea>');
                $('#addTable').append('<tr></tr>');
                $('#addTable').children('tr').eq(5).append('<td><td>');
                $('#addTable').children('tr').eq(5).append('<td><td>');
                $('#addTable').children('tr').eq(5).children('td').eq(0).append('Введите стоимость книги');
                $('#addTable').children('tr').eq(5).children('td').eq(1).append('<input id="price"></input>');
                $('#addTable').append('<div><button id="createBook">Добавить книгy в базу</button><div>');
                
                $('#createBook').on('click', function () {
                    var authors = new Array;
                    var genresId = new Array;
                    var genresLength = $('#addTable').children('tr').eq(0).children('td').eq(1).children('select').length;
                    for (i = 0; i < genresLength; i++) {
                        genresId[i] = $('#genre' + i + '').children("option:selected").attr('value');
                    }
                    var authorNameLength = $('#addTable').children('tr').eq(1).children('td').eq(1).children('input').length;
                    for (i = 0; i < authorNameLength; i++) {
                        authors[i] = $('#authorName' + i + '').val();
                    }
                    var title = $('#title').val();
                    var shortInfo = $('#shortInfo').val();
                    var fullInfo = $('#fullInfo').val();
                    var price = $('#price').val();
                    var bookObj = new Object;
                    bookObj.genersId = genresId;
                    bookObj.authors = authors;
                    bookObj.title = title;
                    bookObj.fullInformationAbouTheBook = fullInfo;
                    bookObj.shortInformationAbouTheBook = shortInfo;
                    bookObj.price = price;
                    var book = JSON.stringify(bookObj);
                    $.ajax({
                        url: "../ajaxHandlers/addBooksAuthorsGenresBook_genreBook_author.php",
                        type: "POST",
                        data: book
                    });
                });
            }
        });
    });

    $('#editBooks').on('click', function () {
        $.ajax({
            url: "../ajaxHandlers/giveAllBooksTitleAndId.php",
            type: "GET",
            success: function (data) {
                data = JSON.parse(data);
                $('body').empty();
                var i = 0;
                for (var val in data) {
                    $('body').append('<div>' + data[val]['title'] + '</div>');
                    $('body').children('div').eq(i).attr('id', data[val]['id']);
                    i++;
                }
                $('body').children('div').on('click', chengBookInfo);
            }
        });
    });
    
    function chengBookInfo() {
        var id = this.id;
        $.ajax({
            url: "../ajaxHandlers/giveBookAllInfo.php",
            type: "GET",
            data: {'id': id},
            success: function (data) {
                data = JSON.parse(data);
                $('body').empty();
                $('body').append('<H3>Внесите изменения</H3>');
                $('body').append('<table><tbody></tbody></table>');
                $('body').children('table').children('tbody').append('<tr></tr>');
                $('body').children('table').children('tbody').append('<tr id ="authors"></tr>');
                $('body').children('table').children('tbody').append('<tr id ="genres"></tr>');
                $('body').children('table').children('tbody').append('<tr></tr>');
                $('body').children('table').children('tbody').append('<tr></tr>');
                $('body').children('table').children('tbody').append('<tr></tr>');
                $('body').children('table').children('tbody').append('<tr></tr>');
                $('body').children('table').children('tbody').children('tr').eq(0).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(0).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(1).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(1).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(2).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(2).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(3).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(3).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(4).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(4).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(5).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(5).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(6).append('<td></td>');
                $('body').children('table').children('tbody').children('tr').eq(6).append('<td></td>');
                $('body').children('table').children('tbody').append('<button id = "change">Изменить</button>');
                $('body').children('table').children('tbody').children('tr').eq(0).children('td').eq(0).append('Название<br>');
                $('body').children('table').children('tbody').children('tr').eq(1).children('td').eq(0).append('Автор(ы)<br>');
                $('body').children('table').children('tbody').children('tr').eq(2).children('td').eq(0).append('Жанр(ы)<br>');
                $('body').children('table').children('tbody').children('tr').eq(3).children('td').eq(0).append('Краткая информация<br>');
                $('body').children('table').children('tbody').children('tr').eq(4).children('td').eq(0).append('Полная информация<br>');
                $('body').children('table').children('tbody').children('tr').eq(5).children('td').eq(0).append('Цена');
                $('body').children('table').children('tbody').children('tr').eq(6).children('td').eq(0).append('ID:');
                $('body').children('table').children('tbody').children('tr').eq(0).children('td').eq(1).append('<input id="title">');
                $('body').children('table').children('tbody').children('tr').eq(0).children('td').eq(1).children('input').attr('value', data[id]['title']);
                for (var val in data[id]['author']) {

                    $('body').children('table').children('tbody').children('tr').eq(1).children('td').eq(1).append('<input id = author' + val + '>');
                    $('#author' + val + '').attr('value', data[id]['author'][val]);

                }
                for (var val in data[id]['name']) {
                    $('body').children('table').children('tbody').children('tr').eq(2).children('td').eq(1).append('<input id = genre' + val + '>');
                    $('#genre' + val + '').attr('value', data[id]['name'][val]);
                }
                $('body').children('table').children('tbody').children('tr').eq(3).children('td').eq(1).append('<textarea id ="shortInfo" rows="10" cols="45" name="text"></textarea>');
                $('body').children('table').children('tbody').children('tr').eq(3).children('td').eq(1).children('textarea').attr('value', data[id]['short_information_about_the_book']);

                $('body').children('table').children('tbody').children('tr').eq(4).children('td').eq(1).append('<textarea id = "fullInfo" rows="10" cols="45" name="text"></textarea>');
                $('body').children('table').children('tbody').children('tr').eq(4).children('td').eq(1).children('textarea').attr('value', data[id]['full_information_about_the_book']);

                $('body').children('table').children('tbody').children('tr').eq(5).children('td').eq(1).append('<input id = "price">');
                $('body').children('table').children('tbody').children('tr').eq(5).children('td').eq(1).children('input').attr('value', data[id]['price']);
                $('body').children('table').children('tbody').children('tr').eq(6).children('td').eq(1).append('<div id = "bookId"value =' + data[id]['id'] + '></div>');
                
                $('#change').on('click', function () {
                    var bookId = $('#bookId').attr('value');
                    var authors = new Array;
                    var genres = new Array;
                    var authorsLength = $('#authors').children('td').eq(1).children('input').length;

                    for (i = 0; i < authorsLength; i++) {

                        if ($('#author' + i + '').val() != data[bookId]['author'][i])
                            authors[i] = $('#author' + i + '').val();
                    }
                    var genresLength = $('#genres').children('td').eq(1).children('input').length;
                    for (i = 0; i < genresLength; i++) {
                        if ($('#genre' + i + '').val() != data[bookId]['name'][i])
                            genres[i] = $('#genre' + i + '').val();
                    }
                    var title = $('#title').val();
                    var shortInfo = $('#shortInfo').val();
                    var fullInfo = $('#fullInfo').val();
                    var price = $('#price').val();
                    var bookObj = new Object;
                    bookObj.id = bookId;
                    bookObj.genersId = genres;
                    bookObj.authors = authors;
                    bookObj.title = title;
                    bookObj.fullInformationAbouTheBook = fullInfo;
                    bookObj.shortInformationAbouTheBook = shortInfo;
                    bookObj.price = price;
                    var bookInformationTOChange = JSON.stringify(bookObj);
                    $.ajax({
                        url: "../ajaxHandlers/updateBook.php",
                        type: "POST",
                        data: bookInformationTOChange
                    });

                });
            }
        });


    }

    $('#deleteBooks').on('click', function () {
        $.ajax({
            url: "../ajaxHandlers/giveAllBooksTitleAndId.php",
            type: "GET",
            success: function (data) {
                data = JSON.parse(data);
                $('body').empty();
                $('body').append('<table><tbody></tbody></table>');
                for (var val in data) {
                    $('body').children('table').children('tbody').append('<tr>');
                    $('body').children('table').children('tbody').children('tr').eq(val).append('<td>' + data[val]['title'] + '<button id=' + data[val]['id'] + '>Удалить</button></td>');
                    $('body').children('table').children('tbody').children('tr').eq(val).children('td').children('button').on('click', function () {
                        var id = this.id;
                        id = JSON.stringify(id);
                        $.ajax({
                            url: "../ajaxHandlers/deleteBook.php",
                            type: "POST",
                            data: id});
                    });

                }
            }
        });
    });
});
