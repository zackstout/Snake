
var snakeCells = [];
var snake = [{r: 0, c: 4}, {r: 1, c: 4}, {r: 2, c: 4}, {r: 3, c: 4}];
var tail = {r: 1, c: 1};
var direction = 'd';
var w = 600;
var h = 600;
var cellSize = 30;
var numCells = w / cellSize;

function setup() {
  var x = createCanvas(w, h);
  // x.id('hi');
  // console.log(x);
  drawGrid();
  console.log(snakeCells);
}

function draw() {
  changeSnake();
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

function changeSnake() {
  fill(253);
  var head = snake[snake.length - 1];
  snake.forEach((cell) => {
    //interesting, c and r have reversed their roles!
    rect(cell.c * cellSize, cell.r * cellSize, cellSize, cellSize);
  });
}
//
// snake.forEach(function(cell) {
//   var name = 'col' + cell.c + 'row' + cell.r;
//   var el = document.getElementById(name);
//   el.className = 'snakeLive';
// });
//
// // move tail to new head; if eating an apple, do not remove tail from snake:
// if (head.r == apple.r && head.c == apple.c) {
//   tail = snake[0];
//   head = snake[snake.length - 1];
//   //generate new apple:
//   apple.r = Math.floor(Math.random()*15);
//   apple.c = Math.floor(Math.random()*15);
//   var appleCell = 'col' + apple.c + 'row' + apple.r;
//   document.getElementById(appleCell).className = 'apple';
// } else {
//   tail = snake.shift();
//   head = snake[snake.length - 1];
// }
// snake.push(newHead);


  function changeSnake2() {

    //toggle old tail back to blue:
    var name1 = 'col' + tail.c + 'row' + tail.r;
    document.getElementById(name1).className = 'snakeCell';

    //had to change this to account for variable length:
    var head = snake[snake.length - 1];

    //get current direction:
    switch(direction) {
      case 'd':
      if (head.r + 1 == 16) {
        alert('Whoops! You hit the wall.');
        clearInterval(snakeInt);
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
      if (head.r - 1 == -2) {
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
      if (head.c - 1 == -2) {
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
      if (head.c + 1 == 16) {
        alert('Whoops! You hit the wall.');
        clearInterval(snakeInt);
        // return;
      }
      break;
    } //end switch statement

    //draw snake:
    snake.forEach(function(cell) {
      var name = 'col' + cell.c + 'row' + cell.r;
      var el = document.getElementById(name);
      el.className = 'snakeLive';
    });

    // move tail to new head; if eating an apple, do not remove tail from snake:
    if (head.r == apple.r && head.c == apple.c) {
      tail = snake[0];
      head = snake[snake.length - 1];
      //generate new apple:
      apple.r = Math.floor(Math.random()*15);
      apple.c = Math.floor(Math.random()*15);
      var appleCell = 'col' + apple.c + 'row' + apple.r;
      document.getElementById(appleCell).className = 'apple';
    } else {
      tail = snake.shift();
      head = snake[snake.length - 1];
    }
    snake.push(newHead);
  }

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
    // console.log(direction);
  };
  //
  // snakeGrid(15);
  //
  // var apple = {r: 10, c: 1};
  // var appleCell = 'col' + apple.c + 'row' + apple.r;
  // document.getElementById(appleCell).className = 'apple';
  //
  // changeSnake();
  //
  // var snakeInt;
  // vm.startSnake = function() {
  //   snakeInt = setInterval(changeSnake, 230);
  // };
