
var snakeCells = [];
var snake = [{r: 0, c: 4}, {r: 1, c: 4}, {r: 2, c: 4}, {r: 3, c: 4}];
var tail = {r: 1, c: 1};
var direction = 'd';
var w = 600;
var h = 600;
var cellSize = 30;
var numCells = w / cellSize;
var apple = {r: 10, c: 1};
var head = snake[snake.length - 1];
var secondsPrev = 0;
var seconds = 0;
frameRate = 3;
var newHead;


function setup() {
  var x = createCanvas(w, h);
  // this._frameRate = 0.3;
  // setFrameRate = 0.01;
  // it's odd that .id() works here but not on shapes.
  drawGrid();
  // console.log(snakeCells);
}

function draw() {
  //ok finally got there, you call it as a function rather than assigning it a value:
  frameRate(9);

  // console.log(getFrameRate());

  // console.log('s, ', seconds, 'p ,', secondsPrev);
  //nope this doesn't work:
  // if (frameCount % 100 == 0 || frameCount % 100 == 1 || frameCount % 100 == 2) {
  changeSnake();
  // }
  drawApple();
  checkUserInput();

  // console.log(frameCount);
  // console.log(seconds);
}


function checkUserInput() {
  window.onkeydown = function(e) {
    // console.log(e.keyCode);
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
    console.log(direction);
  };
}


function drawGrid() {
  fill(100);
  // var rect1 = rect(0, 0, 100, 100);
  for (var i=0; i < numCells; i++) {
    for (var j=0; j < numCells; j++) {
      var cell = rect(i * cellSize, j * cellSize, cellSize, cellSize);
      // cell.id('hi');
      // wait, we don't even need an id storing the position. just use coordinates.
      snakeCells.push(cell);
    }
  }
}


function checkDirection() {
  switch(direction) {
    case 'd':
    if (head.r == numCells) {
      alert('Whoops! You hit the wall.');
      // clearInterval(snakeInt);
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
      clearInterval(snakeInt);
      // return;
    }
    break;

    case 'l':
    newHead = {
      r: head.r,
      c: head.c - 1
    };
    if (head.c == -1) {
      alert('Whoops! You hit the wall.');
      clearInterval(snakeInt);
      // return;
    }
    break;

    case 'r':
    newHead = {
      r: head.r,
      c: head.c + 1
    };
    if (head.c == numCells) {
      alert('Whoops! You hit the wall.');
      clearInterval(snakeInt);
      // return;
    }
    break;
  } //end switch statement
}


function changeSnake() {

  // checkDirection();

  // really strange that leaving this in kills the snake:
  // var head = snake[snake.length - 1];


    snake.forEach((cell) => {
      //oooh, second time i've made this mistake; you can't name the variable the same thing as the function:
      var color1 = color(255, 200, random(150));
      fill(color1);
      //interesting, c and r have reversed their roles!
      rect(cell.c * cellSize, cell.r * cellSize, cellSize, cellSize);
    });

    //turn tail back to dark:
    fill(100);
    rect(tail.c * cellSize, tail.r * cellSize, cellSize, cellSize);


    //wait we don't need a setInterval, we can just use framerate. Ok nvm that's not working. Ah it finally is.

    if (head.r == apple.r && head.c == apple.c) {
      tail = snake[0];
      head = snake[snake.length - 1];

      //new apple:
      apple.r = Math.floor(random(numCells));
      apple.c = Math.floor(random(numCells));
      fill(11);
      rect(apple.c * cellSize, apple.r * cellSize, cellSize, cellSize);

    } else {
      tail = snake.shift();
      head = snake[snake.length - 1];
    }

    checkDirection();

    snake.push(newHead);

}


function drawApple() {
  var color1 = color(255, random(50), random(50));
  fill(color1);
  rect(apple.c * cellSize, apple.r * cellSize, cellSize, cellSize);
}


setInterval(countSeconds, 1000);
