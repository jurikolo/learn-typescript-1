class User31 {
    githubToken: string;
    jwtToken: string;
}

interface AuthStrategy31 {
    auth(user: User31): boolean;
}

class Auth {
    constructor(private strategy: AuthStrategy31) {}

    setStrategy(strategy: AuthStrategy31) {
        this.strategy = strategy;
    }

    public authUser(user: User31): boolean {
        return this.strategy.auth(user);
    }
}

class JwtStrategy31 implements AuthStrategy31 {
    auth(user: User31): boolean {
        if(user.jwtToken) {
            return true;
        }
        return false;
    }
}

class GithubStrategy31 implements AuthStrategy31 {
    auth(user: User31): boolean {
        if(user.githubToken) {
            return true;
        }
        return false;
    }
}

const user31 = new User31();
user31.jwtToken = 'asdf';
const auth31 = new Auth(new JwtStrategy31());
console.log(auth31.authUser(user31));
auth31.setStrategy(new GithubStrategy31());
console.log(auth31.authUser(user31));
