type PaymentStatus2 = 'new' | 'paid';

class Payment2 {
    id: number;
    status: PaymentStatus2 = 'new';
    
    constructor(id: number) {
        this.id = id;
    }

    pay() {
        this.status = 'paid';
    }
}

class PersistentPayment extends Payment2 {
    databaseId: number;
    paidAt: Date;

    constructor() {
        const id = Math.random();
        super(id); // required part for extended classes constructor
    }

    save() {
        // save to a DB
    }

    override pay(date?: Date) {
        // super.pay(); // deprecated implementation before override was implemented
        if (date) {
            this.paidAt = date;
        }
    }
}

class MyError extends Error {
    code: number;

    constructor(message: string, code?: number) {
        super(message);
        this.code = code ?? 500;
    }

}