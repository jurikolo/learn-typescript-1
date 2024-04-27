// Паттерн "Обзервер" (наблюдатель) широко применяется для реализации механизма подписки на события. Этот паттерн позволяет объектам подписываться на определенные события и реагировать на их наступление без постоянного опроса источника события.
// Допустим, вы имеете дело с системой обработки заявок. Когда приходит новая заявка (новый лид), необходимо автоматически создать запись в системе, оповестить соответствующих менеджеров и отправить уведомление клиенту. В традиционной схеме реализации это требует постоянного опроса источника новых заявок.
// Использование паттерна "Обзервер" позволяет реализовать систему подписки, где компоненты системы теперь могут подписаться на событие "Новая заявка" и быть уведомленными автоматически, без необходимости постоянного опроса.

interface Observer33 {
    update(subject: Subject33): void;
}

interface Subject33 {
    attach(observer: Observer33): void
    detach(observer: Observer33): void
    notify(): void
}

class Lead33 {
    constructor(public name: string, public phone: string) {}
}

class NewLead33 implements Subject33 {
    private observers: Observer33[] = [];
    public state: Lead33;

    attach(observer: Observer33): void {
        if (this.observers.includes(observer)) {
            return;
        }
        this.observers.push(observer);
    }
    detach(observer: Observer33): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return;
        }
        this.observers.splice(observerIndex, 1)
    }
    notify(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}

class NotificationService33 implements Observer33 {
    update(subject: Subject33): void {
        console.log('NotificationService33 received an update');
        console.log(subject);
    }
}

class LeadService33 implements Observer33 {
    update(subject: Subject33): void {
        console.log('LeadService33 received an update');
        console.log(subject);
    }
}

const subject33 = new NewLead33();
subject33.state = new Lead33('Johnny', '07012345');
const s1 = new NotificationService33();
const s2 = new LeadService33();

subject33.attach(s1);
subject33.attach(s2);
subject33.notify();
subject33.detach(s1);
subject33.notify();
