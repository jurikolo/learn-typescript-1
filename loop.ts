let skills999: string[] = [];
const skills9999: string[] = ['Dev', 'Ops'];
skills999 = skills999.concat(skills9999);

for(const skill of skills999) {
    // console.log(skill)
}

//-----
const skills998: number[] = [5, 7, 1, 3, 3, 4, 7];
let processedSkills998: number[] = [];
for (const cnt of skills998) {
    if (processedSkills998.indexOf(cnt) !== -1) {
        console.log(`Skipping value: ${cnt}`)
    } else {
        processedSkills998.push(cnt)
        console.log(`Processing value: ${cnt}`)
    }
}

//-----
