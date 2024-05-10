import { IUserInputValidation } from './interfaces';
import { Validator } from './validator';
import { ProjectState } from './projectState';
import { Component } from './component';
import { autobind } from './autobind.decorator';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    private titleInputElement: HTMLInputElement;
    private descriptionInputElement: HTMLInputElement;
    private peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    renderContent(): void { }

    configure() {
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
            const projectState = ProjectState.getInstance();
            projectState.addProject(title, description, people);
            console.log(title, description, people);
        }
        this.clearUserInput();
    }

    public exec() { }
}