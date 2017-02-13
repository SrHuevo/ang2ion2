var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Observable = (function () {
    function Observable() {
        this.functions = [];
    }
    Observable.prototype.suscribe = function (f) {
        this.functions.push(f);
    };
    Observable.prototype.notify = function (e) {
        this.functions.forEach(function (f, i) {
            f(e);
        });
    };
    return Observable;
}());
var BookStatus = (function () {
    function BookStatus(translate) {
        this.translate = translate;
    }
    BookStatus.getStatus = function (status) {
        switch (status) {
            case "Reservado":
                return BookStatus.RESERVE;
            case "Libre":
                return BookStatus.FREE;
        }
    };
    return BookStatus;
}());
BookStatus.RESERVE = new BookStatus("Reservado");
BookStatus.FREE = new BookStatus("Libre");
var Book = (function () {
    function Book(title, author, year, status) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.status = status;
        this.id = "book-" + Math.random();
    }
    return Book;
}());
var Library = (function (_super) {
    __extends(Library, _super);
    function Library() {
        var _this = _super.call(this) || this;
        _this.books = [];
        return _this;
    }
    Library.prototype.addBook = function (book) {
        this.books.push(book);
        _super.prototype.notify.call(this, book);
    };
    Library.prototype.toString = function () {
        this.books.forEach(function (book, i) {
            console.log(book.title + "\t" + book.author + "\t" + book.year + "\t" + book.status);
        });
    };
    return Library;
}(Observable));
var ViewLibrary = (function () {
    function ViewLibrary(table, title, author, year, status) {
        var _this = this;
        this.title = title;
        this.author = author;
        this.year = year;
        this.status = status;
        this.library = new Library();
        this.library.suscribe(function (book) { return _this.paintNew(book); });
        this.tbody = table.querySelector('tbody');
    }
    ViewLibrary.prototype.setAddButton = function (button) {
        var _this = this;
        button.addEventListener("click", function () { return _this.addBook(); });
    };
    ViewLibrary.prototype.setDelButton = function (button) {
        var _this = this;
        button.addEventListener("click", function () { return _this.delBook(); });
    };
    ViewLibrary.prototype.addBook = function () {
        var book = new Book(this.title(), this.author(), this.year(), this.status());
        this.library.addBook(book);
    };
    ViewLibrary.prototype.delBook = function () { };
    ViewLibrary.prototype.paintNew = function (newBook) {
        var newTr = this.createTr(newBook);
        var trs = this.tbody.querySelectorAll('tr');
        var trBefore = trs[trs.length - 1];
        this.tbody.insertBefore(newTr, trBefore);
    };
    ViewLibrary.prototype.createTr = function (book) {
        var tr = document.createElement('tr');
        tr.id = book.id;
        var td = document.createElement('td');
        td.innerHTML = book.author;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = book.title;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = book.year.toString();
        tr.appendChild(td);
        td = document.createElement('td');
        var icon = document.createElement('span');
        icon.classList.add('glyphicon');
        icon.classList.add('glyphicon-refresh');
        icon.setAttribute('aria-hidden', 'true');
        td.appendChild(icon);
        td.innerHTML = td.innerHTML + ' ' + book.status.translate;
        tr.appendChild(td);
        td = document.createElement('td');
        var button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-danger');
        icon = document.createElement('span');
        icon.classList.add('glyphicon');
        icon.classList.add('glyphicon-remove-circle');
        icon.setAttribute('aria-hidden', 'true');
        button.appendChild(icon);
        td.appendChild(button);
        tr.appendChild(td);
        return tr;
    };
    return ViewLibrary;
}());
document.addEventListener('DOMContentLoaded', function () {
    var viewLibrary = new ViewLibrary(document.getElementById("table-library"), function () { return document.getElementById("imput-book-title").value; }, function () { return document.getElementById("imput-book-author").value; }, function () { return Number(document.getElementById("imput-book-year").value); }, function () { return BookStatus.getStatus(document.getElementById("imput-book-status").value); });
    viewLibrary.setAddButton(document.getElementById("book-add"));
}, false);
//# sourceMappingURL=library.js.map