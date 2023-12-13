
let score = 0;
let snake;
let dx = 10;
let dy = 0;
let foodX;
let foodY;
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

// this is the initial body of the snake
const initialyzeGame = () => {
    score = 0;
    document.querySelector(".game-over-container").style.display = "none";
    document.getElementById("score").innerHTML = score;
    snake = [
        { x: 300, y: 300 },
        { x: 290, y: 300 },
        { x: 280, y: 300 },
        { x: 270, y: 300 },
        { x: 260, y: 300 },
        { x: 250, y: 300 },
        { x: 240, y: 300 },
        { x: 230, y: 300 },
    ];
    createFood()
}

// this is one square of the snake would look like
const drawSnakeParts = (snakePart) => {
  ctx.fillStyle = "lightgreen";
  ctx.strokeStyle = "darkgreen";
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
};

// for each of coordinates above we create the squares
const drawSnake = () => {
  snake.forEach(drawSnakeParts);
};

// we call the function


// clear the canvas to enable re-drawing
const clearCanvas = () => {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.fillRect(0, 0, snakeCanvas.width, snakeCanvas.height);
  ctx.strokeRect(0, 0, snakeCanvas.width, snakeCanvas.height);
};

const moveSnake = () => {
  let didEatFood;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  didEatFood = snake[0].x === foodX && snake[0].y === foodY;

  if (didEatFood) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
};

// TODO: These 4 lines makes the snake move up on the y-axis(vertical)

// set up recursive function to keep calling the snake instead of making extra function calls



const changeDirection = (event) => {
    //define the keys associated with
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }

    if (changeDirection)
      return

      changeDirection = true;
};

// listen for pressed down keys
document.addEventListener("keydown", changeDirection);

// now we need to generate the food

const randomBlock = (min, max) => {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
};



const createFood = () => {
    let foodIsOnSnake;
    do {
        // generate a random block for the food to be drawn
        foodX = randomBlock(0, snakeCanvas.width - 10);
        foodY = randomBlock(0, snakeCanvas.height - 10);

        foodIsOnSnake = snake.some((part) => part.x === foodX && part.y === foodY);
    } while (foodIsOnSnake);
};


const drawFood = () => {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
};

// lets make the endgame

const didGameEnd = () => {
    for (let i = 4; i < snake.length; i++) {
        const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
        if (didCollide) return true

    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= snakeCanvas.width;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= snakeCanvas.height;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall ;
};

const handleGameOver = () => {
    document.querySelector(".game-over-container").style.display = "flex";
}

const restartGame = () => {
    document.querySelector(".game-over-container").style.display = "none"
    initialyzeGame();
    main()
}


const main = () => {
    if (didGameEnd()) {
       clearCanvas()
       handleGameOver()
       return;

    }
    setTimeout(() => {
      changingDirection = false
      clearCanvas();
      drawFood();
      moveSnake();
      drawSnake();
      main();
    }, 100);
  };

  document.getElementById("restartButton").addEventListener("click",restartGame)

  initialyzeGame()
  main()
