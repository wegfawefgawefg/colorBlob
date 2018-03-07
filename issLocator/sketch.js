var dataURL = 'http://api.open-notify.org/iss-now.json';
var data2URL = 'http://api.open-notify.org/astros.json';
var data;
var data2;

var astronaut1 = '';
var astronaut2 = '';
var astronaut3 = '';

var longitude = 0;
var latitude = 0;

var mapX;
var mapY;
var mapWidth;
var mapHeight;

var mapImage;
var earthTexture;

var shorterDimension;
var ellipseWidth;

var context2d;
var c2dDim;

function preload()
{
  loadData();
  print( data );

  mapImage = loadImage( 'UTM_WORLD.gif' );
  earthTexture = loadImage( 'earthERPLL.jpg' );
}

function setup()
{
  frameRate( 1000 );
  createCanvas( windowWidth, windowHeight, WEBGL );

  setInterval( loadData, 2000 );
  colorMode( HSB, 360, 100, 100, 1 );


  //  //   which is shorter height or width
  shorterDimension = min( height, width );
  ellipseWidth =  shorterDimension / 2;

  //  set map variables
  mapX = 0;
  mapY = 0;
  mapWidth = width / 2;
  mapHeight = height / 2;

  //
  c2sDim = shorterDimension / 2;
  context2d = createGraphics( 500, 500 );
}
function draw()
{
  background( 0 );
  fill( 255 );
  //stroke( 255 );
  //strokeWeight( 1 );
  //textSize( 20 );

  //  mouse rotation
  var verticalRotNormalized = map( mouseY, 0, height, 0, 1 );
  var horizontalRotNormalized = map( mouseX, 0, width, 1, 0 );
  var mxRot = map( verticalRotNormalized, 0, 1, HALF_PI, -HALF_PI );
  var myRot = map( horizontalRotNormalized, 0, 1, 0, TWO_PI );

  //  iss rotation
  var issNormalizedX = map( longitude, -180, 180, 1, 0 );
  var issNormalizedY = map( latitude, -90, 90, 0, 1 );
  var xRot = map( issNormalizedY, 0, 1, HALF_PI, -HALF_PI );
  var yRot = map( issNormalizedX, 0, 1, 0, TWO_PI );

  //  draw the earth
  //  //   which is shorter height or width
  var shorterDimension = min( height, width );
  var earthRadius =  shorterDimension / 4;
  stroke( 255 );
  //fill( 218, 70, 50, 0.9 );
  //noFill();
  push();
  translate( 0, 0 );
  rotateX( xRot );
  rotateY( yRot );

  //translate( width / 2, height / 2 );
  texture( earthTexture );
  sphere( earthRadius );

  pop();

  push();
  noStroke();
  fill( 0, 100, 100, 1.0 );
  translate( 0, 0, earthRadius * 2 );
  sphere( 2, 5, 5 );

  stroke( 0, 100, 100, 1.0 );
  strokeWeight( 1 );
  var lineLength = shorterDimension / 10;
  line( 0, 0, lineLength, -height / 8 );
  translate( lineLength, -height / 8 );
  line( 0, 0, lineLength, 0 );
  translate( lineLength, 0 );
  //  draw the text
  context2d.background( 0 );
  context2d.fill( 255 );
  context2d.textSize( 30 );
  context2d.noStroke();
  context2d.text( 'Internation Space Station', 20, 40 );
  context2d.text( 'Longitude: ' + longitude, 50, 90 );
  context2d.text( 'Latitude: ' + latitude, 50, 140 );
  context2d.text( 'Some Astronauts', 20, 200 );
  context2d.text( astronaut1, 50, 250 );
  context2d.text( astronaut2, 50, 300 );
  context2d.text( astronaut3, 50, 350 );

  context2d.stroke( 255, 0, 0 );
  context2d.line( 0, 0, 0, context2d.height );
  context2d.strokeWeight( 5 );
  context2d.line( 0, 0, 10, 0 );
  context2d.line( 0, context2d.height, 10, context2d.height );
  texture( context2d );
  plane( lineLength );
  pop();
}

//  function to load json data from api
function loadData()
{
  data = loadJSON( dataURL, dealWithData, 'jsonp' );
  data2 = loadJSON( data2URL, dealWithData2, 'jsonp' );
}

//  distribute the data into variables
function dealWithData( data )
{
  longitude = data.iss_position.longitude;
  latitude = data.iss_position.latitude;
}

//  distribute the data into variables
function dealWithData2( data )
{
  try
  {
    astronaut1 = data.people[0].name;
  }
  catch(err)
  {
    astronaut1 = '';
  }
  try
  {
    astronaut2 = data.people[1].name;
  }
  catch(err)
  {
    astronaut2 = '';
  }
  try
  {
    astronaut3 = data.people[2].name;
  }
  catch(err)
  {
    astronaut3 = '';
  }
}


//TODO:
//  map longitude and latitude to 0 and 1????
//  draw the circles :!
//  draw earth
//  draw the iss
