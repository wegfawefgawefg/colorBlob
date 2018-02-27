class Stopsign
{
		constructor( screenWidth, screenHeight)
		{
			this.distance = random( 1, 5 );
			this.poleX = random( screenWidth );
			this.poleY = screenHeight + 20;
			this.poleLength = random( height / 2, height * 1.5 ) * (1/this.distance);
			this.poleThickness = (this.poleLength / 40) * (1/this.distance);
			this.signPos = random( 0.7, 0.9 ) * this.poleLength;
			this.signSize = (this.poleLength / 5) * (1/this.distance);
			this.poleAngle = random( -QUARTER_PI, QUARTER_PI );
		}

		render()
		{
			//	draw pole
			noStroke();
			fill( 50, 50, 50, 256 );
			push();
			translate( this.poleX, this.poleY );
			rotate( PI );
			rotate( this.poleAngle );
			rectMode(CORNER);
			rect( 0, 0, this.poleThickness, this.poleLength );

			//	draw sign
			translate( 0, this.signPos );
			push();
			rotate( PI * 0.36 );
			fill( 255, 255, 255 );
			polygon( 0, 0, this.signSize, 8 );
			fill( 255, 0, 0 );
			polygon( 0, 0, this.signSize * 0.9, 8 );
			pop();

			//	//	draw text on sign
			fill( 255, 255, 255 );
			stroke( 255, 255, 255 );
			textAlign( CENTER );
			textStyle(BOLD);
			textSize( this.signSize / 2 );
			text( 'STOP', 0, this.signSize * 0.2 );
			pop();
		}
}

var numStopsigns = 20;
var stopsigns = [];

function setup() {
	createCanvas( windowWidth, windowHeight );
	frameRate(1000);

	for( var i = 0; i < numStopsigns; i++ )
	{
		var stopsign = new Stopsign( width, height );
		stopsigns.push( stopsign );
	}

	//	sort signs from back to front
	stopsigns.sort( function(a, b) { return a.distance - b.distance } );
	stopsigns.reverse();

}

function draw()
{
	background( 135, 206, 250 );

	//	render each stopsign
	for( var i = 0; i < numStopsigns; i++ )
	{
		stopsigns[i].render();
	}
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
