function generateError(message: string): never {
    throw new Error(message);
}

function dumpError(): never {
    while (true) {}
}

function recursion(): never {
    recursion();
}

type paymentAction = 'refund' | 'checkout';
// type paymentAction = 'refund' | 'checkout' | 'reject'; // this will cause type error, as "never" variable will be reached
function processAction(action: paymentAction) {
    switch (action) {
        case 'refund':
            //...
            break;
        case 'checkout':
            //...
            break;
        default:
            const _: never = action;
            throw new Error('Invalidaction');
    }
}

function isString(x: string | number): boolean {
    if (typeof x === 'string') {
        return true;
    } else if (typeof x === 'number') {
        return false;
    }
    generateError('dummy'); // without this error there is theoretical possibility `undefined` type will be returned.
}