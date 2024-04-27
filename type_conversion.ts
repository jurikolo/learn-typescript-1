let a2 = 5;
let b2: string = a2.toString();

let c2 = 'asdf';
let d2: number = +c2;
let e2: number = parseInt(c2);
let f2 = String(a2); // object
let g2: string = new String(a2).valueOf();

interface User6 {
    name: string;
    email: string;
    login: string;
}

const user8: User6 = {
    name: 'Barbada',
    email: 'barbada@barbada.com',
    login: 'barbada'
}

interface Admin {
    name: string;
    roleId: number;
}

const admin: Admin = {
    ...user8,
    roleId: 1
}

function userToAdmin(user: User6): Admin {
    return {
        name: user.name,
        roleId: 1
    }
}