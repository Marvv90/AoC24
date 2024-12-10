const fs = require('fs');

const map = fs.readFileSync('input.txt','utf8').split('\n').map(r => r.split('').map(Number));
const rows = map.length, cols = map[0].length;

function task1() {
    const res = [];

    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < cols; c++) {
            if(map[r][c] === 0) res.push([r,c]);
        }
    }

    console.log('D10P1', res.map(getScore1).reduce((acc,cur) => acc + cur, 0));
    console.log('D10P2', res.map(getScore2).reduce((acc,cur) => acc + cur, 0));
}

function getScore1(pos) {
    const getAroundPos = (x,y) => [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ].filter(([x,y]) => x >= 0 && x < rows && y >= 0 && y < cols)

    const walk = (x, y, v) => {
        const res = [];

        getAroundPos(x,y).forEach(([nx, ny]) => {
            if(map[nx][ny] === v + 1) res.push([nx, ny, v + 1])
        });
        return res;
    };

    const ends = new Set();
    const queue = [[...pos,0]];

    while(queue.length) {
        const [x,y,v] = queue.shift();
        if(v === 9) {
            ends.add(`${x},${y}`);
            continue;
        }
        queue.push(...walk(x,y,v));
    }

    return ends.size;
}

function getScore2(pos) {
    const getAroundPos = (x,y) => [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ].filter(([x,y]) => x >= 0 && x < rows && y >= 0 && y < cols)

    const walk = (x, y, v) => {
        const res = [];

        getAroundPos(x,y).forEach(([nx, ny]) => {
            if(map[nx][ny] === v + 1) res.push([nx, ny, v + 1])
        });
        return res;
    };

    let cnt = 0;
    const queue = [[...pos,0]];

    while(queue.length) {
        const [x,y,v] = queue.shift();
        if(v === 9) {
            cnt++;
            continue;
        }
        queue.push(...walk(x,y,v));
    }

    return cnt;
}

task1();