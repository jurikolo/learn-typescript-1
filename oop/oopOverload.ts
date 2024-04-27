export {}

class UserOverlord {
    skills: string[];

    addSkill(skill: string): void;
    addSkill(skills: string[]): void;
    addSkill(skillOrSkills: string | string[]): void {
        if (typeof skillOrSkills === 'string') {
            this.skills.push(skillOrSkills)
        } else {
            this.skills.concat(skillOrSkills);
        }
    }
}

new UserOverlord().addSkill('x') // see autocompletion, we get 2 options

function run(distance: string): string;
function run(distance: number): number;
function run(distance: string | number): string | number {
    if (typeof distance === 'string') {
        return '';
    } else {
        return 0;
    }
}