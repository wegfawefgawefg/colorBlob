var anim = [
    "({})  0=====8",
    "({}) 0=====8",
    "({})0=====8",
    "({}0=====8",
    "({0=====8",
    "({=====8",
    "({====8",
    "({===8",
    "({==8",
    "({=8",
    "({8",
];

var currentFrame = 0;
var animDirection = 1;

var frameDuration = 20;
var deltaTime;
var lastTime;
var timer = 0;

var panSound;

function setup()
{
  //  prep drawing field
  createCanvas( windowWidth, windowHeight );
  frameRate( 1000 );
  noSmooth();
  textAlign( CENTER );

  //  load assets
  panSound = loadSound( 'sounds/pan.mp3' );

  //  set state
  lastTime = millis();
}

function draw()
{
  background( 255 );

  //  shift to center for drawing
  push();
  var x = width / 2;
  var y = height / 2;
  translate( x, y );
  rotate( sin( millis() / 100 ) / 10 );

  //  set draw conditions
  stroke( 0 );
  fill( 0 );
  textSize( sin( millis() / 100 ) * 10 + 40 );

  //  draw
  text( anim[currentFrame], 0, 0 );

  //  shift back
  pop();

  //  deal with deltaTime
  deltaTime = millis() - lastTime;
  timer += deltaTime;
  if( timer > frameDuration )
  {
    timer = 0

    //  check for on first frame and going backwards
    if( (currentFrame === 0) && (animDirection === -1) )
    {
        animDirection = 1;
    }
    //  check for on last frame and going forwards
    if( (currentFrame === (anim.length - 1)) && (animDirection === 1) )
    {
      animDirection = -1;
    }

    //  increment the animation frame
    currentFrame = currentFrame + animDirection;
  }

  //  play sound if its last frame
  if( currentFrame == (anim.length - 1) )
  {
    panSound.play();
  }

  //  update state
  lastTime = millis();
}
