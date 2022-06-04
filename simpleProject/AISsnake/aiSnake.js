const canvas = document.getElementById("Main");
const ctx = canvas.getContext("2d");


let speed = 10; 
let snakes = 1; 
let apples = 100;
let mutationStrength = 5;
let evolve = false;
let selfCollide = true;
let energy = 100;


const getSnakeSight = (foodCoords, snakeSegmentsCoords) => {
    let sight = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    let snakeHeadCoords = snakeSegmentsCoords[0];

    let area = { 
        x1: snakeHeadCoords.x - main.cellSize * 6,   
        y1: snakeHeadCoords.y - main.cellSize * 6,   
        x2: snakeHeadCoords.x + main.cellSize * 6,
        y2: snakeHeadCoords.y + main.cellSize * 6
    }

    return sight.map((sightY, y) => {
        return sightY.map((cell, x) => {
            if (cell === 0) { 
                let currentCoords = {
                    x: area.x1 + x * main.cellSize, 
                    y: area.y1 + y * main.cellSize
                }

                let isSnake = snakeSegmentsCoords.find(segment => segment.x === currentCoords.x && segment.y === currentCoords.y);
                let isFood = foodCoords.find(apple => apple.x === currentCoords.x && apple.y === currentCoords.y);
                let isWall = currentCoords.x >= main.width || currentCoords.y >= main.height || currentCoords.x <= 0 || currentCoords.y <= 0;

                if (isSnake) return 2;
                else if (isFood) return 3;
                else if (isWall) return 4;
                else return 0;                
            } else return 1;
        });
    });
}

const random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomColor = () => {
    let color = "";

    for(let i = 0; i < 3; i++) {
        let sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }

    return "#" + color;
}

const highestVal = (object) => Object.entries(object).reduce((a, b) => a[1] > b[1] ? a : b)[0];

class Main { 
    constructor() {
        this.width = canvas.width;
        this.height = canvas.height;
        this.cellSize = 10;

        this.paused = false;

        this.apples = apples;
        this.snakes = [];

        this.maxScore = 5;
    }

    drawCube = (x, y, color) => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(x, y, this.cellSize, this.cellSize);
        ctx.stroke();
    };

    gameOver = id => {
        this.snakes = this.snakes.filter(snake => snake.id !== id);
        
        let headX = random(1, main.width / main.cellSize - 1) * main.cellSize;
        let headY = random(1, main.height / main.cellSize - 1) * main.cellSize;

        let mutation = brain.mutate(mutationStrength);
        this.snakes.push(new Snake(mutation.foodW, mutation.obstaclesW, [
                {x: headX, y: headY},
                {x: headX - this.cellSize, y: headY},
                {x: headX - this.cellSize * 2, y: headY},
            ], id));
    }

    render = (nnDirection, snake) => {
        if (nnDirection === "right") snake.headX += this.cellSize;
        else if (nnDirection === "left") snake.headX -= this.cellSize;
        else if (nnDirection === "down") snake.headY += this.cellSize;
        else if (nnDirection === "up") snake.headY -= this.cellSize;
        
        snake.coordinates.unshift({ x: snake.headX, y: snake.headY });
        if (snake.coordinates.length - 1 > snake.length) snake.coordinates.pop();
        for (let i = 0; i < apple.apples.length; i++) {
            let {x, y} = apple.apples[i];

            if (snake.headX === x && snake.headY === y) apple.eated(x, y, snake);
        }
        if (snake.headX >= this.width || snake.headY >= this.height || snake.headX < 0 || snake.headY < 0) {
            main.gameOver(snake.id);
        } 
        snake.draw();
        apple.draw();
    }
}

class Apple {
    constructor() {
        this.apples = [{
            x: random(1, main.width / main.cellSize - 1) * main.cellSize,
            y: random(1, main.height / main.cellSize - 1) * main.cellSize,
        }];

        for (let i = 0; i < main.apples; i++) {
            this.newApple();
        }
    }

    draw = () => {
        this.apples.forEach((apple) => {
            main.drawCube(apple.x, apple.y, "green");
        })
    };

    eated = (x, y, snake) => {
        snake.length++;
        snake.energy = energy;
        this.apples = this.apples.filter(apple => apple.x !== x || apple.y !== y);
        this.newApple();
    };

    newApple = () => {
        let x, y, expression;

        do {
            x = random(1, main.width / main.cellSize - 1) * main.cellSize;
            y = random(1, main.height / main.cellSize - 1) * main.cellSize;
            
            expression = this.apples.every(apple => {apple.x !== x && apple.y !== y});
        } while (expression);

        this.apples.push({x, y});
    }
}

class Snake {
    constructor(fw, ow, coordinates, id) {
        this.id = id;

        this.length = 3;
        this.direction = main.direction;

        this.headX = coordinates[0].x;
        this.headY = coordinates[0].y;

        this.coordinates = coordinates;

        this.foodW = fw;
        this.obstaclesW = ow;

        this.direction = "right";
        this.color = "yellow";

        this.energy = energy;
    }

    draw = () => {
        for (let i = 0; i < this.length; i++) {
            const x = this.coordinates[i].x;
            const y = this.coordinates[i].y;

            main.drawCube(x, y, this.color);

            if (selfCollide) {
                if (x === this.headX && y === this.headY && i !== 0) main.gameOver(this.id);
            }
        }
    };
}

class NeuralNetwork {
    constructor() {
        this.foodW = [
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 5, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 4, right: 0, up: 4, down: 0}, {left: 4, right: 0, up: 5, down: 0}, {left: 3, right: 0, up: 6, down: 0}, {left: 2, right: 0, up: 7, down: 0}, {left: 1, right: 0, up: 8, down: 0}, {left: 0, right: 0, up: 10, down: 0}, {left: 0, right: 1, up: 8, down: 0}, {left: 0, right: 2, up: 7, down: 0}, {left: 0, right: 3, up: 6, down: 0}, {left: 0, right: 4, up: 5, down: 0}, {left: 0, right: 4, up: 4, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 5, right: 0, up: 4, down: 0}, {left: 4, right: 0, up: 4, down: 0}, {left: 3, right: 0, up: 6, down: 0}, {left: 2, right: 0, up: 8, down: 0}, {left: 2, right: 0, up: 12, down: 0}, {left: 0, right: 0, up: 15, down: 0}, {left: 0, right: 2, up: 12, down: 0}, {left: 0, right: 2, up: 8, down: 0}, {left: 0, right: 3, up: 6, down: 0}, {left: 0, right: 4, up: 4, down: 0}, {left: 0, right: 5, up: 4, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 6, right: 0, up: 3, down: 0}, {left: 6, right: 0, up: 3, down: 0}, {left: 10, right: 0, up: 10, down: 0}, {left: 10, right: 0, up: 10, down: 0}, {left: 8, right: 0, up: 12, down: 0}, {left: 0, right: 0, up: 20, down: 0}, {left: 0, right: 8, up: 12, down: 0}, {left: 0, right: 10, up: 10, down: 0}, {left: 0, right: 10, up: 10, down: 0}, {left: 0, right: 6, up: 3, down: 0}, {left: 0, right: 6, up: 3, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 7, right: 0, up: 2, down: 0}, {left: 8, right: 0, up: 2, down: 0}, {left: 10, right: 0, up: 10, down: 0}, {left: 10, right: 0, up: 10, down: 0}, {left: 8, right: 0, up: 13, down: 0}, {left: 0, right: 0, up: 25, down: 0}, {left: 0, right: 0, up: 13, down: 12}, {left: 0, right: 10, up: 10, down: 0}, {left: 0, right: 10, up: 10, down: 0}, {left: 0, right: 8, up: 2, down: 0}, {left: 0, right: 7, up: 2, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 8, right: 0, up: 1, down: 0}, {left: 12, right: 0, up: 2, down: 0}, {left: 12, right: 0, up: 8, down: 0}, {left: 13, right: 0, up: 12, down: 0}, {left: 15, right: 0, up: 15, down: 0}, {left: 0, right: 0, up: 35, down: 0}, {left: 0, right: 15, up: 15, down: 0}, {left: 0, right: 13, up: 12, down: 0}, {left: 0, right: 12, up: 8, down: 0}, {left: 0, right: 12, up: 2, down: 0}, {left: 0, right: 8, up: 1, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: -5, right: 5, up: 0, down: 0}, {left: 10, right: -10, up: 0, down: 0}, {left: 20, right: -20, up: 0, down: 0}, {left: 30, right: -30, up: 0, down: 0}, {left: 40, right: -40, up: 0, down: 0}, {left: 50, right: -50, up: 0, down: 0}, {left: 1, right: 1, up: 1, down: 1}, {left: -50, right: 50, up: 0, down: 0}, {left: -40, right: 40, up: 0, down: 0}, {left: -30, right: 30, up: 0, down: 0}, {left: -20, right: 20, up: 0, down: 0}, {left: -10, right: 10, up: 0, down: 0}, {left: -5, right: 5, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 8, right: 0, up: 0, down: 1}, {left: 12, right: 0, up: 0, down: 2}, {left: 12, right: 0, up: 0, down: 8}, {left: 13, right: 0, up: 0, down: 12}, {left: 15, right: 0, up: 0, down: 15}, {left: 0, right: 0, up: 0, down: 35}, {left: 0, right: 15, up: 0, down: 15}, {left: 0, right: 13, up: 0, down: 12}, {left: 0, right: 8, up: 0, down: 12}, {left: 0, right: 12, up: 0, down: 2}, {left: 0, right: 8, up: 0, down: 1}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 7, right: 0, up: 0, down: 2}, {left: 8, right: 0, up: 0, down: 2}, {left: 10, right: 0, up: 0, down: 10}, {left: 10, right: 0, up: 0, down: 10}, {left: 12, right: 0, up: 0, down: 13}, {left: 0, right: 0, up: 0, down: 25}, {left: 0, right: 12, up: 0, down: 13}, {left: 0, right: 10, up: 0, down: 10}, {left: 0, right: 10, up: 0, down: 10}, {left: 0, right: 8, up: 0, down: 2}, {left: 0, right: 7, up: 0, down: 2}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 6, right: 0, up: 0, down: 3}, {left: 6, right: 0, up: 0, down: 3}, {left: 10, right: 0, up: 0, down: 10}, {left: 10, right: 0, up: 0, down: 10}, {left: 8, right: 0, up: 0, down: 12}, {left: 0, right: 0, up: 0, down: 20}, {left: 0, right: 8, up: 0, down: 12}, {left: 0, right: 10, up: 0, down: 10}, {left: 0, right: 10, up: 0, down: 10}, {left: 0, right: 6, up: 0, down: 3}, {left: 0, right: 6, up: 0, down: 3}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 5, right: 0, up: 0, down: 4}, {left: 4, right: 0, up: 0, down: 4}, {left: 3, right: 0, up: 0, down: 6}, {left: 2, right: 0, up: 0, down: 8}, {left: 2, right: 0, up: 0, down: 12}, {left: 0, right: 0, up: 0, down: 15}, {left: 0, right: 2, up: 0, down: 12}, {left: 0, right: 2, up: 0, down: 8}, {left: 0, right: 3, up: 0, down: 6}, {left: 0, right: 4, up: 0, down: 4}, {left: 0, right: 5, up: 0, down: 4}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 4, right: 0, up: 0, down: 4}, {left: 4, right: 0, up: 0, down: 5}, {left: 3, right: 0, up: 0, down: 6}, {left: 2, right: 0, up: 0, down: 7}, {left: 1, right: 0, up: 0, down: 8}, {left: 0, right: 0, up: 0, down: 10}, {left: 0, right: 1, up: 0, down: 8}, {left: 0, right: 2, up: 0, down: 7}, {left: 0, right: 3, up: 0, down: 6}, {left: 0, right: 4, up: 0, down: 5}, {left: 0, right: 4, up: 0, down: 4}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 5}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
        ];

        this.obstaclesW = [
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: -1, right: 1, up: -1, down: 1}, {left: -1, right: 1, up: -1, down: 0}, {left: -1, right: 1, up: -1, down: 0}, {left: 1, right: 1, up: -2, down: 0}, {left: 1, right: -1, up: -1, down: 0}, {left: 1, right: -1, up: -1, down: 0}, {left: 1, right: -1, up: -1, down: 1}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: -1, right: 0, up: -1, down: 1}, {left: -2, right: 0, up: -2, down: 0}, {left: -3, right: 1, up: -3, down: 1}, {left: 2, right: 2, up: -7, down: 2}, {left: 1, right: -3, up: -3, down: 1}, {left: 0, right: -2, up: -2, down: 0}, {left: 0, right: -1, up: -1, down: 1}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: -1, right: 0, up: -1, down: 1}, {left: -3, right: 1, up: -3, down: 1}, {left: 5, right: -5, up: -5, down: 5}, {left: 10, right: 10, up: -99, down: 10}, {left: 5, right: -5, up: -5, down: 5}, {left: 1, right: -3, up: -3, down: 1}, {left: 0, right: -1, up: -1, down: 1}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: -2, right: 0, up: 1, down: 1}, {left: -7, right: 2, up: 2, down: 2}, {left: -99, right: 10, up: 10, down: 10}, {left: 1, right: 1, up: 1, down: 1}, {left: 10, right: -99, up: 10, down: 10}, {left: 2, right: -7, up: 2, down: 2}, {left: 0, right: -2, up: 1, down: 1}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: -1, right: 0, up: 1, down: -1}, {left: -3, right: 1, up: 1, down: -3}, {left: -5, right: 5, up: 5, down: -5}, {left: 10, right: 10, up: 10, down: -99}, {left: 5, right: -5, up: 5, down: -5}, {left: 1, right: -3, up: 1, down: -3}, {left: 0, right: -1, up: 1, down: -1}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: -1, right: 0, up: 1, down: -1}, {left: -2, right: 0, up: 0, down: -2}, {left: -3, right: 1, up: 1, down: -3}, {left: 2, right: 2, up: 2, down: -7}, {left: 1, right: -3, up: 1, down: -3}, {left: 0, right: -2, up: 0, down: -2}, {left: 0, right: -1, up: 1, down: -1}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: -1, right: 1, up: 1, down: -1}, {left: -1, right: 1, up: 0, down: -1}, {left: -1, right: 1, up: 0, down: -1}, {left: 1, right: 1, up: 0, down: -2}, {left: 1, right: -1, up: 0, down: -1}, {left: 1, right: -1, up: 0, down: -1}, {left: 1, right: -1, up: 1, down: -1}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
            [{left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}, {left: 0, right: 0, up: 0, down: 0}],
        ];
    }
    mutate = mutations => {
        let {foodW, obstaclesW} = this;
        
        for (let i = 0; i < mutations; i++) {
            let mutation = random(0, 1);
            
            if (mutation === 0) { 
                let mx = random(0, 12);
                let my = random(0, 12);
                let md = random(1, 4);
                let m = random(-2, 2);
                
                if (md === 1) { 
                    obstaclesW[my][mx].left += m;
                } else if (md === 2) { 
                    obstaclesW[my][mx].right += m;
                } else if (md === 3) { 
                    obstaclesW[my][mx].up += m;
                } else if (md === 4) { 
                    obstaclesW[my][mx].down += m;
                }
            } else if (mutation === 1) {
                let mx = random(0, 12);
                let my = random(0, 12);
                let md = random(1, 4);
                let m = random(-2, 2);

                if (md === 1) { 
                    foodW[my][mx].left += m;
                } else if (md === 2) {
                    foodW[my][mx].right += m;
                } else if (md === 3) { 
                    foodW[my][mx].up += m;
                } else if (md === 4) {
                    foodW[my][mx].down += m;
                }
            }
        }

        return {foodW, obstaclesW};
    }

    getDirecion = sight => {
        let sensors = [];

        sight.forEach((valueY, idxY) => {
            valueY.forEach((valueX, idxX) => {
                if (valueX !== 0 && valueX !== 1) { 
                    if (valueX === 2 || valueX === 4) {
                        sensors.push({
                            y: idxY,
                            x: idxX,
                            type: 0
                        });
                    } else if (valueX === 3) {
                        sensors.push({
                            y: idxY,
                            x: idxX,
                            type: 1
                        });
                    }
                }
            });
        });

        let fcs = {left: 0, right: 0, up: 0, down: 0}; 
        let ocs = {left: 0, right: 0, up: 0, down: 0};

        if (sensors.length > 0) {
            sensors.forEach(value => {
                if (value.type === 1) {
                    fcs.left += this.foodW[value.y][value.x].left;
                    fcs.right += this.foodW[value.y][value.x].right;
                    fcs.up += this.foodW[value.y][value.x].up;
                    fcs.down += this.foodW[value.y][value.x].down;
                } else if (value.type === 0) { // if obstacle
                    ocs.left += this.obstaclesW[value.y][value.x].left;
                    ocs.right += this.obstaclesW[value.y][value.x].right;
                    ocs.up += this.obstaclesW[value.y][value.x].up;
                    ocs.down += this.obstaclesW[value.y][value.x].down;
                }
            });
        }

        return {fcs, ocs, sensors}
    }
}

const main = new Main();
const brain = new NeuralNetwork();
const apple = new Apple();

for (let i = 0; i < 1; i++) {
    let mutation = brain.mutate(mutationStrength);
    main.snakes.push(new Snake(mutation.foodW, mutation.obstaclesW, [
        {x: main.cellSize * i+main.cellSize*1, y: main.cellSize * i},
        {x: main.cellSize * i+main.cellSize*2, y: main.cellSize * i},
        {x: main.cellSize * i+main.cellSize*3, y: main.cellSize * i},
    ], i+1))
}

setInterval(() => {
    ctx.clearRect(0, 0, main.width, main.height);

    if (!main.paused) {
        main.snakes.forEach(snake => {
            snake.energy--;
            if (snake.energy <= 0) main.gameOver(snake.id);

            if (evolve) {
                if (snake.length > main.maxScore) {
                    brain.foodW = snake.foodW;
                    brain.obstaclesW = snake.obstaclesW;
                    main.maxScore = snake.length;
    
                    console.log("Max Score beated -", snake.length);
                }
            }
            
            let sight = getSnakeSight(apple.apples, snake.coordinates, snake.length);
            let directions = brain.getDirecion(sight);
            
            directions = {
                left: directions.ocs.left + directions.fcs.left,
                right: directions.ocs.right + directions.fcs.right,
                up: directions.ocs.up + directions.fcs.up,
                down: directions.ocs.down + directions.fcs.down
            }

            let direction = highestVal(directions);

            snake.direction = direction;
            main.render(direction, snake);
        })
    } 
}, speed);
