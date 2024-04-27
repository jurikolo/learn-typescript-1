// keyof
interface IUser11 {
    name: string,
    age: number
}

type KeysOfUser11 = keyof IUser11;

const key: KeysOfUser11 = 'age'; // can be name or age

function getValue11<T, K extends keyof T>(obj: T, key: K) { // the magic is here!
    return obj[key];
}

const user11: IUser11 = {
    name: 'John',
    age: 100500
};

const userName11 = getValue11(user11, 'name');

// -----
// typeof
let strOrNum: string | number = 'aaa';
let strOrNum2: typeof strOrNum;

const user12 = {
    name: 'Johnny'
}

type keyOfUser12 = keyof typeof user12;

enum Direction {
    Up,
    Down
}

type dir12 = keyof typeof Direction;

// -----
// Indexed access types

interface IRole13 {
    name: string;
}

interface IUser13 {
    name: string;
    roles: IRole13[];
}

const user13: IUser13 = {
    name: 'Johnny',
    roles: []
}

const nameUser13 = user13['name'];
const roleNames = 'roles';

type rolesType = IUser13['roles'];
type rolesType2 = IUser13[typeof roleNames];

type roleType = IUser13['roles'][number]; // reference all object entries

const roles13 = ['admin', 'user', 'poweruser'] as const;
type roleTypes3 = typeof roles13[number];


// -----
// TASK: grouping function
interface ITaskData {
    group: number,
    name: string
}

const taskData: ITaskData[] = [
    { group: 1, name: 'a'},
    { group: 1, name: 'b'},
    { group: 2, name: 'c'}
]

interface IGroupTask<T> {
    [key: string]: T[];
}

type keyTask = string | number | symbol;

function taskGroup<T extends Record<keyTask, any>>(data: T[], key: keyof T): IGroupTask<T> {
    return data.reduce<IGroupTask<T>>((map: IGroupTask<T>, item) => {
        const itemKey = item[key];
        let currentElement = map[itemKey];
        if (Array.isArray(currentElement)) {
            currentElement.push(item);
        } else {
            currentElement = [item];
        }
        map[itemKey] = currentElement;
        return map;
    }, {})
}

console.log(taskGroup<ITaskData>(taskData, 'group'));
// console.log(taskGroup(taskData, 2));

console.log('aaa');