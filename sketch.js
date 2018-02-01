
// Next steps:
// - make snake unable to hit itself
// - make score look better
// - clean up UI in general (i.e. make reset process more intuitive)
// - add possibility for obstacles
// - see if you can figure out variable framerate


// Snake setup:
var snake = [{r: 0, c: 4}, {r: 1, c: 4}, {r: 2, c: 4}, {r: 3, c: 4}];
var tail = {r: 1, c: 1};
var head = snake[snake.length - 1];
var direction = 'd';
var newHead;

// Grid setup:
var w = 600;
var h = 600;
var snakeCells = [];
var numCells = 20;
var cellSize = w / numCells;

// Other setup:
var apple = {r: 10, c: 1};
var fRate = 7;
var score = 0;
var started = false;

// p5 functions:
function setup() {
  var x = createCanvas(w, h);
  drawGrid();
  noLoop();
}

function draw() {
  setFrameRate(7);

  if (started) {
    changeSnake();
    drawApple();
    checkUserInput();
  }
}

$(document).ready(() => {
  console.log('jq');
  $('#start').on('click', () => {
    started = true;
    loop();
  });

  $('#reset').on('click', () => {
    snake = [{r: 0, c: 4}, {r: 1, c: 4}, {r: 2, c: 4}, {r: 3, c: 4}];
    tail = {r: 1, c: 1};
    apple = {r: 10, c: 1};
    head = snake[snake.length - 1];
    direction = 'd';
    clear();
    drawGrid();
    loop();
  });

  $('#sub').on('click', () => {
    g = $('#grid').val();
    f = $('#frame').val();
    numCells = g;
    cellSize = w / numCells;
    fRate = f;
    console.log(fRate);
    setFrameRate(fRate);
    clear();
    drawGrid();
  });
});

// Get snake's current direction:
function checkUserInput() {
  window.onkeydown = function(e) {
    switch(e.keyCode) {
      case 83:
      direction = 'd';
      break;

      case 68:
      direction = 'r';
      break;

      case 87:
      direction = 'u';
      break;

      case 65:
      direction = 'l';
      break;
    }
  };
}

// Draw the grid:
function drawGrid() {
  fill(100);
  for (var i=0; i < numCells; i++) {
    for (var j=0; j < numCells; j++) {
      var cell = rect(i * cellSize, j * cellSize, cellSize, cellSize);
      snakeCells.push(cell);
    }
  }
}

// In each direction, we check for collisions with wall (or with snake's own body).
function checkDirection() {
  switch(direction) {
    case 'd':
    if (head.r == numCells) {
      alert('Whoops! You hit the wall.');
      started = false;
    }
    newHead = {
      r: head.r + 1,
      c: head.c
    };
    break;

    case 'u':
    newHead = {
      r: head.r - 1,
      c: head.c
    };
    if (head.r == -1) {
      alert('Whoops! You hit the wall.');
      started = false;
    }
    break;

    case 'l':
    newHead = {
      r: head.r,
      c: head.c - 1
    };
    if (head.c == -1) {
      alert('Whoops! You hit the wall.');
      started = false;
    }
    break;

    case 'r':
    newHead = {
      r: head.r,
      c: head.c + 1
    };
    if (head.c == numCells) {
      alert('Whoops! You hit the wall.');
      started = false;
    }
    break;
  } //end switch statement
}


function changeSnake() {
    // Color in the snake:
    snake.forEach((cell) => {
      var color1 = color(255, 200, random(150));
      fill(color1);
      rect(cell.c * cellSize, cell.r * cellSize, cellSize, cellSize);
    });

    // Turn tail back to dark:
    fill(100);
    rect(tail.c * cellSize, tail.r * cellSize, cellSize, cellSize);

    // If snake eats an apple:
    if (head.r == apple.r && head.c == apple.c) {
      tail = snake[0];
      head = snake[snake.length - 1];
      score ++;
      getNewApple();
    } else {
      tail = snake.shift();
      head = snake[snake.length - 1];
    }

    // Give snake a new head:
    checkDirection();
    snake.push(newHead);
    $('.score').html('<p>' + score + '</p>');
}

function getNewApple() {
  apple.r = Math.floor(random(numCells));
  apple.c = Math.floor(random(numCells));
  // Don't generate an apple inside the snake:
  if (snake.includes({r: apple.r, c: apple.c})) {
    getNewApple();
  }
}

function drawApple() {
  var color1 = color(185, random(95), random(95));
  fill(color1);
  rect(apple.c * cellSize, apple.r * cellSize, cellSize, cellSize);
}
