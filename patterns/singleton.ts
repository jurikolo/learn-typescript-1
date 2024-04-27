class MySingleton {
    private static instance: MySingleton;

    map: Map<number, string> = new Map();

    private constructor() {}

    public static get(): MySingleton {
        if (!MySingleton.instance) {
            MySingleton.instance = new MySingleton();
        }
        return MySingleton.instance;
    }

    clean() {
        this.map = new Map();
    }
}

class MySingletonService1 {
    addMap(key: number, value: string) {
        const mySingleton = MySingleton.get();
        mySingleton.map.set(key, value);
    }
}

class MySingletonService2 {
    getKeys(key: number) {
        const mySingleton = MySingleton.get();
        console.log(mySingleton.map.get(key));
        mySingleton.clean();
        console.log(mySingleton.map.get(key));
    }
}

new MySingletonService1().addMap(1, 'Works');
new MySingletonService2().getKeys(1);
