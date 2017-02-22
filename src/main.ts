import { ViewLibrary } from './view-library';
import { BookStatus } from './book-status';

document.addEventListener('DOMContentLoaded', function(){
    let viewLibrary = new ViewLibrary(
                    document.getElementById("table-library"),
                    ()=>(<HTMLInputElement>document.getElementById("imput-book-title")).value,
                    ()=>(<HTMLInputElement>document.getElementById("imput-book-author")).value,
                    ()=>Number((<HTMLInputElement>document.getElementById("imput-book-year")).value),
                    ()=>BookStatus.getStatus((<HTMLInputElement>document.getElementById("input-book-status")).value));

    viewLibrary.setAddButton(document.getElementById("book-add"));

}, false);