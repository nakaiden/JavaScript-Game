
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
const ctx = canvas.getContext('2d');
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
    dx = 0;
    dy = 0;
    width = 50;
    height = 100;
    color = 'red';
    rotation = 0;

    draw() {
        this.move();
        //set the draw color of my canvas to my color
        ctx.fillStyle = this.color;
        ctx.save();
        ctx.translate(this.x,this.y);

        //if this object has rotation, rotate canvas
        if(this.rotation){
            ctx.rotate(-this.rotation);
        }
         // draw a rectangle
         if(this.image){
            ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);   
         }
        else if(!this.isCircle){
            ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            ctx.beginPath();
            ctx.arc(-this.width / 2, -this.width / 2, this.width, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
        }
        ctx.restore()
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
    width = 55;
    height = 35;
    x = 400;
    y = 550;
    dy = -5;
    rotation = Math.PI / 2;
    speed = 7;
    
    move(){
        this.x += this.dx;
        this.y += this.dy;
        this.dy += .02;
        
        //check to see if football is colliding w/ goal post(true/false)
        if(this.isCollding(movingGoal)){
            console.log('Score!');

        }
        // is the football on stage
        
    }



    
  
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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //console.log('mario was drawn');
    //mario.draw();
    //mario2.draw();
    //obstacle.draw();
    movingGoal.draw();
    football.draw();
    arrow.draw();
    //console.log(football.dx,football.dy);
    setTimeout(draw, 1000 / FPS);
}



const startGameButton = document.querySelector('.main-menu button');
const mainMenu = document.querySelector('.main-menu');
const gameContainer = document.querySelector('.game-container');

canvas.addEventListener('click', () =>{
    //when we click move football to arrow
    football.x = arrow.x;
    football.y = arrow.y;
    //aim football in same direction as arrow
    football.rotation = arrow.rotation;
    //set the footballs velocity based on its rotation
    football.dx = football.speed * Math.cos(football.rotation)
    football.dy = football.speed * Math.sin(-football.rotation)
    
});

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

