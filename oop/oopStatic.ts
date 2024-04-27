class MyStaticClass {
    public id: number;
    public static staticName: string = 'aaa';
}

class MyStaticClass2 extends MyStaticClass {
    public static staticName: string;
}

console.log("MyStaticClass: " + MyStaticClass.staticName);
console.log("MyStaticClass2: " + MyStaticClass2.staticName);
const myStaticClass1 = new MyStaticClass;
myStaticClass1.id = 1;
MyStaticClass.staticName = 'bbb';
console.log("MyStaticClass: " + MyStaticClass.staticName);
console.log("MyStaticClass2: " + MyStaticClass2.staticName);
const myStaticClass2 = new MyStaticClass;
myStaticClass2.id = 2;
MyStaticClass.staticName = 'ccc';
console.log("MyStaticClass: " + MyStaticClass.staticName);
console.log("MyStaticClass2: " + MyStaticClass2.staticName);
MyStaticClass2.staticName = 'ddd';
console.log("MyStaticClass: " + MyStaticClass.staticName);
console.log("MyStaticClass2: " + MyStaticClass2.staticName);
