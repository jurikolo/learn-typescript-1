class KeyValueDatabase {
    private db: Map<string, string> = new Map();
    save(key: string, value: string) {
        this.db.set(key, value);
    }
}

class PersistentDatabase {
    savePersistent(_: Object) {
        //
    }
}

class PersistentDatabaseAdapter extends KeyValueDatabase {
    constructor(public database: PersistentDatabase) {
        super();
    }

    override save(key: string, value: string): void {
        this.database.savePersistent({key, value});
    }
}

function run(base: KeyValueDatabase) {
    base.save('key', 'value');
}

run(new PersistentDatabaseAdapter(new PersistentDatabase));