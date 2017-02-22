import { Book } from './book';
import { Library } from './library';
import { BookStatus } from './book-status';

export class ViewLibrary {

    private library = new Library();
    private tbody: HTMLElement;
    constructor(
        table: HTMLElement,
        public title: () => string,
        public author: () => string,
        public year: () => number,
        public status: () => BookStatus
    ) {        
        this.library.suscribe(book=>this.paintNew(book));
        this.tbody = <HTMLElement>table.querySelector('tbody');
    }

    setAddButton(button: HTMLElement) {
        button.addEventListener("click", () => this.addBook());
    }

    setDelButton(button: HTMLElement) {
        button.addEventListener("click", () => this.delBook());
    }

    addBook() {
        let book = new Book(this.title(), this.author(), this.year(), this.status());
        this.library.addBook(book);
    }

    delBook(){}

    paintNew(newBook: Book) { 
        let newTr =  this.createTr(newBook);
        let trs = this.tbody.querySelectorAll('tr');
        let trBefore = trs[trs.length - 1];
        this.tbody.insertBefore(newTr, trBefore);
    }

    private createTr(book: Book) : HTMLElement {
        let tr = document.createElement('tr');
        tr.id = book.id;
        tr.appendChild(this.createTd(book.title));
        tr.appendChild(this.createTd(book.author));
        tr.appendChild(this.createTd(book.year.toString()));
        tr.appendChild(this.createTdStatus(book.status.translate));
        tr.appendChild(this.createTdRemove());
        return tr
    }

    private createTdStatus(status: string) : HTMLElement {
        let td = this.createTd(status);
        td.innerHTML = this.createIcon('glyphicon-refresh').outerHTML + td.innerHTML;
        return td;
    }

    private createTdRemove() : HTMLElement {
        let td = this.createTd('');
        let button = this.createButton('btn-danger');
        button.appendChild(this.createIcon('glyphicon-remove-circle'))
        td.appendChild(button);
        return td;
    }

    private createTd(text: string) : HTMLElement {
        let td = document.createElement('td');
        td.innerHTML = text;
        return td;
    }

    private createIcon(iconSet: string) : HTMLElement {
        let icon = document.createElement('span');
        icon.classList.add('glyphicon');
        icon.classList.add(iconSet);
        icon.setAttribute('aria-hidden', 'true');
        return icon;
    }

    private createButton(buttonSet: string) : HTMLElement {
        let button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-danger');
        return button;
    }
}