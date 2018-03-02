var columnWidth = 160;
var rowHeight = 30;
var numColumns;
var numRows;

var sliders = [];

function setup()
{
  frameRate( 100 );
  numColumns = windowWidth / columnWidth;
  numRows = windowHeight / rowHeight;

  //  create a grid of sliders
  for( var r = 0; r < numRows; r++ )
  {
    for( var c = 0; c < numColumns; c++ )
    {
      newSlider = createSlider( -1, 1, 0, 0.1);
      newSlider.position( c * columnWidth, r * rowHeight );
      sliders.push(newSlider);
    }
  }
}

function draw()
{
  for( var i = 0; i < sliders.length; i++ )
  {
    sliders[i].value( tan( i / 50 + millis() / 100 ) );
  }
}
