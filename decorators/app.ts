// This is class decorator
// It's executed before the class is instantiated and will kick-off even if no classes are instantiated
function Logger(target: Function) {
    console.log('Logging...');
    console.log(target);
}

// This is factory function, allows to customize information per class
function FactoryLogger(className: string) {
    return function (target: Function) {
        console.log(className);
        console.log(target);
    }
}

@Logger
@FactoryLogger('Person class')
class Person {
    name = 'Aloy';

    constructor() {
        console.log('Creating person object...');
    }
}

const pers1 = new Person();
console.log(pers1);

const pers2 = new Person();
console.log(pers2);