import { IUserInputValidation } from './interfaces';
import { Validator } from './validator';

// autobind decorator
// underscores are used to inform TS the author is aware properties are never used
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

export class ProjectInput {
    private templateElement: HTMLTemplateElement;
    private hostElement: HTMLDivElement;
    private element: HTMLFormElement;
    private titleInputElement: HTMLInputElement;
    private descriptionInputElement: HTMLInputElement;
    private peopleInputElement: HTMLInputElement;

    constructor() {
        // id comes from index.html file
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as HTMLFormElement;

        // id comes from app.css file
        this.element.id = 'user-input';

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }

    private configure() {
        // this solution is replaced by @autobind decorator on submitHandler method
        //this.element.addEventListener('submit', this.submitHandler.bind(this));

        this.element.addEventListener('submit', this.submitHandler);
    }

    private gatherUserInput(): [string, string, number] | void {
        const validator = new Validator();
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: IUserInputValidation = {
            value: enteredTitle,
            required: true,
            minLength: 5
        }
        const descriptionValidatable: IUserInputValidation = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }
        const peopleValidatable: IUserInputValidation = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 10
        }

        if (!validator.validateUserInput(titleValidatable) || !validator.validateUserInput(descriptionValidatable) || !validator.validateUserInput(peopleValidatable)) {
            alert('Invalid input, please try again');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearUserInput() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
        }
        this.clearUserInput();
    }

    public exec() {
        this.configure();
        this.attach();
    }
}