import {Observable} from "./lib/observable";
import {Book} from "./book";

export class Library extends Observable <Book> {
    private books: Book[];

    constructor(){
        super();
        this.books = [];
    }

    addBook(book: Book){
        this.books.push(book);
        super.notify(book);
    }

    toString() {
        this.books.forEach(function(book: Book, i: Number){
            console.log(book.title + "\t" + book.author + "\t" + book.year + "\t" + book.status);
        });
    }
}