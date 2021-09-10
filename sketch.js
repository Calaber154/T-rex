//variables

var trex, trex_running, edges;
var groundImage;
var floor;
var invisibleground;
var cloud;
var cloudanimation;
var cactus1;
var cactus2;
var cactus3;
var cactus4;
var cactus5;
var cactus6;
var cactuss;
var score=0;
var groupclouds;
var groupcactuss; 
var PLAY=1;
var END=0;
var gamestate = PLAY;
var trexcol;
var gameover;
var restart;
var Gameover;
var Restart;
var checkpoint;
var jump;
var die;
var ave;
var groupterodactilos;
var moon;
function preload()
 {
  trex_running =      loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudanimation=
  loadImage ("cloud.png");
   cactus1=
     loadImage ("obstacle1.png");
   cactus2=
     loadImage ("obstacle2.png");
     cactus3=
     loadImage ("obstacle3.png");
     cactus4=
     loadImage ("obstacle4.png");
     cactus5=
     loadImage ("obstacle5.png");
     cactus6=
   loadImage ("obstacle6.png");
   trexcol=
   loadImage ("trex_collided.png");
  gameover=
    loadImage ("gameOver.png");
   restart=
     loadImage ("restart.png");
   checkpoint=
     loadSound ("checkPoint.mp3");
  jump=
     loadSound ("jump.mp3");
   die=
     loadSound ("die.mp3");
  
 }
  //terminan variables
 function setup()
{
  
  createCanvas(600,200);
  var mensaje="HOLAA";
  
  
  //crea el Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trexcol);
  floor = createSprite (100,175,600,5);
  floor.addImage(groundImage);
  edges = createEdgeSprites();
  invisibleground = createSprite (300,180,600,5);
  invisibleground.visible = false;
  Gameover = createSprite (300,100);
Gameover.addImage(gameover);
  Gameover.visible=false;
  Restart = createSprite (300,150);
  Restart.addImage(restart);
  Restart.visible=false;
 
  //añade escala y posición al Trex
  trex.scale = 0.5;
  trex.x = 50
  Gameover.scale =0.7;
  Restart.scale =0.5;
  groupclouds=new Group();
  groupcactuss=new Group();
  groupterodactilos=new Group();
  //collideradius
  trex.debug=false;
  trex.setCollider("rectangle",0,0,trex.width,trex.height);

  
}
 
 //empieza draw
function draw()
{
  //establece un color de fondo 
  background("white");
  
  
  //el getframe sirve para obtener el frame de la maquina(computadora);
  if(score%100==0&&score>0)
    {
      checkpoint.play();
    }
  text ("score.."+ score,530,15);
  //EMPIEZA PLAY
  if (gamestate==PLAY)
  {
    score = score +Math.round(getFrameRate()/60);
  
    //el piso se mueve
     floor.velocityX = -(7+score/100);
    
    
    
     //salta cuando se presiona la barra espaciadora
  if(keyDown("space") && trex.y >= 170)
  {
    trex.velocityY = -10;
    jump.play();
  }
  
  if (score>300)
      {
      terodactilos();
      }
    //si se acaba el suelo de vuelve a generar
    if (floor.x <0)
    {
      floor.x = 300;  
    }
    //gravedad de jugador
    trex.velocityY = trex.velocityY + 0.5;
    //-----------------------------------------
    
    Clouds ();
  cactus();
    
    
    if (groupcactuss.isTouching(trex))
    {
   
      trex.changeAnimation("collide",trexcol)
      gamestate=END;
       die.play();
    }
    
    score = score +Math.round(getFrameRate()/60);
    
    if(groupterodactilos.isTouching(trex))
    {
      trex.changeAnimation("collide",trexcol)
      gamestate=END;
       die.play();
    }
    
    if(score==500)
    {
    
      moon=createSprite(570,70,50,50);
      
   }
  //console.log(score)  
  }
  
  
  else if (gamestate==END)
  {
    floor.velocityX=0;
    groupclouds.setVelocityXEach(0);
    groupcactuss.setVelocityXEach(0);
    trex.velocityY=0;
    groupclouds.setLifetimeEach(-1);
    groupcactuss.setLifetimeEach(-1);
    Gameover.visible=true;
    Restart.visible=true;
    if(mousePressedOver(Restart))
    {
      reset();
    }
    
  }
  
  
  
  
  //ingresa la posición y del Trex
  //console.log(trex.y) 
  
  
  
  //evita que el Trex caiga
  trex.collide(edges[3])
  
  
  drawSprites();
 }  
//funciones

function Clouds () 
 {
  if (frameCount %60 == 0) 
      {
       cloud = createSprite(550,40,40,20);
        cloud.addImage (cloudanimation);
        cloud.y = Math.round (random(40,80));
       cloud.velocityX = -5;
        cloud.depth = trex.depth;
        trex.depth = trex.depth +1;
        cloud.lifetime = 120;
        groupclouds.add(cloud);
      }
   
   
 
 }

function cactus ()
{
  if (frameCount %60 == 0)
  {
    cactuss = createSprite(550,175,20,40);
    cactuss.velocityX = -(7+score/100);
    var rand = Math.round (random(1,6));
    switch (rand) 
    {
      case 1:cactuss.addImage(cactus1);
        break;
        case 2:cactuss.addImage(cactus2);
        break;
        case 3:cactuss.addImage(cactus3);
        break;
        case 4:cactuss.addImage(cactus4);
        break;
        case 5:cactuss.addImage(cactus5);
        break;
        case 6:cactuss.addImage(cactus6);
        break;
        default:break;
        
    }
    cactuss.scale = 0.5;
    cactuss.lifetime = 120;
    groupcactuss.add(cactuss);
  }
}
function reset()
{
  gamestate=PLAY;
  Restart.visible=false;
  Gameover.visible=false;
  groupcactuss.destroyEach();
  groupclouds.destroyEach();
  score=0;
  trex.changeAnimation("running",trex_running);
  
}
function terodactilos()
{
  
  if (frameCount %90 == 0)
  {
    ave=createSprite (300,100,20,20);
    ave.y = Math.round (random(50,150));
    ave.velocityX=-5
    ave.depth = trex.depth;
    trex.depth = trex.depth +1;
    ave.lifetime = 120;
   groupterodactilos.add(ave);

  }
    
}