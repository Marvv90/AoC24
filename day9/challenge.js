const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8');

class Disk {
    constructor(size, initialData = null) {
        this.size = size
        this.used = initialData === null ? 0 : size
        this.data = new Array(size).fill(initialData)
    }

    get left() {
        return this.size - this.used
    }

    add(d) {
        for (let i = 0; i < d.length; i++) {
            this.data[i + this.used] = d[i]
        }
        this.used += d.length
    }

    clear() {
        this.used = 0
        this.data.fill(null)
    }
}

function task1() {
    const blocks = [];

    for(let i = 0; i < data.length; i++) {
        blocks.push(...new Array(+data[i]).fill(i % 2 ? null : i / 2));
    }
    
    let i = 0, j = blocks.length - 1
    while (true) {
        while (blocks[i] !== null) i++
        while (blocks[j] === null) j--
        if (i >= j) break
        [blocks[i], blocks[j]] = [blocks[j], blocks[i]]
    }

    console.log('[D9P1]',blocks.filter(x => x !== null).reduce((acc, x, i) => acc + x * i, 0))
}

function task2() {
    const blocks = [];

    for (let i = 0; i < data.length; i++) {
        blocks.push(new Disk(+data[i], i % 2 ? null : i / 2));
    }
    
    for (let i = blocks.length - 1; i >= 0; i -= 2) {
        for (let j = 1; j < i; j += 2) {
            if (blocks[j].left >= blocks[i].size) {
                blocks[j].add(blocks[i].data);
                blocks[i].clear();
                break;
            }
        }
    }
    
    console.log('[D9P2]',blocks.map(b => b.data).flat().reduce((acc, v, i) => acc + (v === null ? 0 : v * i), 0));
}

task1();
task2();