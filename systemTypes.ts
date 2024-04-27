// partial / required / readonly
interface User17 {
    name: string,
    age?: number,
    email: string
}

type MyPartialType17 = Partial<User17>; // makes all parameters optional
const myPartialObject17: MyPartialType17 = {}; // allows to define empty object

type MyRequiredType17 = Required<User17>; // makes all parameters mandatory
type MyReadonlyType17 = Readonly<User17>; // makes all parameters readonly

// -----
// pick / omit / extract / exclude
interface PaymentPersistent17 {
    id: number,
    amount: number,
    from: string,
    to: string
}

type PaymentWithoutId17 = Omit<PaymentPersistent17, 'id'>;
type PaymentWithFromAndTo17 = Pick<PaymentPersistent17, 'from' | 'to'>;

type ExtractExample = Extract<'sample' | 'bample' | PaymentWithoutId17, string>; // here we pick only STRING type parameters
type ExcludeExample = Exclude<'sample' | 'bample' | PaymentWithoutId17, string>; // here we pick only non-string parameters

// -----
// ReturnType, Parameters, ConstructorParameters
class User18 {
    constructor(public id: number, public name: string) {

    }
}

function getData18(id: number): User18 {
    return new User18(id, 'Johnny');
}

type ReturnType18 = ReturnType<typeof getData18>;

type ParameterType18 = Parameters<typeof getData18>; // list of number
type FirstType18 = ParameterType18[0]; // exact type of first parameter
type Parameter2Type18 = Parameters<<T>() => T>; // unknown

type ConstructorParameters18 = ConstructorParameters<typeof User18>;

// -----
// Awaited
type A19 = Awaited<Promise<string>>;
type A192 = Awaited<Promise<Promise<string>>>;

interface IMenu18 {
    name: string,
    confirm: boolean
}

async function getMenu18(): Promise<IMenu18[]> {
    return [{name: 'Johnny', confirm: true}];
}

type getMenu18ReturnType = Awaited<ReturnType<typeof getMenu18>>;