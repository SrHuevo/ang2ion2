export class BookStatus {
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