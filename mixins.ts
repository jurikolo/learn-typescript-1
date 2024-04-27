type Constructor = new (...args: any[]) => {};
type GenericConstructor<T = {}> = new (...args: any[]) => T;

class List {
    constructor(public items: string[]) {}
}

type ListType = GenericConstructor<List>;

// default implementation
class ExtendedListClass extends List {
    first() {
        return this.items[0];
    }
}

// mixin implementation
function ExtendedListFunction<TBase extends ListType>(Base: TBase) {
    return class ExtendedList extends Base {
        first() {
            return this.items[0];
        }
    }
}

const list = ExtendedListFunction(List);
const mixinResult = new list(['first', 'second', 'third']);
console.log(mixinResult.first());

// now what's the purpose of mixin?
class Accordeon {
    isOpened: boolean;
}

type AccordeonType = GenericConstructor<Accordeon>;

function ExtendedListFunction2<TBase extends ListType & AccordeonType>(Base: TBase) {
    return class ExtendedList extends Base {
        first() {
            console.log(this.isOpened); // now it's possible to use parameters from both types!!!
            return this.items[0];
        }
    }
}

class AccordeonList {
    isOpened: boolean;
    constructor(public items: string[]) {}
}

const list2 = ExtendedListFunction2(AccordeonList);
const mixinResult2 = new list2(['first', 'second', 'third']);
console.log(mixinResult2.isOpened); // voila, we can access both isOpened properly and first function