const fs = require('fs');
const data = fs.readFileSync('input.txt','utf-8');
const rows = data.indexOf('\n') + 1;



function task1() {
    let positions = {};
    let antinodes = new Set();

    for(let i = 0; i < data.length; i++) {
        const c = data[i];

        if(c != '.' && c != '\n') {
            pos = [i % rows, Math.floor(i/rows)];
            
            if(c in positions) {
                positions[c].push(pos);
            } else {
                positions[c] = [pos];
            }
        }
    }

    for(let key in positions) {
        const list = positions[key];

        for(let i = 0; i < list.length; i++) {
            for(let j = i + 1; j < list.length; j++) {
                const dx = list[i][0] - list[j][0];
                const dy = list[i][1] - list[j][1];

                if (inRange([list[j][0] + dx * 2, list[j][1] + dy * 2], rows, data.length)) {
                    antinodes.add((list[j][0] + dx * 2).toString().concat(',').concat((list[j][1] + dy * 2).toString()));
                }
                if (inRange([list[i][0] - dx * 2, list[i][1] - dy * 2], rows, data.length)) {
                    antinodes.add((list[i][0] - dx * 2).toString().concat(',').concat((list[i][1] - dy * 2).toString()));
                }
            }
        }
        
    }

    console.log(`Result of Challenge 1: ${antinodes.size}`);
}

function task2() {
    let positions = {};
    let antinodes = new Set();

    for(let i = 0; i < data.length; i++) {
        const c = data[i];

        if(c != '.' && c != '\n') {
            pos = [i % rows, Math.floor(i/rows)];
            
            if(c in positions) {
                positions[c].push(pos);
            } else {
                positions[c] = [pos];
            }
        }
    }

    for(let key in positions) {
        const list = positions[key];

        for(let i = 0; i < list.length; i++) {
            for(let j = i + 1; j < list.length; j++) {
                const dx = list[i][0] - list[j][0];
                const dy = list[i][1] - list[j][1];

                var new_pos = [list[j][0] + dx, list[j][1] + dy];

                while (inRange2(new_pos, rows, data.length)) {
                    antinodes.add(new_pos[0].toString().concat(',').concat(new_pos[1].toString()));
                    new_pos[0] += dx;
                    new_pos[1] += dy;
                }

                var new_pos = [list[i][0] - dx, list[i][1] - dy];

                while (inRange2(new_pos, rows, data.length)) {
                    antinodes.add(new_pos[0].toString().concat(',').concat(new_pos[1].toString()));
                    new_pos[0] -= dx;
                    new_pos[1] -= dy;
                }
            }
        }
        
    }

    console.log(`Result of Challenge 2: ${antinodes.size}`);
}

function inRange(pos,row,len) {
    return pos[0] >= 0 && pos[1] >= 0 && pos[0] < row - 1 && pos[1] < Math.ceil(len / row);
}

function inRange2(pos,row,len) {
    return pos[0] >= 0 && pos[1] >= 0 && pos[0] < row - 1 && pos[1] * row + pos[0] < len;
}

task1();
task2();