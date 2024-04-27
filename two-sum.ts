function twoSum(nums: number[], target: number): number[] {
    const sortedNumbers: number[] = nums.sort();
    let indexA: number = 0
    for (const a of sortedNumbers) {
        let indexB: number = indexA + 1;
        for (const b of sortedNumbers.slice(indexA + 1)) {
            if (a + b === target) {
                return [indexA, indexB];
            }
            indexB++;
        }
        indexA++;
    }
    return [];
};

twoSum([2,7,11,15], 9);