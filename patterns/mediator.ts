interface IMediator2 {
    notify(sender: string, event: string): void;
}

abstract class Mediated2 {
    mediator: IMediator2;
    setMediator(mediator: IMediator2) {
        this.mediator = mediator;
    }
}

class Notification2 {
    send() {
        console.log('Sending notification');
    }
}

class Log2 {
    log(message: string): void {
        console.log(message);
    } 
}

class EventHandler2 extends Mediated2 {
    myEvent() {
        this.mediator.notify('EventHandler2', 'myEvent');
    }
}

class NotificationMediator2 implements IMediator2 {
    constructor(
        public notification: Notification2,
        public logger: Log2,
        public eventHandler: EventHandler2
    ) {}
    notify(sender: string, event: string): void {
        switch(event) {
            case 'myEvent':
                this.notification.send();
                this.logger.log('sent');
                break;
        }
    }
}

const handler = new EventHandler2();
const logger = new Log2();
const notification = new Notification2();

const mediator = new NotificationMediator2(
    notification, logger, handler
);

handler.setMediator(mediator);

handler.myEvent(); 