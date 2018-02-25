//  ----- GLOBAL STATE  ----- //
//  //  set once in setup based on
var baseX;
var baseY;

function setup()
{
  createCanvas( windowWidth, windowHeight - 500 );
  frameRate( 1000 );
  noSmooth();

  angleMode( RADIANS );
  colorMode( HSB, 360, 100, 100, 1 );

  //  create interface
	slider_firstBranchLength =  createSlider( 0, 1000, 100, 1 );
  slider_branchLengthDecay =  createSlider( 0, 1.0, 0.8, 0.01 );
  slider_numLevels =          createSlider( 0, 10, 5, 1 );
  slider_translucency =       createSlider( 0, 1.0, 1.0, 0.01 );
  checkbox_backgroundClear =  createCheckbox( '', true );

  //  set slider positions
  slider_firstBranchLength.position(  0, 0 );
  slider_branchLengthDecay.position(  0, slider_firstBranchLength.y + slider_firstBranchLength.height );
  slider_numLevels.position(          0, slider_branchLengthDecay.y + slider_branchLengthDecay.height );
  slider_translucency.position(       0, slider_numLevels.y + slider_numLevels.height );
  checkbox_backgroundClear.position(  0, slider_translucency.y + slider_translucency.height );

  baseX = width / 2;
  baseY = height / 3;
}
function draw()
{
  if( checkbox_backgroundClear.checked() === true )
  {
    background( 255 );
  }

  //  draw slider labels
  textSize( 15 );
  textAlign( LEFT );
  text( "First Branch Length: " + slider_firstBranchLength.value(),
        slider_firstBranchLength.x + slider_firstBranchLength.width + 20,
        slider_firstBranchLength.y  + slider_firstBranchLength.height );
  text( "Branch Length Decay: " + slider_branchLengthDecay.value(),
        slider_branchLengthDecay.x + slider_branchLengthDecay.width + 20,
        slider_branchLengthDecay.y  + slider_branchLengthDecay.height );
  text( "Number of Levels: " + slider_numLevels.value(),
        slider_numLevels.x + slider_numLevels.width + 20,
        slider_numLevels.y  + slider_numLevels.height );
  text( "Translucensy: " + slider_translucency.value(),
        slider_translucency.x + slider_translucency.width + 20,
        slider_translucency.y  + slider_translucency.height );
  text( "Clear Background Each Frame: " + checkbox_backgroundClear.checked(),
        checkbox_backgroundClear.x + slider_translucency.width + 20,
        checkbox_backgroundClear.y  + slider_translucency.height );

  push();
  translate( baseX, baseY );
  branch( slider_firstBranchLength.value(), slider_numLevels.value() );
  pop();
}

function branch( length, layer )
{
  if( layer === 0 )
  {
    return
  }

  stroke( 0, 0, 0, slider_translucency.value() );
  strokeWeight( 5 );
  line( 0, 0, 0, length );

  translate( 0, length );

  length = length * slider_branchLengthDecay.value();
  layer = layer - 1

  push();
  var leftAngle = map( mouseX, 0, width, 0, TWO_PI  );
  rotate( leftAngle + PI );
  branch( length, layer );
  pop();

  push();
  var mouseYCapped = min( height, mouseY );
  var rightAngle = map( mouseYCapped, 0, height, 0, TWO_PI );
  //rotate( rightAngle + PI );
  rotate( rightAngle + PI );
  branch( length, layer );
  pop();
}
