interface IProvider {
    sendMessage(message: string): void;
    connect(config: unknown): void;
    disconnect(): void;
}

class TelegramProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message);
    }
    connect<T>(config: T): void {
        console.log(config);
    }
    disconnect(): void {
        console.log("TG disconnected");
    }
}

class WhatsappProvider implements IProvider {
    sendMessage(message: string): void {
        console.log(message);
    }
    connect<T>(config: T): void {
        console.log(config);
    }
    disconnect(): void {
        console.log("WA disconnected");
    }
}

class NotificationSender {
    constructor(private provider: IProvider) {}
    send() {
        this.provider.connect('connect');
        this.provider.sendMessage('message');
        this.provider.disconnect();
    }
}

class DelayedNotificationSender extends NotificationSender {
    constructor(provider: IProvider) {
        super(provider);
    }
    sendDelayed() {
        
    }
}

const senderTG = new NotificationSender(new TelegramProvider());
senderTG.send();
const senderWA = new NotificationSender(new WhatsappProvider());
senderWA.send()