/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
exports.BookStatus = BookStatus;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var book_1 = __webpack_require__(2);
var library_1 = __webpack_require__(4);
var ViewLibrary = (function () {
    function ViewLibrary(table, title, author, year, status) {
        var _this = this;
        this.title = title;
        this.author = author;
        this.year = year;
        this.status = status;
        this.library = new library_1.Library();
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
        var book = new book_1.Book(this.title(), this.author(), this.year(), this.status());
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
        tr.appendChild(this.createTd(book.title));
        tr.appendChild(this.createTd(book.author));
        tr.appendChild(this.createTd(book.year.toString()));
        tr.appendChild(this.createTdStatus(book.status.translate));
        tr.appendChild(this.createTdRemove());
        return tr;
    };
    ViewLibrary.prototype.createTdStatus = function (status) {
        var td = this.createTd(status);
        td.innerHTML = this.createIcon('glyphicon-refresh').outerHTML + td.innerHTML;
        return td;
    };
    ViewLibrary.prototype.createTdRemove = function () {
        var td = this.createTd('');
        var button = this.createButton('btn-danger');
        button.appendChild(this.createIcon('glyphicon-remove-circle'));
        td.appendChild(button);
        return td;
    };
    ViewLibrary.prototype.createTd = function (text) {
        var td = document.createElement('td');
        td.innerHTML = text;
        return td;
    };
    ViewLibrary.prototype.createIcon = function (iconSet) {
        var icon = document.createElement('span');
        icon.classList.add('glyphicon');
        icon.classList.add(iconSet);
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    };
    ViewLibrary.prototype.createButton = function (buttonSet) {
        var button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-danger');
        return button;
    };
    return ViewLibrary;
}());
exports.ViewLibrary = ViewLibrary;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
exports.Book = Book;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
exports.Observable = Observable;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var observable_1 = __webpack_require__(3);
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
}(observable_1.Observable));
exports.Library = Library;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var view_library_1 = __webpack_require__(1);
var book_status_1 = __webpack_require__(0);
document.addEventListener('DOMContentLoaded', function () {
    var viewLibrary = new view_library_1.ViewLibrary(document.getElementById("table-library"), function () { return document.getElementById("imput-book-title").value; }, function () { return document.getElementById("imput-book-author").value; }, function () { return Number(document.getElementById("imput-book-year").value); }, function () { return book_status_1.BookStatus.getStatus(document.getElementById("input-book-status").value); });
    viewLibrary.setAddButton(document.getElementById("book-add"));
}, false);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map