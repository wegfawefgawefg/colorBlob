var baseX;
var baseY;
var branchLengthDecay = 0.9;
var firstBranchLength = 100;

var drawTime = 2000;

function setup()
{
  createCanvas( 800, 1500 );
  frameRate( 1000 );
  noSmooth();

  angleMode( RADIANS );
  colorMode( HSB, 360, 100, 100, 1 );

  baseX = width / 2;
  baseY = 0;
}

function draw()
{
  //background( 255 );

  noStroke();
  fill( 255 );
  strokeWeight( 1 );

  background( 233 );
  
  push();
  translate( baseX, height / 2 );
  branch( firstBranchLength, 5 );
  pop();
}

function branch( length, layer )
{
  if( layer === 0 )
  {
    return
  }

  //line( 0, 0, 0, length );
  translate( 0, length );
  if( layer === 1 )
  {
    ellipse( 0, 0, 200, 200 );
  }

  length = length * branchLengthDecay;
  layer = layer - 1

  var secTime = millis() % drawTime;
  var angle = map( secTime, 0, drawTime - 1, 0, TWO_PI  );

  var colorOne = color( map( angle, 0, TWO_PI, 100, 350 ), 100, 100, 0.01 );
  fill( colorOne );

  push();
  rotate( millis() / 100 );
  branch( length, layer );
  pop();


  push();
  rotate( -angle );
  branch( length, layer );
  pop();
}
