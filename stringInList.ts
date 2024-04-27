const aaa: string = 'aaa';
const bbb: string = 'bbb';
const ccc: string = 'ccc';

const aaabbbccc = [aaa, bbb, ccc];

console.log('IN:');
if (aaa in aaabbbccc) {
    console.log('aaa in aaabbbccc');
}

if ('bbb' in aaabbbccc) {
    console.log('bbb in aaabbbccc');
}

if ('cc' in aaabbbccc) {
    console.log('cc in aaabbbccc');
}

console.log('\n\nINCLUDES:')
if (aaabbbccc.includes(aaa)) {
    console.log('aaa in aaabbbccc');
}

if (aaabbbccc.includes('bbb')) {
    console.log('bbb in aaabbbccc');
}

if (aaabbbccc.includes('cc')) {
    console.log('cc in aaabbbccc');
}