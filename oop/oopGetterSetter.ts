class UserGetSet {
    _login: string;
    password: string;

    set login(l: string) {
        this._login = 'custom-prefix-' + l;
    }

    get login() {
        return 'dummy';
    }
}

const userGetSet = new UserGetSet();
userGetSet._login = 'a';
// userGetSet.login = 'test';
console.log(userGetSet);