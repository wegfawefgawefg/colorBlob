var numWalkers = 100;
var walkers = [];

var velocityStepSize = 0.01;

function setup() {
	createCanvas( windowWidth, windowHeight );
	frameRate(1000);

	for( var i = 0; i < numWalkers; i++ )
	{
		var walker = {
			x: random( width ),
			y: random( height ),
			dx: 0,
			dy: 0
		};
		walkers.push( walker );
	}

	pnoise.seed(Math.random());
}

function draw()
{
	background( 255, 1 );

	var t = millis() / 1000;

	//	itterate through walkers
	for( var i = 0; i < numWalkers; i++ )
	{
			//	step the walkers velocity
			// t += i;
			// walkers[i].x += (noise( t ) - 0.468) * walkerStepSize;
			// walkers[i].y += (noise( t + 1000 ) - 0.468) * walkerStepSize;
			walkers[i].dx += random( -velocityStepSize, velocityStepSize );
			walkers[i].dy += random( -velocityStepSize, velocityStepSize );

			//	step the walker
			walkers[i].x += walkers[i].dx;
			walkers[i].y += walkers[i].dy;

			//	step the walker slightly towards mouse
			if( mouseIsPressed )
			{
			 	walkers[i].x += Math.sign( mouseX - walkers[i].x );
				walkers[i].y += Math.sign( mouseY - walkers[i].y );
			}

			//	clamp the walkers position
			walkers[i].x = clamp2( walkers[i].x, 0, width );
			walkers[i].y = clamp2( walkers[i].y, 0, height );

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

function clamp2( number, lowerBounds, upperBounds )
{
	if( number < lowerBounds )
	{
		return number + upperBounds;
	}
	else if( number > upperBounds )
	{
		return number - upperBounds;
	}
	else
	{
		return number;
	}
}
