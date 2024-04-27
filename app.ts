function getFullName(userEntity: {firstname: string, lastname: string}): string {
    return `${userEntity.firstname} ${userEntity.lastname}`;
}

const user = {
    firstname: 'Jurijs',
    lastname: 'Kolomijecs',
    city: 'Nacka',
    age: 31
};

// console.log(getFullName(user));

// -----
// ARRAY
const skills: string[] = ['Dev', 'DevOps', 'Testing', 'Ops'];

for(const skill of skills) {
    console.log(skill)
}

const result = skills
.filter((s: string) => s !== 'DevOps')
.map(s => s + '! ')
.reduce((a, b) => a + b);
console.log(result);

// -----
// TUPLE
const myTuple: [number, string] = [1, 'Dev'];
const myId = myTuple[0];
const myName = myTuple[1];
console.log(myId, myName);

const [myId2, myName2] = myTuple;
console.log(myId2, myName2);

const spreadArray: [number, string, ...boolean[]] = [1, 'a', true, false, true];

// -----
// READONLY
const myTuple2: readonly [number, string] = [42, 'ololo'];
const myArray2: readonly string[] = ['a', 'b', 'c'];
const myArray3: ReadonlyArray<string> = ['a', 'b', 'c'];
const myArray4: ReadonlyArray<string> = ['a', 'b', 'c'];

myArray2 === myArray3 ? console.log('Arrays are equal') : console.log('Arrays not equal'); // arrays not equal
myArray4 === myArray3 ? console.log('Arrays are equal') : console.log('Arrays not equal'); // arrays not equal

// -----
// ENUM
enum myEnum {
    SUCCESS = 200,
    IN_PROGRESS = 'progress',
    FAILED = 400
}

const enum myEnum2 {
    SUCCESS = 200,
    IN_PROGRESS = 'progress',
    FAILED = 400
}

const result2 = {
    message: 'success',
    statusCode: myEnum.SUCCESS
}

result2.statusCode === myEnum.SUCCESS ? console.log('a') : console.log('b');

function myFunction(status: myEnum) {

}

myFunction(myEnum.SUCCESS);
myFunction(200);
// myFunction('progress'); // fails

// -----
// UNION
function logId(id: string | number) {
    if (typeof id === 'string') {
        // now we have access to String functions
        console.log(id.toUpperCase());   
    } else {
        // now we have access to Number functions
        console.log(id.toString());
    }
}
logId(1);
logId('asdf');

function logError(err: string | string[]) {
    if (Array.isArray(err)) {
        for (var index in err) {
            console.log(err[index]);
        }
    } else {
        console.log(err.toLocaleUpperCase());
    }
}

logError(['a', 'b']);
logError('asdfghj');

function logObject(obj: { a: number} | { b: number }) {
    if('a' in obj) {
        console.log(obj.a);
    } else {
        console.log(obj.b);
    }
}

function logMultipleIds(a: string | number, b: string | boolean) {
    if (a === b) {
        // both are strings
    } else {
        console.log(a.toString());
    }
}

// -----
// LITERAL TYPE
function fetchWithAuth(url: string, method: 'post' | 'get'): 1 | -1 {
    if (method === 'post') {
        return 1;
    }
    return -1;
}
let method1 = 'post';
const method2 = 'post';
// fetchWithAuth('https://whatever', method1); // won't work since method1 is STRING
fetchWithAuth('https://whatever', method2);
fetchWithAuth('https://whatever', method1 as 'post');

// -----
// TYPE ALIAS
type httpMethod = 'post' | 'get';
function fetchWithAuth2(url: string, method: httpMethod): 1 | -1 {
    if (method === 'post') {
        return 1;
    }
    return -1;
}

type User2 = {
    name: string,
    age: number,
    skills: string[]
}

let user2: User2 = {
    name: 'vasya',
    age: 42,
    skills: ['heavy punch', 'lowkick']
}

type Role2 = {
    name: string
    role: string
}

// this way we will lose name variable of Role2 object
type UserWithRole = User2 & Role2;

let user3: UserWithRole = {
    name: 'vasya',
    age: 42,
    skills: ['heavy punch', 'lowkick'],
    role: 'boss'
}

type UserWithRole2 = {
    user: User2,
    role: Role2
}

let user4: UserWithRole2 = {
    user: {
        name: 'vasya',
        age: 42,
        skills: ['heavy punch', 'lowkick']
    },
    role: {
        name: 'roleName',
        role: 'boss'
    }
}

// -----
// Interfaces
interface User3 {
    name: string,
    age: number,
    skills: string[]

    log: (id: number) => string;
}

interface Role3 {
    roleId: number
}

let user5: User3 = {
    name: 'vasya',
    age: 42,
    skills: ['heavy punch', 'lowkick'],

    log(id) {
        return '';
    },
}

interface UserWithRole3 extends User3 {
    roleId: number
}
// or
interface UserWithRole4 extends User3, Role3 { }

interface UserDictIface {
    [index: number]: User3
}
// or similar with types
type UserDictType = {
    [index: number]: User3
}

// -----
// OPTIONAL
interface User4 {
    login: string,
    password?: string
}

const user6: User4 = {
    login: "username@website.com"
}

function multiply(first: number, second?: number): number {
    if (!second) {
        return first * first;
    }
    return first * second;
}

interface User5 {
    login: string,
    password?: {
        type: 'primary' | 'secondary'
    }
}

function testPass(user: User5) {
    const t = user.password?.type; // assign optional variable
    const t2 = user.password!.type // here we kinda say we know that the type will be there
    const t3 = user.password ? user.password.type : undefined // old-fashion javascript like assignment
}

function testUndefined(param?: number) {
    const t = param ?? multiply(5); // if param is absent or undefined, t will get result of multiply(5) function
}

// -----
// VOID
function logId2(id: string | number): void {
    if (typeof id === 'string') {
        // now we have access to String functions
        console.log(id.toUpperCase());   
    } else {
        // now we have access to Number functions
        console.log(id.toString());
    }
}

const logIdDva = logId2("a"); // has VOID type

function multiply2(first: number, second?: number): number | void {
    if (!second) {
        return first * first;
    }
}

type voidFunction = () => void; // simple type that returns void
const f01: voidFunction = () => {};
const f02: voidFunction = () => {
    return true;
}

const b = f02(); // is void type, although function kinda returns boolean

const skills2 = ['Dev', 'Ops', 'DevOps'];
const user7 = {
    s: ['']
}

skills2.forEach((skill) => user7.s.push(skill));
console.log(user7.s);
