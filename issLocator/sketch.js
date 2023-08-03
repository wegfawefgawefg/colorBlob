// var dataURL = 'http://api.open-notify.org/iss-now.json';
// a proxy server has been setup at https://toys.dickrippers.org/api_proxy_server/iss-now
var dataURL = 'https://toys.dickrippers.org/api_proxy_server/iss-now';
// var data2URL = 'http://api.open-notify.org/astros.json';
// a proxy server has been setup at https://toys.dickrippers.org/api_proxy_server/astros
var data2URL = 'https://toys.dickrippers.org/api_proxy_server/astros';



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

var earthTexture;

var shorterDimension;
var ellipseWidth;

var context2d;
var c2dDim;

var longitudeP;
var latitudeP;
var astronaut1P;
var astronaut2P;
var astronaut3P;
var readoutDiv;

function preload() {
  longitudeP = select('#longitude');
  latitudeP = select('#latitude');
  astronaut1P = select('#astronaut1');
  astronaut2P = select('#astronaut2');
  astronaut3P = select('#astronaut3');
  readoutDiv = select('#readout');

  loadData();
  print(data);

  earthTexture = loadImage('earthERPLLSmall.gif');
}

function setup() {
  frameRate(1000);
  var canvas3D = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas3D.style('z-index', '-2');
  canvas3D.position(0, 0);

  setInterval(loadData, 2000);
  colorMode(HSB, 360, 100, 100, 1);

  //  //   which is shorter height or width
  shorterDimension = min(height, width);
  ellipseWidth = shorterDimension / 2;

  //  set map variables
  mapX = 0;
  mapY = 0;
  mapWidth = width / 2;
  mapHeight = height / 2;

  //
  c2sDim = shorterDimension / 2;
  context2d = createGraphics(500, 500);
}
function draw() {
  background(0);
  fill(255);

  //  mouse rotation
  // var verticalRotNormalized = map( mouseY, 0, height, 0, 1 );
  // var horizontalRotNormalized = map( mouseX, 0, width, 1, 0 );
  // var mxRot = map( verticalRotNormalized, 0, 1, HALF_PI, -HALF_PI );
  // var myRot = map( horizontalRotNormalized, 0, 1, 0, TWO_PI );

  //  iss rotation
  var issNormalizedX = map(longitude, -180, 180, 1, 0);
  var issNormalizedY = map(latitude, -90, 90, 0, 1);
  var xRot = map(issNormalizedY, 0, 1, HALF_PI, -HALF_PI);
  var yRot = map(issNormalizedX, 0, 1, 0, TWO_PI);

  //  draw the earth
  //  //   which is shorter height or width
  var shorterDimension = min(height, width);
  var earthRadius = shorterDimension / 4;

  //  draw earth
  push();
  stroke(255);
  translate(0, 0);
  rotateX(xRot);
  rotateY(yRot);
  texture(earthTexture);
  sphere(earthRadius);
  pop();

  //  draw ISS
  push();
  noStroke();
  fill(0, 100, 100, 1.0);
  translate(0, 0, earthRadius * 2);
  sphere(2, 5, 5);

  stroke(0, 100, 100, 1.0);
  strokeWeight(1);
  var lineLength = shorterDimension / 10;
  line(0, 0, -windowWidth, 0);
  translate(lineLength, -height / 8);
  pop();

  push();
  var lineStartX = windowWidth / 10 + mouseX;
  var lineStartY = windowHeight / 10;
  var lineEndY = lineStartY;
  var lineEndX = windowWidth / 5;
  //resetMatrix();
  translate(-windowWidth / 2, -windowHeight / 2);
  strokeWeight(5);
  line(0, windowHeight / 4, windowWidth / 10, windowHeight / 4);
  line(3, windowHeight / 4, 3, windowHeight / 2);

  pop();
}

//  function to load json data from api
function loadData() {
  // data = loadJSON(dataURL, dealWithData, 'jsonp');
  // data2 = loadJSON(data2URL, dealWithData2, 'jsonp');
  data = loadJSON(dataURL, dealWithData);
  data2 = loadJSON(data2URL, dealWithData2);
}

//  distribute the data into variables
function dealWithData(data) {
  longitude = data.iss_position.longitude;
  longitudeP.html('Longitude: ' + longitude);
  latitude = data.iss_position.latitude;
  latitudeP.html('Latitude: ' + latitude);
}

//  distribute the data into variables
function dealWithData2(data) {
  try {
    astronaut1 = data.people[0].name;
  }
  catch (err) {
    astronaut1 = '';
  }
  try {
    astronaut2 = data.people[1].name;
  }
  catch (err) {
    astronaut2 = '';
  }
  try {
    astronaut3 = data.people[2].name;
  }
  catch (err) {
    astronaut3 = '';
  }

  astronaut1P.html(astronaut1);
  astronaut2P.html(astronaut2);
  astronaut3P.html(astronaut3);
}
