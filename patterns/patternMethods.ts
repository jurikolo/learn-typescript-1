// Паттерн "Шаблонный метод" используется для определения скелета алгоритма, допуская отдельные шаги алгоритма быть изменены подклассами. Это позволяет переиспользовать код и избегать дублирования.
// Рассмотрим ситуацию, где у нас есть форма, которую необходимо отправить через несколько разных API. Подход без паттерна потребовал бы дублирования кода для каждого API.

class Form33 {
    constructor(public name: string) {}
}

abstract class SaveForm33<T> {
    // this is our pattern method
    public save(form: Form33) {
        const result = this.fill(form);
        this.log(result);
        this.send(result);
    }

    protected abstract fill(form: Form33): T;

    protected log(data: T): void {
        console.log(data);
    }

    protected abstract send(data: T): void;
}

class FirstAPI33 extends SaveForm33<string> {
    protected fill(form: Form33): string {
        return form.name;
    }

    protected send(data: string): void {
        console.log(`Sending ${data}`);
    }
}

class SecondAPI33 extends SaveForm33<{ foo: string }> {
    protected fill(form: Form33): { foo: string } {
        return { foo: form.name };
    }

    protected send(data: { foo: string}): void {
        console.log(`Sending ${data}`);
    }
}

const form1 = new FirstAPI33();
form1.save(new Form33('Johan'));

const form2 = new SecondAPI33();
form2.save(new Form33('Johan'));
