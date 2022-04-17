const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con_2;
var fruit_con_3;
var rope3;
var bg;
var fruit;
var koya;
var button,button2,button3;
var koya;
var normal,eat,sad;
var mute_btn;
var fr;
var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;

function preload()
{
  bg = loadImage('Background.png');
  food = loadImage('melon.png');
  koya = loadImage('Koya.png');
  star = loadImage('star.png');
  
  
  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  normal = loadAnimation("Koya.png");
  eat = loadAnimation("Eating Koya.png");
  sad = loadAnimation("Sad Koya.png");
  empty_star = loadAnimation("empty.png");
  one_star = loadAnimation("one_star.png");
  two_stars = loadAnimation("stars.png");


  normal.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  createCanvas(800,700);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(100,90);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(450,90);
  button2.size(50,50);
  button2.mouseClicked(drop2);

  rope = new Rope(7,{x:120,y:90});
  rope2 = new Rope(7,{x:490,y:90});

  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

  blower = createImg('baloon2.png');
  blower.position(260,370);
  blower.size(120,120);
  blower.mouseClicked(airBlow)

  ground = new Ground(300,height,width,20);
  normal.frameDelay = 20;
  eat.frameDelay = 20;

  koya = createSprite(200,height-80,100,100);
  koya.scale = 0.1;

  star1 = createSprite(320,50,20,20);
  star1.addImage(star);
  star1.scale = 0.02;

  star2 = createSprite(50,370,20,20);
  star2.addImage(star);
  star2.scale = 0.02;

  star_display = createSprite(50,20,30,30);
  star_display.addAnimation('empty',empty_star);
  star_display.addAnimation('oneStar',one_star);
  star_display.addAnimation('stars',two_stars);
  star_display.changeAnimation('empty');
  star_display.scale = 0.2;

  koya.addAnimation('blinking',normal);
  koya.addAnimation('eating',eat);
  koya.addAnimation('crying',sad);
  koya.changeAnimation('blinking');

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
}


function draw() 
{
  background(51);
  image(bg,0,0,width,height);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope2.show();

  Engine.update(engine);
  ground.show();
  
  drawSprites();

  if(collide(fruit,star1,20)==true)
  {
    star1.visible = false;
    star_display.changeAnimation("oneStar");
    
  }

  if(collide(fruit,star2,20)==true){
    star2.visible = false;
    star_display.changeAnimation("stars");
  }
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.dettach();
  fruit_con = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con_2.dettach();
  fruit_con_2 = null;
}

function collide(body,sprite,x)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=x)
            {
               return true; 
            }
            else{
              return false;
            }
         }
}

function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function airBlow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03});
  air.play();
}