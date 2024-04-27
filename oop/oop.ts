// to workaround contructor necessity, set strictPropertyInitialization = false in tsconfig.ts.
// the last construcor within the class is IMPLEMENTATION constructor, others are PUBLIC

class User {
    constructor();
    constructor(name: string);
    constructor(age: number);
    constructor(name: string, age: number);
    constructor(nameOrAge?: string | number, age?: number) {
        if (typeof nameOrAge === 'string') {
            this.name = nameOrAge;
        } else if (typeof nameOrAge === 'number') {
            this.age = nameOrAge;
        }
        if (typeof age === 'number') {
            this.age = age;
        }
    }

    name: string;
    age: number;
}

const myUser1 = new User('Alex');
console.log(myUser1);
myUser1.name = 'Olga';
console.log(myUser1);
const myUser2 = new User();
const myUser3 = new User(33);
const myUser4 = new User('Alex', 33);

// replace constructor with 
class Admin {
    roleId!: number;
}

const myAdmin1 = new Admin();
myAdmin1.roleId = 1;