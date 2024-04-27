// intro
interface IUserService19 {
    users: number,
    getUsersInDB(): number
}

class UserService19 implements IUserService19 {
    users: number = 1000;

    getUsersInDB(): number {
        return this.users;
    }
}

// kind of decorator
function nullUser19(obj: IUserService19) {
    obj.users = 0;
    return obj;
}

function logUser19(obj: IUserService19) {
    console.log("Users: " + obj.users)
    return obj;
}

console.log(new UserService19().getUsersInDB()); // prints 1000
console.log(nullUser19(new UserService19()).getUsersInDB()); // prints 0
console.log(logUser19(nullUser19(new UserService19())).getUsersInDB()); // prints "Users: 0" and 0

// -----
// classes
console.log("Decorators - classes");
@nullUser20
class UserService20 implements IUserService19 {
    users: number = 1000;

    getUsersInDB(): number {
        return this.users;
    }
}

@threeUserAdvanced20
class UserService20X implements IUserService19 {
    users: number = 1000;

    getUsersInDB(): number {
        return this.users;
    }
}

// now it's decorator
function nullUser20(target: Function, _context: any) {
    target.prototype.users = 0; // changes value BEFORE class is initialized, e.g. we doesn't overwrite users value assigned in class
}

function threeUserAdvanced20<T extends { new(...args: any[]): {} }>(constructor: T, _context: any) {
    return class extends constructor {
        users = 3;
    };
}

console.log(new UserService20X().getUsersInDB());

// -----
// fabrics
console.log("Decorators - fabrics");
// similarly to nullUser20 works BEFORE class initialization, default values will overwrite this assignment
function setUsers20(users: number, ...args: any[]) {
    return (target: Function) => {
        target.prototype.users = users;
    }
}

@setUsers20(2)
class UserService20XX implements IUserService19 {
    users: number;

    getUsersInDB(): number {
        return this.users;
    }
}

// similarly to threeUserAdvanced20 works AFTER class initialization, overwrites default values
function setUserAdvanced20(users: number) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            users = users;
        };
    }
}

// decorator that adds "createdAt" parameter to an object
function CreatedAt<T extends { new (...args: any[]): {}}>(constructor: T, _context: any) {
    return class extends constructor {
        createdAt = new Date();
    }
}

// this is required to access new createdAt parameter in an object
type CreatedAt = {
    createdAt: Date;
}

@CreatedAt
class UserService20XXX implements IUserService19 {
    users: number;

    getUsersInDB(): number {
        return this.users;
    }
}

console.log((new UserService20XXX() as IUserService19 & CreatedAt).createdAt);

// -----
// methods
console.log("Decorators - methods");
interface IUserService21 {
    users: number,
    getUsersInDB(): number
}

class UserService21 implements IUserService21 {
    users: number = 1000;

    @Log21
    getUsersInDB(): number {
        throw new Error("Error");
        
    }
}

console.log(new UserService21().getUsersInDB());

function Log21(
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void {
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
    descriptor.value = () => {
        console.log('no error');
    }
}