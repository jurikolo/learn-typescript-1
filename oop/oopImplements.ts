interface ILogger {
    log(...args: any[]): void;
    error(...args: any[]): void;
}

class Logger implements ILogger {
    log(...args: any[]): void {
        console.log(...args);
    }
    async error(...args: any[]): Promise<void> {
        throw new Error('Method not implemented.');
    }
    

}