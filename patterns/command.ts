class User30 {
    constructor(public userId: number) {}
}

class UserService30 {
    save(user: User30) {
        console.log(`Saving user with id: ${user.userId}`);
    }
    delete(userId: number) {
        console.log(`Removing user with id: ${userId}`)
    }
}

class CommandHistory30 {
    public commands: Command30[] = [];
    push(command: Command30) {
        this.commands.push(command);
    }
    remove(command: Command30) {
        this.commands = this.commands.filter(c => c.commandId !== command.commandId);
    }
}

abstract class Command30 {
    public commandId: number;

    abstract execute(): void;

    constructor(public history: CommandHistory30) {
        this.commandId = Math.random();
    }
}

class AddUserCommand30 extends Command30 {
    constructor(private user: User30, private receiver: UserService30, history: CommandHistory30) {
        super(history);
    }

    execute(): void {
        this.receiver.save(this.user);
        this.history.push(this);
    }

    undo() {
        this.receiver.delete(this.user.userId);
        this.history.remove(this);
    }
}

class Controller30 {
    receiver: UserService30;
    history: CommandHistory30 = new CommandHistory30();

    addReceiver(receiver: UserService30) {
        this.receiver = receiver;
    }

    run() {
        const addUserCommand = new AddUserCommand30(
            new User30(1),
            this.receiver,
            this.history
        );
        addUserCommand.execute();
        console.log(addUserCommand.history);
        addUserCommand.undo();
        console.log(addUserCommand.history);
    }
}

const controller30 = new Controller30();
controller30.addReceiver(new UserService30());
controller30.run();