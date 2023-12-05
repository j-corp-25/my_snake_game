const canvas = document.getElementById('snakeCanvas')
const ctx = canvas.getContext('2d');

// this is the initial body of the snake
let snake = [
  { x: 300, y: 300 },
  { x: 290, y: 300 },
  { x: 280, y: 300 },
  { x: 270, y: 300 },
  { x: 260, y: 300 },
  { x: 250, y: 300 },
  { x: 240, y: 300 },
  { x: 230, y: 300 },
];

// this is one square of the snake would look like
const drawSnakeParts = (snakePart) => {
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10,10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10,10);
}

// for each of coordinates above we create the squares
const drawSnake = () => {
    snake.forEach(drawSnakeParts)
}

// we call the function
// drawSnake()

// let dx = 10
// let dy = 0

// clear the canvas to enable re-drawing
const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};


const moveSnake = () => {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop()
}

drawSnake()
