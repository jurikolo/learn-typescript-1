class DocumentItem {
    public text: string;
    private state: DocumentItemState;

    constructor() {
        this.setState(new DraftDocumentItemState());
    }

    getState() {
        return this.state;
    }

    setState(state: DocumentItemState) {
        this.state = state;
        this.state.setContext(this);
    }

    publish() {
        this.state.publish();
    }
    delete() {
        this.state.delete();
    }
}

abstract class DocumentItemState {
    public name: string;
    public item: DocumentItem;

    public setContext(item: DocumentItem) {
        this.item = item;
    }

    public abstract publish(): void;
    public abstract delete(): void;
}

class DraftDocumentItemState extends DocumentItemState {
    constructor() {
        super();
        this.name = 'DraftDocument';
    }

    public publish(): void {
        console.log(`Article is being published: ${this.name}`);
        this.item.setState(new PublishDocumentItemState());
    }
    
    public delete(): void {
        console.log(`Article is removed: ${this.name}`);
    }
}

class PublishDocumentItemState extends DocumentItemState {
    constructor() {
        super();
        this.name = 'PublishDocument';
    }

    public publish(): void {
        console.log('Cannot publish published document');
    }

    public delete(): void {
        console.log('Article is being sent to drafts');
        this.item.setState(new DraftDocumentItemState());
    }
}

const item30 = new DocumentItem();
item30.text = 'My article';
console.log(item30.getState());
item30.publish()
console.log(item30.getState());
item30.publish()
item30.delete()
console.log(item30.getState());