const fs = require('fs');

const rows = fs.readFileSync('input.txt').toString().trim().split('\n');

const arr1 = [];
const arr2 = [];

rows.forEach(row => {
    const [num1, num2] = row.trim().split(/\s+/);

    arr1.push(num1);
    arr2.push(num2);
});

arr1.sort();
arr2.sort();

function task1() {
    var result = 0;

    if(arr1.length != arr2.length) {
        console.log('Check Input');
        return;
    }
    
    arr1.forEach((el,i) => {
        result += Math.abs(arr1[i] - arr2[i]);
    });
    
    console.log(`Result of Challenge 1: ${result}`);
}

function task2() {
    var result = 0;

    arr1.forEach( (el) => {
        result += (el * countOccurrences(el, arr2));
    });

    console.log(`Result of Challenge 2: ${result}`);
}

function countOccurrences(number, array) {
    return array.filter(item => item === number).length;
}

task1();
task2();
