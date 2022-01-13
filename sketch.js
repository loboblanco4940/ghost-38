var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost,ghostImg, ghostGroup;
var soul,soulImg;
var invisibleBlockGroup;
var gameState = "PLAY";
var score = 0;
var spawndoors;
var spawnsoul;


function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound ("spooky.wav");
  soulImg = loadImage("soul.png");

  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  soulGroup = new Group();

  score = 0;
}

function setup() {


  createCanvas(displayWidth - 20, displayHeight - 30);
  
  spookySound.loop();
  
  tower = createSprite (displayWidth - 700 ,displayHeight - 600);
  tower.addImage ("tower",towerImg);
  tower.scale = 2.3;
  tower.velocityY = 1;
  
  spawndoors = new spawnDoors();
  spawnsoul = new spawnSoul();

  ghost = createSprite (displayWidth - 700,displayHeight - 500, 100,100);
  ghost.addImage ("ghost", ghostImg);

   textSize(70);
  stroke("yellow");
  text("soul : "+ score,displayWidth -900,displayHeight - 500);
  
  ghost.scale = 0.4;
}

function draw() {
  background('black');

 

  if (gameState === "PLAY"){
    
    if( ghost.isTouching(soulGroup)) {
      soulGroup.destroyEach();
      
      score = score + 20;
    
    }
  
  
  if (tower.y > 400 ) {
    tower.y = 300;
  }
  
  if (keyDown ("SPACE")) {
    ghost.velocityY = -5;
    camera.position.x = ghost.x ;
    camera.position.y = displayHeight/2;
  }
 
  if (keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x -3;
  }
  
  if (keyDown("right_arrow")) {
    ghost.x = ghost.x + 3;
  }
  
  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0;
  }
  
  if (invisibleBlockGroup.isTouching(ghost) || (ghost.Y)) {
    
    ghost.destroy();
    gameState = "END";
  }
  
  ghost.velocityY = ghost.velocityY + 0.2;

  
  
  spawnSoul();
  spawnDoors();
  drawSprites();
  }
  
  if (gameState === "END") {
    stroke ("yellow");
    fill ("yellow");
    textSize (70);
    text ("GAME OVER",displayWidth - 900 ,displayHeight - 500);
  }
}
