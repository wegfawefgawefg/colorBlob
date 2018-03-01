var columnWidth = 45;
var rowHeight = 30;
var numColumns;
var numRows;

function setup()
{
  frameRate( 100 );

  // var columnWidth = windowWidth / numColumns;
  // var rowHeight = windowHeight / numRows;
  numColumns = windowWidth / columnWidth;
  numRows = windowHeight / rowHeight;

  //  create a grid of paragraphs
  for( var r = 0; r < numRows; r++ )
  {
    for( var c = 0; c < numColumns; c++ )
    {
      newPara = createP('---');
      //newPara = createP('dog');
      //  set margin of paragraphs
      //newPara.style('margin', );
      //  position the paragraphs
      newPara.position( c * columnWidth, r * rowHeight );

      //  set paragraph callbacks
      newPara.mouseOver( turnOn );
      newPara.mouseOut( turnOff );
    }
  }
}

function draw()
{

}

function turnOn()
{
  this.style('font-size', 50);
  this.style('background-color', '#020');
}

function turnOff()
{
//   this.style('font-size', 10);
//   this.style('background-color', '#000');
}
