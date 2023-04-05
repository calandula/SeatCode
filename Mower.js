const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const directions = {
    'N': [0, 1],
    'E': [1, 0],
    'S': [0, -1],
    'W': [-1, 0]
};

const positionMappingLeft = { 
    'N': 'W',
    'W': 'S', 
    'S': 'E', 
    'E': 'N' 
}

const positionMappingRight = {
    'N': 'E', 
    'E': 'S', 
    'S': 'W', 
    'W': 'N' 
}
  
function simulateMower(position, instructions, grid) {
let [x, y, direction] = position;

for (const instruction of instructions) {
    if (instruction === 'L') {
    direction = positionMappingLeft[direction];
    } else if (instruction === 'R') {
    direction = positionMappingRight[direction];
    } else if (instruction === 'M') {
    const [dx, dy] = directions[direction];
    const new_x = x + dx;
    const new_y = y + dy;
    if (!grid.has(`${new_x},${new_y}`)) {
        continue;
        }
    x = new_x;
    y = new_y;
        }
    }

return [x, y, direction];
}
  
  
readline.question('', (upperRight) => {
    const [max_x, max_y] = upperRight.split(' ').map(Number);
  
    const grid = new Set();
    for (let x = 0; x <= max_x; x++) {
      for (let y = 0; y <= max_y; y++) {
        grid.add(`${x},${y}`);
      }
    }
  
    const positions = [];
    const instructions = [];
    readline.on('line', (line) => {
      if (line.trim() === '') {
        const position = positions.pop();
        const instruction = instructions.pop();
        const final_position = simulateMower(position, instruction, grid);
        console.log(final_position.join(' '));
      } else if (instructions.length === positions.length) {
        lineArr = line.trim().split(' ')
        positions.push([...lineArr.slice(0, 2).map(Number), lineArr[2]]);
      } else {
        instructions.push(line.trim().split(''));
      }
    });
  });