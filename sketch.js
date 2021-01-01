 var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground, invisibleGround;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var survivalTime = 0;
var display;


function preload(){
  
//loading the animation 
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png",  "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
//loading the images
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}


function setup() {
//creating canvas 
  createCanvas(600,600);
  
//creating the monkey 
  monkey = createSprite (80,500,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
//creating the food and obstacle group
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
//invisible ground
  invisibleGround = createSprite(400,530,900,5);
  
}


function draw() {
  background("Gainsboro");
  
  
  if(gameState === PLAY){
    
    //making the monkey jump when space key is pressed 
     if(keyDown("space")&& monkey.y >= 300){
     monkey.velocityY= -10;
    }

    //destroying the bananas when the monkey touches them
     if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
     survivalTime = survivalTime+2;
    }
  
    //ending the game when monkey touches the obstacles 
     if(obstacleGroup.isTouching(monkey)){
     obstacleGroup.destroyEach();
     gameState = END;
    }
       
 }

  
//game state end
  if(gameState === END){
     monkey.velocity = 0;
     obstacle.velocity = 0;
     banana.velocity = 0;
     fill("black");
     textSize(35);
     text("Game over",200,200);
    }

//gravity effect
  monkey.velocityY = monkey.velocityY+0.8;
  monkey.collide(invisibleGround);

//calling the functions 
  food();
  obstacles();
  
//displaying the survival time
    stroke("black");
    textSize(20);
    fill("black");
    text("Survival Time: " + survivalTime,450,50);  
 
  drawSprites();
}

function food(){
//spawning the bananas at random positions
  if(World.frameCount%80==0){
    banana = createSprite(200,500,20,20);
    banana.addImage(bananaImage); 
    banana.scale=0.1;
    banana.y = Math.round(random(300,350));
    banana.velocityX=-5;
    banana.lifetime=150;

    FoodGroup.add(banana);
  }
}

function obstacles(){
//spawning the obstacles at random positions 
  if(World.frameCount%80==0){
    obstacle = createSprite(400,510,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);
  }
}





