class PaymentThis {
    private date: Date = new Date();

    getDate(this: PaymentThis) {
        return this.date;
    }

    getDateArrow = () => {
        return this.date;
    }
}

const p = new PaymentThis();

const userThis1 = {
    id: 1,
    paymentDate: p.getDate(),
    paymentDateArrow: p.getDateArrow
}

const userThis2 = {
    id: 2,
    paymentDate: p.getDate.bind(p)
}

console.log(p.getDate());
console.log(userThis1.paymentDate);
console.log(userThis1.paymentDateArrow());
console.log(userThis2.paymentDate());

class PaymentPersistentThis extends PaymentThis {
    save() {
        return super.getDate();
    }
    
    saveArrow() {
        return this.getDateArrow();
    }
}

console.log(new PaymentPersistentThis().save())
console.log(new PaymentPersistentThis().saveArrow());

// -----
class UserBuilder {
    name: string

    setName(name: string): this { // KEY RETURN TYPE!!!
        this.name = name;
        return this;
    }

    isAdmin(): this is AdminBuilder {
        return this instanceof AdminBuilder;
    }
}

class AdminBuilder extends UserBuilder {
    roles: string[]
}

const myUserBuilder1 = new UserBuilder().setName('John'); // is type of UserBuilder
const myUserBuilder2 = new AdminBuilder().setName('Jack'); // is type of AdminBuilder because of 'this' in row 48

let myUser: UserBuilder | AdminBuilder = new UserBuilder();
if (myUser.isAdmin()) {
    console.log(myUser) // myUser type is AdminBuilder
} else {
    console.log(myUser) // myUser type is UserBuilder, how smart TypeScript is, right?
    throw new Error('not an admin');
}