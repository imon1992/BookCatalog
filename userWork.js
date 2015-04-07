window.onload = function () {
    document.getElementById('workspace').style.verticalAlign = 'top';
    document.getElementById('menu').style.verticalAlign = 'top';

    document.getElementById('genresTitle').onclick = function () {
        if (document.getElementById('allGenres') === null) {
            var newDiv = document.createElement('DIV');
            newDiv.setAttribute('id', 'allGenres');
            var elementAuthors = document.getElementById('authors');
            var authorsContent = elementAuthors.parentNode;
            authorsContent.insertBefore(newDiv, elementAuthors);
        }

        if (document.getElementById('allGenres').children.length == 0) {
            getRequest('ajaxHandlers/giveAllGenres.php', 'GET', function (data) {
                data = JSON.parse(data);
                var list = document.getElementById('allGenres');
                for (var val in data) {
                    var ul = document.createElement('UL');
                    ul.innerHTML = data[val]['name'];
                    ul.setAttribute('id', data[val]['id']);
                    ul.onclick = getBookFromGenre;
                    list.appendChild(ul);
                }
            });
        }

        var uls = document.getElementById('allGenres').getElementsByTagName('UL');
        for (i = 0; i < uls.length; i++) {
            uls[i].style.display = (uls[i].style.display == 'none') ? 'block' : 'none';
        }
    }

    document.getElementById('authors').onclick = function () {

        if (document.getElementById('allAuthors') === null) {
            var newDiv = document.createElement('DIV');
            newDiv.setAttribute('id', 'allAuthors');
            var elementAuthors = document.getElementById('authors');
            insertAfter(newDiv, elementAuthors);
        }

        if (document.getElementById('allAuthors').children.length == 0) {
            getRequest('ajaxHandlers/giveAllAuthors.php', 'GET', function (data) {
                data = JSON.parse(data);
                var list = document.getElementById('allAuthors');
                for (var val in data) {
                    var ul = document.createElement('UL');
                    ul.innerHTML = data[val]['author'];
                    ul.setAttribute('id', data[val]['id']);
                    ul.onclick = getBookFromAuthor;
                    list.appendChild(ul);
                }
            });
        }

        var uls = document.getElementById('allAuthors').getElementsByTagName('UL');
        for (i = 0; i < uls.length; i++) {
            uls[i].style.display = (uls[i].style.display == 'none') ? 'block' : 'none';
        }
    }

    document.getElementById('allBooks').onclick = function () {
        getRequest('ajaxHandlers/giveAllBooksShortInfo.php?fromWhich=0',
                'GET',
                function (data) {
                    shortInfo(data);
                });
    }

    function shortInfo(data) {
        data = JSON.parse(data);
        document.getElementById('workspace').remove();

        var table = document.createElement('table');
        table.setAttribute('id', 'workspace');
        var tbody = document.createElement('tbody');
        document.getElementById('first').appendChild(table);
        table.appendChild(tbody);
        for (var val in data) {
            var tr = document.createElement('tr');
            tbody.appendChild(tr);
            var td = document.createElement('td');
            tr.appendChild(td);
            var tableInTableTd = document.createElement('table');
            var tbodyInTableInTableTd = document.createElement('tbody');
            var trInTbodyInTableInTableTd = document.createElement('tr');
            var td1InTrInTbodyInTableInTableTd = document.createElement('td');
            var tr1InTbodyInTableInTableTdInTd2 = document.createElement('tr');
            var tr2InTbodyInTableInTableTdInTd2 = document.createElement('tr');
            var tr3InTbodyInTableInTableTdInTd2 = document.createElement('tr');
            var tr4InTbodyInTableInTableTdInTd2 = document.createElement('tr');

            var tdTitle = document.createElement('td');
            var td2Title = document.createElement('td');
            var tdGenre = document.createElement('td');
            var tdShortInfo = document.createElement('td');
            var td2ShortInfo = document.createElement('td');
            var tdAuthor = document.createElement('td');
            var img = document.createElement('img');
            var div = document.createElement('div');
            var button = document.createElement('button');
            button.innerText = 'Подробная информация о книге';
            button.setAttribute('id', data[val]['id']);
            button.onclick = getFullInfoAboutBook;
            img.setAttribute('width', 250);
            img.setAttribute('height', 300);
            img.setAttribute('src', "");
            var td2InTrInTbodyInTableInTableTd = document.createElement('td');
            td.appendChild(tableInTableTd);
            tableInTableTd.appendChild(tbodyInTableInTableTd);
            tbodyInTableInTableTd.appendChild(trInTbodyInTableInTableTd);
            trInTbodyInTableInTableTd.appendChild(td1InTrInTbodyInTableInTableTd);
            td1InTrInTbodyInTableInTableTd.appendChild(div);
            div.appendChild(img);
            trInTbodyInTableInTableTd.appendChild(td2InTrInTbodyInTableInTableTd);
            td2InTrInTbodyInTableInTableTd.appendChild(tr1InTbodyInTableInTableTdInTd2);
            td2InTrInTbodyInTableInTableTd.appendChild(tr4InTbodyInTableInTableTdInTd2);
            td2InTrInTbodyInTableInTableTd.appendChild(tr2InTbodyInTableInTableTdInTd2);
            td2InTrInTbodyInTableInTableTd.appendChild(tr3InTbodyInTableInTableTdInTd2);
            td2InTrInTbodyInTableInTableTd.appendChild(button);
            tr1InTbodyInTableInTableTdInTd2.appendChild(tdTitle);
            tr1InTbodyInTableInTableTdInTd2.appendChild(td2Title);
            tr4InTbodyInTableInTableTdInTd2.appendChild(tdAuthor);
            for (var value in data[val]['author']) {
                var td2Author = document.createElement('a');
                var br = document.createElement('br');
                tr4InTbodyInTableInTableTdInTd2.appendChild(td2Author);
                tr4InTbodyInTableInTableTdInTd2.appendChild(br);
                td2Author.innerText = data[val]['author'][value];
            }
            tr2InTbodyInTableInTableTdInTd2.appendChild(tdGenre);
            for (var value in data[val]['name']) {
                var td2Genre = document.createElement('a');
                tr2InTbodyInTableInTableTdInTd2.appendChild(td2Genre);
                tr2InTbodyInTableInTableTdInTd2.appendChild(br);
                var br = document.createElement('br');
                td2Genre.innerText = data[val]['name'][value];

            }
            tr3InTbodyInTableInTableTdInTd2.appendChild(tdShortInfo);
            tr3InTbodyInTableInTableTdInTd2.appendChild(td2ShortInfo);
            tdShortInfo.setAttribute('height', 120);
            tdTitle.innerHTML = 'Название';
            td2Title.setAttribute('id', data[val]['title'])
            td2Title.innerHTML = data[val]['title'];
            tdAuthor.innerText = "Автор(ы)";
            tdGenre.innerText = 'Жанр(ы)';
            tdShortInfo.innerText = 'Краткая информация';
            td2ShortInfo.innerText = data[val]['short_information_about_the_book'];
        }
        td2InTrInTbodyInTableInTableTd.style.verticalAlign = 'top';
        td2InTrInTbodyInTableInTableTd.setAttribute('id', 'bookInfo');
    }

    function orderForm() {
        if (document.getElementById('orderForm') === null) {
            var workspace = document.getElementById('workspace').firstChild;
            var trForOrderForm = document.createElement('tr');
            trForOrderForm.setAttribute('id', 'orderForm');
            var trForOrderButton = document.createElement('tr');
            var td = document.createElement('td');
            var td2 = document.createElement('td');
            var formForOrder = document.createElement('div');
            var pDiv = document.createElement('p');
            pDiv.innerText = 'ЗАполните форму для заказа книги';
            var address = document.createElement('input');
            address.setAttribute('id', 'address');
            var addressLable = document.createElement('lable');
            var name = document.createElement('input');
            name.setAttribute('id', 'name');
            var nameLable = document.createElement('lable');
            var lastName = document.createElement('input');
            lastName.setAttribute('id', 'lastName');
            var lastNameLable = document.createElement('lable');
            var patronymic = document.createElement('input');
            patronymic.setAttribute('id', 'patronymic');
            var patronymicLable = document.createElement('lable');
            var numberOfCopies = document.createElement('input');
            numberOfCopies.setAttribute('id', 'numberOfCopies');
            var numberOfCopiesLable = document.createElement('lable');
            var pForName = document.createElement('p');
            var pForNameLable = document.createElement('p');
            var pForLastName = document.createElement('p');
            var pForLastNameLable = document.createElement('p');
            var pForPatronymic = document.createElement('p');
            var pForPatronymicLable = document.createElement('p');
            var pForAddress = document.createElement('p');
            var pForAddressLable = document.createElement('p');
            var pForNumberOfCopies = document.createElement('p');
            var pForNumberOfCopiesLable = document.createElement('p');
            var orderButton = document.createElement('button');
            orderButton.innerText = 'Нажмите для заказа';
            workspace.appendChild(trForOrderForm);
            trForOrderForm.appendChild(td);
            trForOrderForm.appendChild(td2);
            td2.appendChild(formForOrder);
            formForOrder.appendChild(pDiv);
            var table = document.createElement('table');
            var tbody = document.createElement('tbody');
            var trForTable = document.createElement('tr');
            var tdForTable = document.createElement('td');
            var td2ForTable = document.createElement('td');
            formForOrder.appendChild(table);
            table.appendChild(tbody);
            tbody.appendChild(trForTable);
            tbody.appendChild(trForOrderButton);
            trForOrderButton.appendChild(orderButton);
            orderButton.onclick = orderInfo;
            trForTable.appendChild(tdForTable);
            trForTable.appendChild(td2ForTable);
            tdForTable.appendChild(pForAddressLable);
            td2ForTable.appendChild(pForAddress);
            pForAddressLable.appendChild(addressLable);
            addressLable.innerText = 'Введите свой адрес';
            pForAddress.appendChild(address);
            tdForTable.appendChild(pForNameLable);
            td2ForTable.appendChild(pForName);

            pForNameLable.appendChild(nameLable);
            nameLable.innerText = 'Введите свое имя';
            pForName.appendChild(name);
            tdForTable.appendChild(pForLastNameLable);
            td2ForTable.appendChild(pForLastName);
            pForLastNameLable.appendChild(lastNameLable);
            lastNameLable.innerText = 'Введите свою фамилию';
            pForLastName.appendChild(lastName);
            tdForTable.appendChild(pForPatronymicLable);
            td2ForTable.appendChild(pForPatronymic);
            pForPatronymicLable.appendChild(patronymicLable);
            patronymicLable.innerText = 'Отчество';
            pForPatronymic.appendChild(patronymic);
            tdForTable.appendChild(pForNumberOfCopiesLable);
            td2ForTable.appendChild(pForNumberOfCopies);
            pForNumberOfCopiesLable.appendChild(numberOfCopiesLable);
            numberOfCopiesLable.innerText = 'Введите количество книг';
            pForNumberOfCopies.appendChild(numberOfCopies);
        }
    }

    function getBookFromAuthor() {
        getRequest('ajaxHandlers/giveBooksByAuthor.php?id=' + this.id + "&fromWhich=0",
                'GET',
                function (data) {
                    shortInfo(data);
                });
    }

    function getBookFromGenre() {
        getRequest('ajaxHandlers/giveBooksByGenre.php?id=' + this.id + "&fromWhich=0",
                'GET',
                function (data) {
                    shortInfo(data);
                });
    }

    function getFullInfoAboutBook() {
        var id = this.id;
        getRequest('ajaxHandlers/giveBookFullInfo.php?id=' + this.id,
                'GET',
                function (data) {
                    data = JSON.parse(data);
                    document.getElementById('workspace').remove();

                    var table = document.createElement('table');
                    table.setAttribute('id', 'workspace');
                    var tbody = document.createElement('tbody');
                    document.getElementById('first').appendChild(table);
                    table.appendChild(tbody);
                    var trInWorkspace = document.createElement('tr');
                    trInWorkspace.style.verticalAlign = 'top';
                    var tdInTrWorkspace = document.createElement('td');
                    var td2InTrWorkspace = document.createElement('td');
                    var divInTdTrWorkspace = document.createElement('div');
                    var img = document.createElement('img');
                    img.setAttribute('width', 250);
                    img.setAttribute('height', 300);
                    img.setAttribute('src', "");
                    var tr = document.createElement('tr');
                    var tr2 = document.createElement('tr');
                    var tr3 = document.createElement('tr');
                    var tr4 = document.createElement('tr');
                    var tr5 = document.createElement('tr');
                    var tdAuthors = document.createElement('td');
                    var tdGenres = document.createElement('td');
                    var tdTitle = document.createElement('td');
                    var td2Title = document.createElement('td');
                    var tdPrice = document.createElement('td');
                    var td2Price = document.createElement('td');
                    var tdFullInfo = document.createElement('td');
                    var td2FullInfo = document.createElement('td');
                    var buttonForOrder = document.createElement('button');
                    buttonForOrder.innerText = 'Нажмите для заказа книги';

                    tbody.appendChild(trInWorkspace);
                    trInWorkspace.appendChild(tdInTrWorkspace);
                    tdInTrWorkspace.appendChild(divInTdTrWorkspace);
                    divInTdTrWorkspace.appendChild(img);
                    trInWorkspace.appendChild(td2InTrWorkspace);
                    td2InTrWorkspace.appendChild(tr);
                    td2InTrWorkspace.appendChild(tr2);
                    td2InTrWorkspace.appendChild(tr3);
                    td2InTrWorkspace.appendChild(tr4);
                    td2InTrWorkspace.appendChild(tr5);
                    td2InTrWorkspace.appendChild(buttonForOrder);
                    buttonForOrder.onclick = orderForm;
                    tr.appendChild(tdTitle);
                    tr.appendChild(td2Title);
                    tr2.appendChild(tdAuthors);
                    for (var value in data[id]['author']) {
                        var aAuthors = document.createElement('a');
                        var br = document.createElement('br');
                        tr2.appendChild(aAuthors);
                        tr2.appendChild(br);
                        aAuthors.innerText = data[id]['author'][value];
                    }
                    tr3.appendChild(tdGenres);
                    for (var value in data[id]['author']) {
                        var aGenres = document.createElement('a');
                        var br = document.createElement('br');
                        tr3.appendChild(aGenres);
                        tr3.appendChild(br);
                        aGenres.innerText = data[id]['name'][value];
                    }

                    tr4.appendChild(tdFullInfo);
                    tr4.appendChild(td2FullInfo);
                    tr5.appendChild(tdPrice);
                    tr5.appendChild(td2Price);
                    tdTitle.innerText = 'Название';
                    td2Title.innerText = data[id]['title'];
                    td2Title.setAttribute('id', 'title');
                    tdAuthors.innerText = 'Автор(ы)';
                    tdGenres.innerText = 'Жанр(ы)';
                    tdFullInfo.innerText = 'Полное описание';
                    td2FullInfo.innerText = data[id]['full_information_about_the_book'];
                    tdPrice.innerText = 'Цена книги';
                    td2Price.innerText = data[id]['price'];
                    td2Price.setAttribute('id', 'price');

                });
    }

    function orderInfo() {
        var address = document.getElementById('address');
        var sendAddress = address.value;
        var name = document.getElementById('name');
        var sendName = name.value;
        var lastName = document.getElementById('lastName');
        var sendLastName = lastName.value;
        var patronymic = document.getElementById('patronymic');
        var sendPatronymic = patronymic.value
        var numberOfCopies = document.getElementById('numberOfCopies');
        var sendNumberOfCopies = numberOfCopies.value;
        var sendTitle = document.getElementById('title').innerText;
        var empty = false;
        if (sendAddress == '') {
            address.style.borderColor = 'red';
            empty = true;
        }
        if (sendName == '') {
            name.style.borderColor = 'red';
            empty = true;
        }
        if (sendLastName == '') {
            lastName.style.borderColor = 'red';
            empty = true;
        }
        if (sendPatronymic == '') {
            patronymic.style.borderColor = 'red';
            empty = true;
        }
        if (sendNumberOfCopies == '') {
            numberOfCopies.style.borderColor = 'red';
            empty = true;
        }
        if (empty == false) {
            document.getElementById('workspace').firstChild.lastChild.remove();

            var orderInfo = {
                'address': sendAddress,
                'name': sendName,
                'lastName': sendLastName,
                'patronymic': sendPatronymic,
                'numberOfCopies': sendNumberOfCopies,
                'title': sendTitle};
            orderInfo = JSON.stringify(orderInfo);
            getRequest('ajaxHandlers/sendMail.php', 'POST', function () {
            }, orderInfo);
        }
    }

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function getRequest(url, method, callback, data) {
        var req = getXmlHttpRequest();
        if (req) {
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    callback(req.responseText);
                }
            }
        }
        method = method.toUpperCase();
        req.open(method, url, true);
        if (method == 'POST') {
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.send(data);
        } else {
            req.send(null);
        }

        function getXmlHttpRequest() {
            if (window.XMLHttpRequest)
            {
                try
                {
                    return new XMLHttpRequest();
                }
                catch (e) {
                }
            }
            else if (window.ActiveXObject)
            {
                try
                {
                    return new ActiveXObject('Msxml2.XMLHTTP');
                } catch (e) {
                }
                try
                {
                    return new ActiveXObject('Microsoft.XMLHTTP');
                }
                catch (e) {
                }
            }
            return null;
        }
    }
}