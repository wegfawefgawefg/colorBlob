var numWalkers = 100;
var walkers = [];

var walkerStepSize = 2;

function setup() {
	createCanvas( windowWidth, windowHeight );
	frameRate(1000);

	for( var i = 0; i < numWalkers; i++ )
	{
		var walker = {
			x: random( width ),
			y: random( height ),
		};
		walkers.push( walker );
	}
}

function draw()
{
	background( 255, 1 );
	//	itterate through walkers
	for( var i = 0; i < numWalkers; i++ )
	{
			//	step the walker
			walkers[i].x += random( -walkerStepSize, walkerStepSize );
			walkers[i].y += random( -walkerStepSize, walkerStepSize );

			//	step the walker slightly towards mouse
			if( mouseIsPressed )
			{
			 	walkers[i].x += Math.sign( mouseX - walkers[i].x );
				walkers[i].y += Math.sign( mouseY - walkers[i].y );
			}

			//	clamp the walkers position
			walkers[i].x = clamp( walkers[i].x, 0, width );
			walkers[i].y = clamp( walkers[i].y, 0, height );

			//draw the walker
			fill( 0, 255 );
			noStroke();
			rect( walkers[i].x, walkers[i].y, 2, 2 );
	}
}

function clamp( number, lowerBounds, upperBounds )
{
	return min( upperBounds, max( lowerBounds, number ));
}
