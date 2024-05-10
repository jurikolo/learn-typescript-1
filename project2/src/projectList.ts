import { autobind } from './autobind.decorator';
import { Component } from './component';
import { DragTarget } from './interfaces';
import { Project } from './project';
import { ProjectItem } from './projectItem';
import { ProjectState } from './projectState';
import { ProjectStatus } from './projectStatus.enum';

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @autobind
    dragOverHandler(_: DragEvent): void {
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.add('droppable');
    }

    dropHandler(_: DragEvent): void {

    }

    @autobind
    dropLeaveHandler(_: DragEvent): void {
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.remove('droppable');
    }

    configure(): void {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dropLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);

        const projectState = ProjectState.getInstance();
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(prj => {
                if (this.type === 'active')
                    return prj.status === ProjectStatus.Active;
                return prj.status === ProjectStatus.Finished;
            })
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });

    }

    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }

    private renderProjects() {
        const listElement = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listElement.innerHTML = '';
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
        }
    }
}
