class Notify10 {
    send(template: string, to: string) {
        console.log(`Sending ${template} to ${to}`);
    }

}

class Log10 {
    log(message: string) {
        console.log(message);
    }
}

class Template10 {
    private templates = [
        {name: "template1", template: "<h1>Template 1</h1>"}
    ];

    getByName(name: string) {
        return this.templates.find(t => t.name === name);
    }
}

class NotificationFacade10 {
    private notify: Notify10;
    private logger: Log10;
    private template: Template10;

    constructor() {
        this.notify = new Notify10();
        this.logger = new Log10();
        this.template = new Template10();
    }

    send(to: string, templateName: string) {
        const data = this.template.getByName(templateName);
        if (!data) {
            this.logger.log('Template not found!')
            return;
        }
        this.notify.send(data.template, to);
        this.logger.log('Template sent');
    }
}

const notification10 = new NotificationFacade10();
notification10.send('incognito@smth.xxx', 'template1');