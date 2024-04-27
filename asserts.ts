interface User8 {
    name: string
}

function assertUser(obj: unknown): asserts obj is User8 {
    if (typeof obj === 'object' && !!obj && 'name' in obj) {
        return;
    }
    throw new Error('Not a user');
}

const user10 = {}
assertUser(user10);
user10.name = 'a';
