const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().trim().split('\n\n');

const ordering = data[0].split('\n').map(rule => rule.split('|').map(Number));
const pages = data[1].split('\n');

const invalidLines = [];

function task1() {
    const validLines = [];
    let sum = 0;

    pages.forEach(page => {
        const valid = isValid(page);

        if(valid) validLines.push(page);
        else invalidLines.push(page);
    });

    validLines.forEach(validLine => {
        const line = validLine.split(',');

        sum += Number(line[Math.floor(line.length / 2)]);
    });

    console.log(`The Answer of Challenge 1 is: ${sum}`);
}

function task2() {
    const validLines = [];
    let sum = 0;

    invalidLines.forEach(page => {
        validLines.push(sort(page));
    });

    validLines.forEach(validLine => {
        sum += Number(validLine[Math.floor(validLine.length / 2)]);
    });

    console.log(`The Answer of Challenge 2 is: ${sum}`);
}

function isValid(input) {
    for (const [a, b] of ordering) {
        const indexA = input.indexOf(a);
        const indexB = input.indexOf(b);

        if (indexA !== -1 && indexB !== -1 && indexA > indexB) {
            return false;
        }
    }
    return true;
}

function sort(input) {
    const result = [...input.split(',').map(Number)];
    
    result.sort((a, b) => {
    
        for (const [x, y] of ordering) {
            if (x === a && y === b) return -1; 
            if (x === b && y === a) return 1;
        }
    
        return 0;
    });

    return result;
}

task1();
task2();