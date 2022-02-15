
// RAM = Random Access Memory = variables
// CPU = Central Proccesing Unit = logic execution
// GPU = Graphics Proccsing Unit = logic for images and image manipulation
// FPS = Frames Per Second = how fast our game runs
const debug = document.querySelector('.debug');
debug.innerText = 'hello world';
const canvas = document.querySelector('canvas');
canvas.x = 0;
canvas.y = 0;
const goalPostImg = new Image();
goalPostImg.src = './img/goalpost.gif'
const footballImg = new Image();
footballImg.src = './img/football1.png'
const arrowImg = new Image();
arrowImg.src ='./img/arrow.png';

// get the functions for 2d rendering on our canvas
const ctx = canvas.getContext('2d');
//let x = 50;
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
    goalZone = new DrawObject();
    constructor(){
        super()
        this.goalZone.width = 60;
        this.goalZone.height = 60;
        this.goalZone.color = 'yellow';
    }
    
    move(){
        this.x -=2 * this.direction;
        if(this.x < 60){
            this.direction = -1;
        }
        if(this.x > 650){
            this.direction = 1;
        }
        this.goalZone.x = this.x
        this.goalZone.y = this.y
        this.goalZone.draw();
    }
}

class Arrow extends DrawObject{
    image = arrowImg;
    rotation = Math.PI / 2;
    width = 40;
    height = 25;
    y = 580;
    x = 400;
    move(){
        //find the angle between the mouse and the arrow;
        let radians = Math.atan2(this.y - mouse.y, mouse.x - this.x)
        //make sure that angle is between 0 and 2PI
        this.rotation = mod(radians, Math.PI * 2) + Math.PI / 4;
        
        if(!football.gravity){

            football.rotation = this.rotation
            football.x = this.x + 100 * Math.cos(this.rotation)
            football.y = this.y + 100 * Math.sin(-this.rotation)
        }
        
    }
}
class Football extends DrawObject{
    image = footballImg;
    width = 55;
    height = 35;
    x = 400;
    y = 500;
    //dy = -5;
    rotation = Math.PI / 2;
    speed = 7;
    reset(){
        this.x = 400;
        this.y = 500;
        this.dx = 0;
        this.dy = 0;
        this.gravity = false;

    }
    
    move(){
        this.x += this.dx;
        this.y += this.dy;
        if(this.gravity) this.dy += .02;
        
        //check to see if football is colliding w/ goal post(true/false)
        if(this.isCollding(movingGoal.goalZone)){
            score += 3;
            debug.innerText = `score: ${score}`;
            this.reset();

        }
        // is the football on stage
        if(!this.isCollding(canvas)){
            this.reset()
        }         
    }
    kick(){
          //when we click move football to arrow
        this.x = arrow.x;
        this.y = arrow.y;
        //aim football in same direction as arrow
        this.rotation = arrow.rotation;
        //set the footballs velocity based on its rotation
        this.dx = this.speed * Math.cos(this.rotation)
        this.dy = this.speed * Math.sin(-this.rotation)
        this.gravity = true;
        console.log(mouse.x,mouse.y);
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
  football.kick()
    
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

