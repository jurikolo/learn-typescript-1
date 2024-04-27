import * as serverResponseTypes from "./serverResponseTypes";

interface User7 {
    name: string;
    email: string;
    login: string;
}

interface Admin7 {
    name: string;
    roleId: number;
}

const user9: User7 = {
    name: 'Barbada',
    email: 'barbada@barbada.com',
    login: 'barbada'
}

function logId3(id: string | number) {
    if (typeof id === 'string') {
        console.log(id);
    } else if (typeof id === 'number') {
        console.log(id);
    }
    id // type is again string or number
}

function isString2(x: string | number): x is string {
    return typeof x === 'string';
}

function logId4(id: string | number) {
    if (isString2(id)) {
        console.log(id);
    } else if (typeof id === 'number') {
        console.log(id);
    }
    id // type is again string or number
}

function isAdmin(user: User7 | Admin7): user is Admin7 {
    return 'role' in user;
}


function isAdmin2(user: User7 | Admin7): user is Admin7 {
    return (user as Admin7).roleId !== undefined;
}

function setRole1(user: User7 | Admin7) {
    if (isAdmin(user)) {
        user.roleId = 0;
    } else {
        throw new Error('User is not an admin')
    }
}
