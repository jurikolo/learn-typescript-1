import _ from "lodash";

const result: string[] = [];
const addition: string[] = ['a', 'b', 'c'];

_.merge(result, addition);

console.log(result.length);