const n: null = null;
const n1: any = null;
// const n2: number = null; // not allowed when strictNullChecks = true
// const n3: string = null; // not allowed when strictNullChecks = true
// const n4: boolean = null; // not allowed when strictNullChecks = true
// const n5: undefined = null; // not allowed when strictNullChecks = true

interface User {
    name: string
}

function getUser() {
    if (Math.random() > 0.5) {
        return null;
    } else {
        return {
            name: 'Gurkul'
        } as User;
    }
}

const user1 = getUser();
if (user1) {
    const name1 = user1.name;
}