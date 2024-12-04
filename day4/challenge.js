const fs = require('fs');

const data = fs.readFileSync('input.txt').toString().trim().split('\n');

function task1(grid, word) {
    const rows = grid.length;
    const cols = grid[0].length;
    const wordLen = word.length;
    const revWord = word.split('').reverse().join('');
    let count = 0;

    // Horizontal
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c <= cols - wordLen; c++) {
            const horizontal = grid[r].slice(c, c + wordLen);

            if(horizontal == word || horizontal == revWord) count++;
        }
    }

    // Vertical
    for(let c = 0; c < cols; c++) {
        for(let r = 0; r <= rows - wordLen; r++) {
            let vertical = '';

            for(let i = 0; i < wordLen; i++) {
                vertical += grid[r + i][c];

                if(vertical == word || vertical == revWord) count++;
            }
        }
    }


    // Diagonal
    for(let r = 0; r <= rows - wordLen; r++) {
        for(let c = 0; c <= cols - wordLen; c++) {
            let diagonal = '';

            for(let i = 0; i < wordLen; i++) {
                diagonal += grid[r + i][c + i];

                if(diagonal == word || diagonal == revWord) count++;
            }
        }
    }

    for(let r = 0; r <= rows - wordLen; r++) {
        for(let c = wordLen - 1; c <  cols; c++) {
            let diagonal = '';

            for(let i = 0; i < wordLen; i++) {
                diagonal += grid[r + i][c - i];

                if(diagonal == word || diagonal == revWord) count++;
            }
        }
    }

    console.log(`The Word: ${word} occurs ${count}`);
}

function task2(grid, word) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    // DIRTY WORD LETTER CHECK
    for(let r = 1; r < rows - 1; r++) {
        for(let c = 1; c < cols - 1; c++) {
            if(grid[r][c] == word[1]) {
                const topL = grid[r - 1][c - 1];
                const topR = grid[r - 1][c + 1];
                const bottomL = grid[r + 1][c - 1];
                const bottomR = grid[r + 1][c + 1];

                if(
                    ((topL == word[0] && bottomR == word[2]) || 
                    (topL == word[2] && bottomR == word[0])) &&
                    ((topR == word[0] && bottomL == word[2]) ||
                    (topR == word[2] && bottomL == word[0] ))
                ) {
                    count++
                }
            }
        }
    }

    console.log(`The Word: ${word} in a X - Shape occurs ${count}`);
}

task1(data, "XMAS");
task2(data, "MAS")