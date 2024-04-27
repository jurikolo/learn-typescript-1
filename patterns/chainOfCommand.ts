interface IMiddleware {
    next(middleware: IMiddleware): IMiddleware;
    handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
    private nextMiddleware: IMiddleware;
    
    next(middleware: IMiddleware): IMiddleware {
        this.nextMiddleware = middleware;
        return middleware;
    }

    handle(request: any) {
        if (this.nextMiddleware) {
            return this.nextMiddleware.handle(request);
        }
        return;
    }
}

class AuthMiddleware extends AbstractMiddleware {
    override handle(request: any): any {
        console.log('AuthMiddleware');
        if (request.userId === 1) {
            return super.handle(request);
        }
        return { error: 'Not authorized' };
    }
}

class ValidationMiddleware extends AbstractMiddleware {
    override handle(request: any): any {
        console.log('ValidationMiddleware');
        if (request.body) {
            return super.handle(request);
        }
        return { error: 'Validation failed' };
    }
}

class Controller extends AbstractMiddleware {
    override handle(request: any): any {
        console.log('Controller');
        return { success: request };
    }
}

const controller = new Controller();
const validation = new ValidationMiddleware();
const auth = new AuthMiddleware();

auth.next(validation).next(controller);

console.log(auth.handle({
    userId: 3
}));

console.log();
console.log(auth.handle({
    userId: 1
}));

console.log();
console.log(auth.handle({
    userId: 1,
    body: {
        foo: 'bar'
    }
}));
