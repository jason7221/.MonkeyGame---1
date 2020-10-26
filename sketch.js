var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;

function preload(){
  monkey_running=    loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
     

    //CREATING MONKEY SPRITE
     monkey=createSprite(80,315,20,20);
     monkey.addAnimation("moving", monkey_running);
     monkey.scale=0.1

    //CREATING GROUND SPRITE
    ground = createSprite(400,350,900,10);
    ground.velocityX=-4;
    ground.x=ground.width/2;
    console.log(ground.x)

    //CREATING GROUPS
    FoodGroup = createGroup();
    obstaclesGroup = createGroup();

    //CREATING SURVIVAL TIME
    var survivalTime=0;
  
  
   score = 0;
}


function draw() {
  
    //GIVING BACKGROUNDCLOUR
    background(255);

    //INFINITE GROUND
    if(ground.x<0) {
      ground.x=ground.width/2;
    }

    // JUMP WHEN SPACE IS PRESSED
    if(keyDown("space")&& monkey.y >= 309) {
      monkey.velocityY = -15;
    }

    //GRAVITY FOR MONKEY
    monkey.velocityY = monkey.velocityY + 0.9

    //MONKEY COLLIDING THE GROUND
    monkey.collide(ground);
    
    stroke("BLACK");
    textSize(20);
    fill("BLACK");
    text("Score: "+score,300,50);
    
    //DISPLAYING FUNCTIONS
    spawnFood();
    spawnObstacles();

    drawSprites();
            
   //INCREASING SCORE
   if(FoodGroup.isTouching(monkey)){
     FoodGroup.destroyEach();
     score = score + 1
     }

    //GAMEOVER
    if(obstaclesGroup.isTouching(monkey)){
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      survivalTime = 0;
      textSize(40);
      text("GAMEOVER",75,200);
    }

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.round(frameCount/20) 
    text("Survival Time: "+ survivalTime, 100,50);
  
}


function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(150,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

    
    
