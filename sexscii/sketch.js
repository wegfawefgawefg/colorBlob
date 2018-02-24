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

function setup()
{
  createCanvas( windowWidth, windowHeight );
  frameRate( 1000 );
  noSmooth();

  lastTime = millis();
}

function draw()
{
  background( 255 );
  stroke( 0 );
  fill( 0 );

  var x = width;
  var y = height / 2;

  push();
  translate( x, y );
  rotate( sin( millis() / 100 ) / 10 );
  textSize( sin( millis() / 100 ) * 10 + 100 );
  textAlign( CENTER );
  text( anim[currentFrame], 0, 0 );
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

  lastTime = millis();
}
