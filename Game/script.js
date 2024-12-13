const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const colors = ["red", "blue", "green", "yellow", "purple"];

let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let currentBlock = { x: 4, y: 0, shape: [[1, 1], [1, 1]], color: "red" };

// Draw grid and blocks
function drawGrid() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw placed blocks
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col]) {
        context.fillStyle = grid[row][col];
        context.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }

  // Draw current block
  context.fillStyle = currentBlock.color;
  currentBlock.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        context.fillRect(
          (currentBlock.x + x) * BLOCK_SIZE,
          (currentBlock.y + y) * BLOCK_SIZE,
          BLOCK_SIZE,
          BLOCK_SIZE
        );
      }
    });
  });
}

// Move block
function moveBlock(dx, dy) {
  currentBlock.x += dx;
  currentBlock.y += dy;

  // Check for collision and boundaries
  if (isColliding()) {
    currentBlock.x -= dx;
    currentBlock.y -= dy;
  }
}

// Rotate block
function rotateBlock() {
  const newShape = currentBlock.shape[0].map((_, i) =>
    currentBlock.shape.map(row => row[i]).reverse()
  );

  const prevShape = currentBlock.shape;
  currentBlock.shape = newShape;

  if (isColliding()) {
    currentBlock.shape = prevShape; // Revert if collision
  }
}

// Check for collision
function isColliding() {
  return currentBlock.shape.some((row, y) =>
    row.some((cell, x) => {
      if (cell) {
        const newX = currentBlock.x + x;
        const newY = currentBlock.y + y;

        return (
          newX < 0 ||
          newX >= COLS ||
          newY >= ROWS ||
          (newY >= 0 && grid[newY][newX])
        );
      }
      return false;
    })
  );
}

// Place block when it hits the bottom
function placeBlock() {
  currentBlock.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const newX = currentBlock.x + x;
        const newY = currentBlock.y + y;

        if (newY >= 0) {
          grid[newY][newX] = currentBlock.color;
        }
      }
    });
  });

  // Clear full rows
  grid = grid.filter(row => row.some(cell => !cell));
  while (grid.length < ROWS) {
    grid.unshift(Array(COLS).fill(0));
  }

  // Create new block
  currentBlock = {
    x: 4,
    y: 0,
    shape: [[1, 1], [1, 1]],
    color: colors[Math.floor(Math.random() * colors.length)],
  };

  if (isColliding()) {
    alert("Game Over!");
    grid = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }
}

// Drop block
function dropBlock() {
  moveBlock(0, 1);
  if (isColliding()) {
    moveBlock(0, -1);
    placeBlock();
  }
}

// Keyboard controls
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
      moveBlock(-1, 0);
      break;
    case "ArrowRight":
      moveBlock(1, 0);
      break;
    case "ArrowDown":
      dropBlock();
      break;
    case "ArrowUp":
      rotateBlock();
      break;
  }
});

setInterval(() => {
  dropBlock();
  drawGrid();
}, 500);

drawGrid();
