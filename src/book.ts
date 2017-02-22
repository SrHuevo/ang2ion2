import {BookStatus} from "./book-status"

export class Book {

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