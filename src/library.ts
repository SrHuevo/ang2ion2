class Observable <E> {
    private functions: ((e:E) => void)[] = [];

    suscribe(f: (e:E) => void) { 
        this.functions.push(f);
    }

    notify(e: E) {
        this.functions.forEach((f: (e:E) => void, i: number) => {
            f(e);
        });
    }
}

class BookStatus {
    public static RESERVE = new BookStatus("Reservado");
    public static FREE = new BookStatus("Libre");

    constructor(public translate: string) {}

    static getStatus(status: string): BookStatus {
        switch (status) {
        case "Reservado" :
            return BookStatus.RESERVE;
        case "Libre" :
            return BookStatus.FREE;
        }
    }
}

class Book {

    public id: string;
    
    constructor(
        public title: string, 
        public author: string, 
        public year: number, 
        public status: BookStatus) 
    {
        this.id = "book-" + Math.random();
    }
}

class Library extends Observable <Book> {
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

class ViewLibrary {

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
        tr.appendChild(this.createTd(book.status.translate));
        tr.appendChild(this.createTdStatus(book.year.toString()));
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

document.addEventListener('DOMContentLoaded', function(){
    let viewLibrary = new ViewLibrary(
                    document.getElementById("table-library"),
                    ()=>(<HTMLInputElement>document.getElementById("imput-book-title")).value,
                    ()=>(<HTMLInputElement>document.getElementById("imput-book-author")).value,
                    ()=>Number((<HTMLInputElement>document.getElementById("imput-book-year")).value),
                    ()=>BookStatus.getStatus((<HTMLInputElement>document.getElementById("imput-book-status")).value));

    viewLibrary.setAddButton(document.getElementById("book-add"));


}, false);