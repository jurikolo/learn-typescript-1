enum PaymentStatus {
    Holded,
    Processed,
    Reversed
}

class Payment {
    id: number;
    status: PaymentStatus = PaymentStatus.Holded
    createdAt: Date = new Date();
    updatedAt: Date;

    constructor(id: number) {
        this.id = id;
        // this.createdAt = new Date(); // moved to class variables definition
        // this.status = PaymentStatus.Holded; // moved to class variables definition
    }

    getPaymentLifeTime(): number {
        return new Date().getTime() - this.createdAt.getTime();
    }

    unholdPayment() {
        if (this.status === PaymentStatus.Processed) {
            throw new Error('Payment cannot be returned');
        }
        this.status = PaymentStatus.Reversed;
        this.updatedAt = new Date();
    }
}

const payment = new Payment(1);
const paymentLifeTime = payment.getPaymentLifeTime();
