interface IPrototype<T> {
    clone(): T;
}

class UserHistory implements IPrototype<UserHistory> {
    createdAt: Date;
    constructor(public email: string, public name: string) {
        this.createdAt = new Date();
    }

    clone(): UserHistory {
        let target = new UserHistory(this.email, this.name);
        target.createdAt = this.createdAt;
        return target;
    }
}

let user20 = new UserHistory('asdf@sdfg.com', 'Julio');
console.log(user20);
let user21 = user20.clone();
console.log(user21);