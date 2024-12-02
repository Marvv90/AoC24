const fs = require('fs');

const rows = fs.readFileSync('input.txt').toString().trim().split('\n');

function task1() {
    var result = 0;
    
    rows.forEach( row => {
        const level = row.split(' ');
        
        if(checkRow(level)) result++;       
    });
    
    console.log(`Result of Challenge 1: ${result} Rows are Safe`);
}

function task2() {
    var result = 0;
    
    rows.forEach( row => {
        const level = row.split(' ');
        
        if(checkRow(level)) result++;
        else {
            for (let i = 0; i < level.length; i++) {
                const newArray = level.slice(0, i).concat(level.slice(i + 1));
                if (checkRow(newArray)) {
                    result++;
                    break;
                }
            }
        }
    });
    
    console.log(`Result of Challenge 1: ${result} Rows are Safe`);
}

function checkRow(array) {
    let isSafe = true;
    let isAscending = null;

    for(let i = 1; i <= array.length; i++) {
        const diff = array[i]-array[i-1];

        if(isAscending === null) {
            if(diff > 0) isAscending = true;
            else if (diff < 0) isAscending = false;
        } else {
            if((isAscending &&  diff < 0) || (!isAscending && diff > 0)) isSafe = false;
        }

        if(Math.abs(diff) > 3 || diff == 0) isSafe = false;
    }

    return isSafe;
}

task1();
task2();