const fs = require('fs');
const map = fs.readFileSync('input.txt').toString().split('\n').map(r => r.split(''));

const directions = {
    up: {x: 0, y: -1, turn: 'right', symbol: '^'},
    right: {x: 1, y: 0, turn: 'down', symbol: '>'},
    down: {x: 0, y: 1, turn: 'left', symbol: 'v'},
    left: {x: -1, y: 0, turn: 'up', symbol: '<'},
}

const copy = (map) => (map.map(row => row.map(char => char)));
const log = (map) => (map.forEach(row => console.log(row.join(''))));

function day6() {
    const guard = walk(copy(map));
    const loops = findLoops(map, guard.plan);

    console.log(`Result of Challenge 1: ${guard.virginSteps} Moves`);
    console.log(`Result of Challenge 2: ${loops} Loops`);
}

function findLoops(map, floorPlan) {

    let infiniteLoopsFound = 0, loopCount = 0;

    for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[r].length; c++) {

            if (map[r][c] !== '#' && map[r][c] !== '^' && floorPlan[r][c] !== '.') {

                const newmap = copy(map);
                newmap[r][c] = '#';
                const position = walk(newmap);

                if (position.exitReason === 'infinite loop') infiniteLoopsFound++;
                loopCount++;
            }
        }
    }
    return infiniteLoopsFound;
}

function walk(map) {
    const position = {
        x: map[map.findIndex(r => r.includes('^'))].findIndex(char => char === '^'),
        y: map.findIndex(r => r.includes('^')),
        steps: 1,
        virginSteps: 1,
        currentDirection: 'up',
        exitReason: 'end',
        plan: map,
    };

    const turnLog = {};

    while (true) {

        const x = position.x + directions[position.currentDirection].x;
        const y = position.y + directions[position.currentDirection].y;

        if (!map[y] || !map[y][x]) break;

        if (map[y] && map[y][x] === '#') {

            position.currentDirection = directions[position.currentDirection].turn;

            if (turnLog[`${position.currentDirection} ${position.x} ${position.y}`]) {
                position.exitReason = 'infinite loop';
                break;
            }

            turnLog[`${position.currentDirection} ${position.x} ${position.y}`] = true;
            continue;
        }

        map[position.y][position.x] = `${directions[position.currentDirection].symbol}`;
        position.y = y;
        position.x = x;
        position.steps++;

        if (map[y][x] === '.') position.virginSteps++;
        map[y][x] = 'x';
    }
    return position;
}

day6();