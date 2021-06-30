var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var obstacle, obstacleGroup;
var score;
var survivalTime;

function preload() {
  monkey_running = loadAnimation(
    "sprite_0.png",
    "sprite_1.png",
    "sprite_2.png",
    "sprite_3.png",
    "sprite_4.png",
    "sprite_5.png",
    "sprite_6.png",
    "sprite_7.png",
    "sprite_8.png"
  );

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  monkey.y = 315;

  ground = createSprite(400, 350, 900, 10);
  ground.x = ground.width / 2;

  score = 0;
  survivalTime = 0;

  obstacleGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background("white");
  if (obstacleGroup.isTouching(monkey)) {
    monkey.y = 0;
    gamestate = END;
  }

  if (gameState === PLAY) {
    ground.velocityX = -5;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    if (keyDown("space") && monkey.y >= 310) {
      monkey.velocityY = -14;
    }
    spawnObstacles();
    spawnBanana();
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
  } else if (gameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;

    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);

    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }

  //add gravity
  if (monkey.isTouching(bananaGroup)) {
    bananaGroup.destroyEach();
    score = score + 4;
  }
  drawSprites();
  text("Score : " + score, 300, 50);

  var survivalTime = Math.round(frameCount / frameRate() / 1);
  text("Survival Time : " + survivalTime, 50, 50);
}

function spawnObstacles() {
  if (frameCount % 120 === 0) {
    obstacle = createSprite(700, 330, 10, 40);
    obstacle.velocityX = -6;

    //add image to the obstacle
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;

    //lifetime to the obstacle
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}

function spawnBanana() {
  if (frameCount % 50 === 0) {
    banana = Math.round(random(1, 4));
    banana = createSprite(400, 220, 10, 40);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    bananaGroup.add(banana);
    banana.lifetime = 300;
  }
}
