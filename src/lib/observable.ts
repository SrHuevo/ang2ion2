export class Observable <E> {
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