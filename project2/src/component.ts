export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;

        // id comes from app.css file
        if (newElementId)
            this.element.id = newElementId;

        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
        if (insertAtStart) {
            this.hostElement.insertAdjacentElement('afterbegin', this.element);
        } else {
            this.hostElement.insertAdjacentElement('beforeend', this.element);
        }
    }

    abstract configure(): void;
    abstract renderContent(): void;
}