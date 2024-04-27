abstract class AbstractController {
    abstract handle(req: any): void

    handleWithLogs(req: any): void {
        console.log('Start');
        this.handle(req);
        console.log('End');
    }
}

class AbstractControllerImpl {
    handle(req: any): void {
        console.log(req);
    }
}

// new AbstractController() // not allowed
new AbstractControllerImpl()

// -----
// TASK
abstract class AbstractLogger {
    abstract log(message: string): void

    printDate() {
        this.log(new Date().toString());
    }
}

class AbstractLoggerImpl extends AbstractLogger {
    log(message: string) {
        console.log(message);
    }

    logWithDate(message: string) {
        this.printDate();
        this.log(message);
    }
}