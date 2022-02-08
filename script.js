
// RAM = Random Access Memory = variables
// CPU = Central Proccesing Unit = logic execution
// GPU = Graphics Proccsing Unit = logic for images and image manipulation
// FPS = Frames Per Second = how fast our game runs
const debug = document.querySelector('.debug');
debug.innerText = 'hello world';
const canvas = document.querySelector('canvas');
const goalPostImg = new Image();
goalPostImg.src = './img/goalpost.gif'
const footballImg = new Image();
footballImg.src = './img/football1.png'
const arrowImg = new Image();
arrowImg.src ='./img/arrow.png';

// get the functions for 2d rendering on our canvas
const context = canvas.getContext('2d');
let x = 50;
let score = 0;
debug.innerText = `score: ${score}`;

//this is a global object that keeps track of the mouse position
const mouse = {
    x: 0,
    y: 0
}
//grabs a rectangle based on the dimensions of the canvas
const canvasRect = canvas.getBoundingClientRect();
// when mouse moves over the canvas update the x and y
canvas.addEventListener('mousemove', e =>{
    mouse.x = e.clientX - canvasRect.left;
    mouse.y = e.clientY - canvasRect.top;
    //debug.innerText = `${mouse.x}, ${mouse.y}`;
});

const FPS = 60;
class DrawObject{
    x = 50;
    y = 50;
    width = 50;
    height = 100;
    color = 'red';
    rotation = 0;

    draw() {
        this.move();
        //set the draw color of my canvas to my color
        context.fillStyle = this.color;
        context.save();
        context.translate(this.x,this.y);

        //if this object has rotation, rotate canvas
        if(this.rotation){
            context.rotate(-this.rotation);
        }
         // draw a rectangle
         if(this.image){
            context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);   
         }
        else if(!this.isCircle){
            context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            context.beginPath();
            context.arc(-this.width / 2, -this.width / 2, this.width, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
        context.restore()
        // this.x += 3;
    }
    move(){
        if(this.right){
            this.x += this.speed;
        }
        if(this.left){
            this.x -= this.speed;
        }
        if(this.up){
            this.y -= this.speed;
        }
        if(this.down){
            this.y += this.speed;
        }
    }
    isCollding(obj){
        return this.x < obj.x + obj.width &&
        this.x + this.width > obj.x &&
        this.y < obj.y + obj.height &&
        this.height + this.y > obj.y
    }
}
class Mario extends DrawObject{
    speed = 3;
    move(){
        DrawObject.prototype.move.apply(this);
        if(this.isCollding(obstacle) && this !== obstacle){
            this.color = 'purple';
            obstacle.x = Math.random() * canvas.width;
            obstacle.y = Math.random() * canvas.height;
            score++;
            debug.innerText = `score: ${score}`;
        } else {
            this.color = 'red'
        }
    }
}
class Mario2 extends DrawObject{
    speed = 3;
    move(){
        DrawObject.prototype.move.apply(this);
        if(this.isCollding(obstacle) && this !== obstacle){
            this.color = 'purple';
            obstacle.x = Math.random() * canvas.width;
            obstacle.y = Math.random() * canvas.height;
            score++;
            debug.innerText = `score: ${score}`;
        } else {
            this.color = 'yellow'
        }
    }
}
class Obstacle extends DrawObject{
    width = 25;
    height = 25;
    isCircle = true;
    color = 'blue';
    x = 500;
    y = 400;
}


class MovingGoal extends DrawObject{
    image = goalPostImg;
    x = 400;
    width = 300;
    height = 400;
    direction = 1
    
    move(){
        this.x -=2 * this.direction;
        if(this.x < 60){
            this.direction = -1;
        }
        if(this.x > 650){
            this.direction = 1;
        }
    }
}

class Arrow extends DrawObject{
    image = arrowImg;
    rotation = Math.PI / 2;
    width = 40;
    height = 25;
    y = 475;
    x = 400;
    move(){
        //this.rotation = (Math.atan2(this.y - mouse.y, mouse.x - this.x) + Math.PI * 2) % Math.PI * 2;
        //find the angle between the mouse and the arrow;
        let radians = Math.atan2(this.y - mouse.y, mouse.x - this.x)
        //make sure that angle is between 0 and 2PI
        this.rotation = mod(radians + Math.PI / 2, Math.PI * 2) - Math.PI / 2;
        debug.innerText = this.rotation //* 180 / Math.PI;
         if(this.rotation < Math.PI /6){
             this.rotation = Math.PI /6
         }else if(this.rotation > 5 * Math.PI / 6){
             this.rotation = Math.PI * 5 / 6
         }
        
    }
}
class Football extends DrawObject{
    image = footballImg;
    width = 35;
    height = 55;
    x = 400;
    y = 550;
}
const football = new Football();
const arrow = new Arrow();
const movingGoal = new MovingGoal();
//const mario = new Mario();
const mario2 = new Mario2();
mario2.y = 200;
mario2.x = 13;
mario2.color = 'yellow';

//const obstacle = new Obstacle();
// listen for input
window.addEventListener('keydown', e => {
    console.log(e);
    e.preventDefault();
    if(e.key == 'ArrowRight'){
        mario.right = true;
    }
    if(e.key == 'ArrowLeft'){
        mario.left = true;
    }
    if(e.key == 'ArrowUp'){
        mario.up = true;
    }
    if(e.key == 'ArrowDown'){
        mario.down = true;
    }
});
window.addEventListener('keyup', e => {
    console.log(e);
    e.preventDefault();
    if(e.key == 'ArrowRight'){
        mario.right = false;
    }
    if(e.key == 'ArrowLeft'){
        mario.left = false;
    }
    if(e.key == 'ArrowUp'){
        mario.up = false;
    }
    if(e.key == 'ArrowDown'){
        mario.down = false;
    }
});



function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height)
    //console.log('mario was drawn');
    //mario.draw();
    //mario2.draw();
    //obstacle.draw();
    movingGoal.draw();
    football.draw();
    arrow.draw();
    setTimeout(draw, 1000 / FPS);
}

const startGameButton = document.querySelector('.main-menu button');
const mainMenu = document.querySelector('.main-menu');
const gameContainer = document.querySelector('.game-container');


startGameButton.addEventListener('click', () => {
    //hide the main menu
    mainMenu.classList.add('hidden');
    //show the game container
    gameContainer.classList.remove('hidden');
    draw();
});

function mod(n, m) {
    return ((n % m) + m) % m;
}

// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
// var x = canvas.width/2;
// var y = canvas.height-30;
// var dx = 2;
// var dy = -2;

// canvas.addEventListener('click',clicked)
// function clicked(){
// x = canvas.width/2;
// y = canvas.height-30;
// setInterval(draw, 10);
// }
// function drawBall() {
//     ctx.beginPath();
//     ctx.arc(x, y, 10, 0, Math.PI*2);
//     ctx.fillStyle = "#0095DD";
//     ctx.fill();
//     ctx.closePath();
// }

// function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawBall();
//   //  x += dx;
//     y += dy;
//     dy += .02;
// }

// drawBall();