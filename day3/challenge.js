const fs = require('fs');

const input = fs.readFileSync('input.txt').toString().trim();

function task1() {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = [...input.matchAll(regex)];
    let sum = 0;

    matches.forEach( (el) => {
        const x = parseInt(el[1], 10);
        const y = parseInt(el[2], 10);

        sum += x*y;
    });

    console.log(`Result of Challenge 1: ${sum}`);
}

function task2() {
    const regex = /(?:mul\((\d+),(\d+)\)|do\(\)|don't\(\))/g;
    const matches = [...input.matchAll(regex)];
    let isEnabled = true;
    let sum = 0;
    
    matches.forEach((match) => {
        if(match[0] === "do()") isEnabled = true;
        else if (match[0] === "don't()") isEnabled = false;
        else if (match[0].startsWith("mul(")) {
            const x = parseInt(match[1], 10);
            const y = parseInt(match[2], 10);

            if(isEnabled) sum += x*y;
        }
    });

    console.log(`Result of Challenge 2: ${sum}`);
}

task1();
task2();