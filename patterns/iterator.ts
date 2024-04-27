// Паттерн Итератор предназначен для унифицированного обхода различных структур данных. Он важен, когда нужно пройтись по коллекции разными способами.
// Пример задачи: Управление задачами с разным приоритетом и уровнями зависимости между задачами. Необходимость обхода задач по приоритету или от верхнего уровня к нижнему и обратно.7
// Решение: Создание интерфейса итератора, который позволяет перемещаться по элементам коллекции (получение следующего, предыдущего элемента, текущее положение, и т.д.)

class Task32 {
    constructor(public priority: number) {}
}

class TaskList32 {
    private tasks: Task32[] = [];
    
    public sortByPriority() {
        this.tasks = this.tasks.sort((a, b) => {
            if (a.priority > b.priority) {
                return 1;
            } else if (a.priority === b.priority) {
                return 0;
            } else {
                return -1;
            }
        })
    }

    public addTask(task: Task32): void {
        this.tasks.push(task);
    }

    public getTasks(): Task32[] {
        return this.tasks;
    }

    public count(): number {
        return this.tasks.length;
    }

    public getIterator(): PriorityTaskIterator32 {
        return new PriorityTaskIterator32(this);
    }
}

interface IIterator32<T> {
    current(): T | undefined;
    next(): T | undefined;
    previous(): T | undefined;
    index(): number;
}

class PriorityTaskIterator32 implements IIterator32<Task32> {
    private position: number = 0;
    private taskList: TaskList32;

    constructor(taskList: TaskList32) {
        this.taskList.sortByPriority();
        this.taskList = taskList;
    }
    
    current(): Task32 | undefined {
        return this.taskList.getTasks()[this.position];
    }

    index(): number {
        return this.position;
    }

    next(): Task32 | undefined {
        this.position += 1;
        return this.taskList.getTasks()[this.position];
    }

    previous(): Task32 | undefined {
        this.position -= 1;
        return this.taskList.getTasks()[this.position];
    }
}

const taskList = new TaskList32();
taskList.addTask(new Task32(8));
taskList.addTask(new Task32(1));
taskList.addTask(new Task32(3));
const iterator = taskList.getIterator();
console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.previous());
console.log(iterator.index());