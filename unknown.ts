let input: unknown;

input = 3;
input = ['a', 3, ['a', 'b']];

// let res: string = input; // cannot assign unknown to any other type

function run(i: unknown) {
    if (typeof i == 'number') {
        i++;
    }
}

run(input);

async function getData() {
    try {
        await fetch('');
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

async function getData2() {
    try {
        await fetch('');
    } catch (error) {
        const e = error as Error; // cast to error to return message, however if error is not Error type, application will crash. DANGER!!!
        console.log(e.message);
    }
}

type Unknown1 = unknown | null;
type Intersection1 = unknown & string;