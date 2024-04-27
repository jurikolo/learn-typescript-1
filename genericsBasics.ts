const myGeneric: Array<number> = [1, 2, 3];

async function genericFunction() {
    const a = await new Promise<number>((resolve, reject) => {
        resolve(1);
    });
}

const myRecord: Record<string, boolean> = {
    prop1: true,
    prop2: false
}

// -----
// let's write some function
function logMiddleware<T>(data: T): T {
    console.log(data);
    return data;
}

const middlewareResult = logMiddleware(7); // middlewareResult will be type of incoming object, in this case - 7
const middlewareResult2 = logMiddleware<number>(7) // middlewareResult2 will be type of number
const middlewareResult3 = logMiddleware<string>('7') // middlewareResult2 will be type of string

function getHalfOfArray<T>(data: Array<T>): Array<T> {
    const l = data.length / 2;
    return data.splice(0, l);
}

getHalfOfArray([1, 2, 3]);
getHalfOfArray<number>([1, 2, 3]);

// -----
// my toString function using generics
function genericToString<T>(input: T): string | undefined {
    if (Array.isArray(input)) {
        return input.toString();
    }
    switch (typeof input) {
        case 'string':
            return input;
        case 'number':
        case 'bigint':
        case 'boolean':
        case 'function':
            return input.toString();
        case 'object':
            return JSON.stringify(input);
        default: undefined;
    }
}

console.log(genericToString('asdf'));
console.log(genericToString(777));
console.log(genericToString(getHalfOfArray([1, 2, 3, 4, 5])));
console.log(genericToString({"foo": "bar"}));

// describe type of generic function
const splitType: <T>(input: Array<T>) => Array<T> = getHalfOfArray;
const genericToStringType: <T>(input: T) => string | undefined = genericToString;

type LogLineType<T> = {
    timeStamp: Date,
    data: T
}

interface ILogLine<T> {
    timeStamp: Date,
    data: T
}

const logLine: ILogLine<{ a: number}> = {
    timeStamp: new Date(),
    data: {
        a : 1
    }
}

const logLine2: LogLineType<{ a: number}> = {
    timeStamp: new Date(),
    data: {
        a : 1
    }
}

// -----
// Limitations
class GenericVehicle {
    run: number;
}

class GenericSUV extends GenericVehicle {
    clearance: number;
}

function genericKmToMiles<T extends GenericVehicle>(input: T): T {
    input.run = input.run / 0.62;
    return input;
}

const genericVehicle = genericKmToMiles(new GenericVehicle());
const genericSuv = genericKmToMiles(new GenericSUV());
genericKmToMiles( {run: 42});

function genericsFunc<T extends string | number, Y>(input1: T, input2: Y): {input1: T, result2: Y} {
    return { input1, result2: input2}
}

// -----
// self-check, write a generic function that sorts random object by it's ID
const genericObject = [
    { id: 1, name: "John"},
    { id: 3, lastname: "Jokerov"},
    { id: 2, foo: "bar"}
]

interface ID {
    id: number
}

function genericSortById<T extends ID>(input: T[], sorting: "asc" | "desc"): T[] {
    if (sorting === "asc") {
        return input.sort((a, b) => a.id - b.id);
    } else {
        return input.sort((a, b) => b.id - a.id);
    }
}

console.log(genericSortById(genericObject, "asc"));
console.log(genericSortById(genericObject, "desc"));

// -----
// Conditional types
interface IHttpResponse2<T extends 'success' | 'failure'> {
    code: number,
    data: T extends 'success' ? string : Error,
    data2: T extends 'success' ? string : number
}

const success2: IHttpResponse2<'success'> = {
    code: 200,
    data: 'success',
    data2: 'success2'
}

const error2: IHttpResponse2<'failure'> = {
    code: 404,
    data: Error(),
    data2: 100500
}

// -----

class User14 {
    id: number
}

class PersistentUser14 extends User14 {
    dbId: string
}

type UserOrPersistentUser14<T extends string | number> = T extends number ? User14 : PersistentUser14

function getUser14<T extends string | number>(id: T): UserOrPersistentUser14<T> {
    if (typeof id === 'number') {
        return new User14() as UserOrPersistentUser14<T>;
    } else {
        return new PersistentUser14()
    }
}

// -----
// INFER - retrieve a fake type 
type GetFirstArg<T> = T extends (first: infer First, ... args: any[]) => any ? First : never;

function runTransaction(transaction: {
    fromTo: [string, string]
}) {
    console.log(transaction);
}

const transaction: GetFirstArg<typeof runTransaction> = {
    fromTo: ['1', '2']
}

runTransaction(transaction);

// -----
// Mapped types
type Modifier = 'read' | 'update' | 'create';

type UserRoles15 = {
    customers?: Modifier,
    projects?: Modifier,
    adminPanel?: Modifier
}

type ModifierToAccess<Type> = {
    [Property in keyof Type] : boolean;
}

type ModifierToAccess2<Type> = {
    + readonly [Property in keyof Type as `canAccess${string & Property}`]-? : boolean; // makes fields readonly, then renames and then makes mandatory (- sign)
}

type UserAccess15 = ModifierToAccess<UserRoles15>; // hover on UserAccess15 and see type resources
type UserAccess16 = ModifierToAccess2<UserRoles15>; // hover on UserAccess15 and see type resources

// same topic, task to create type for form validation
interface IForm15 {
    name: string,
    password: string
}

const form15: IForm15 = {
    name: 'Johnny',
    password: '123'
}

const formValidation: FormValidation<IForm15> = {
    name: { isValid: true },
    password: { isValid: false, errorMessage: 'Password should be at least 5 characters' }
}

type FormValidation<T> = {
    [K in keyof T]: {
        isValid: true
    } | {
        isValid: false,
        errorMessage: string
    }
}

// -----
// Template Literal Types
type ReadOrWrite16 = 'read' | 'write';
type Bulk16 = 'bulk' | '';

type Access16 = `can${Uppercase<ReadOrWrite16>}${Capitalize<Bulk16>}`; // hover on type