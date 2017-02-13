class Observable {
    constructor() {
        this.functions = [];
    }
    suscribe(f) {
        this.functions.push(f);
    }
    notify(e) {
        this.functions.forEach((f, i) => {
            f(e);
        });
    }
}
class BookStatus {
    constructor(translate) {
        this.translate = translate;
    }
    static getStatus(status) {
        switch (status) {
            case "reservado":
                return BookStatus.RESERVE;
            case "libre":
                return BookStatus.FREE;
        }
    }
}
BookStatus.RESERVE = new BookStatus("reservado");
BookStatus.FREE = new BookStatus("libre");
class Book {
    constructor(title, author, year, status) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.status = status;
        this.id = "book-" + Math.random();
    }
}
class Library extends Observable {
    addBook(book) {
        this.books.push(book);
        super.notify(book);
    }
    toString() {
        this.books.forEach(function (book, i) {
            console.log(book.title + "\t" + book.author + "\t" + book.year + "\t" + book.status);
        });
    }
}
class ViewLibrary {
    constructor(table, title, author, year, status) {
        this.library = new Library();
        this.title = title;
        this.author = author;
        this.year = year;
        this.status = status;
        this.library.suscribe(this.paintNew);
        this.tbody = table.querySelector('tbody');
    }
    setAddButton(button) {
        button.addEventListener("click", this.addBook);
    }
    setDelButton(button) {
        button.addEventListener("click", this.addBook);
    }
    addBook() {
        let book = new Book(this.title(), this.author(), this.year(), this.status());
        this.library.addBook(book);
    }
    paintNew(newBook) {
        let newTr = this.createTr(newBook);
        let trs = this.tbody.querySelectorAll('tr');
        let trBefore = trs[trs.length - 2];
        this.tbody.insertBefore(newTr, trBefore);
    }
    createTr(book) {
        let tr = document.createElement('tr');
        tr.id = book.id;
        let td = document.createElement('td');
        td.innerHTML = book.author;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = book.title;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = book.year.toString();
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = book.status.translate;
        tr.appendChild(td);
        return tr;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    let viewLibrary = new ViewLibrary(document.getElementById("table-library"), () => document.getElementById("imput-book-title").value, () => document.getElementById("imput-book-author").value, () => Number(document.getElementById("imput-book-year").value), () => BookStatus.getStatus(document.getElementById("imput-book-status").value));
    viewLibrary.setAddButton(document.getElementById("book-add"));
}, false);
//# sourceMappingURL=built.js.map