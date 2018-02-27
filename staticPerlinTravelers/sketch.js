var numWalkers = 100;
var walkers = [];

var walkerStepSize = 2;
var walkerSpacing;

function setup() {
	createCanvas( windowWidth, windowHeight );
	frameRate(1000);
	colorMode(HSB);

	walkerSpacing = width / numWalkers;
	for( var i = 0; i < numWalkers; i++ )
	{
		var walker = {
			x: i * walkerSpacing,
			y: height
		};
		walkers.push( walker );
	}

	pnoise.seed(Math.random());
}

function draw()
{
	//background( 255, 0, 255, 0.005);

	//	itterate through walkers
	for( var i = 0; i < numWalkers; i++ )
	{
			//	step the walkers velocity
			var xSamplePos = walkers[i].x / 1000;
			var ySamplePos = walkers[i].y / 1000;
			var zSamplePos = frameCount / 1000;

			// var xSamplePos2 = xSamplePos + 0.1;
			// var ySamplePos2 = ySamplePos + 0.1;
			// var zSamplePos2 = zSamplePos + 0.1;;
			walkers[i].x += (pnoise.perlin3( xSamplePos, ySamplePos, zSamplePos ) + 0)* walkerStepSize;
			walkers[i].y += (pnoise.perlin3( xSamplePos + 100, ySamplePos + 200, zSamplePos ) + 0)* walkerStepSize;

			//	do bounds checking
			if( walkers[i].x < 0 )
			{
				walkers[i].x += width;
			}
			if( walkers[i].x > width )
			{
				walkers[i].x -= width;
			}

			if( walkers[i].y < 0 )
			{
				walkers[i].y += height;
			}
			if( walkers[i].y > height )
			{
				walkers[i].y -= height;
			}

			//draw the walker
			var hue = (pnoise.perlin2( xSamplePos, ySamplePos ) + 0.5) * 100;
			fill( 0, 255, 255, 0.03 );
			noStroke();
			//stroke( hue, 255, 255, 0.001 );
			//strokeWeight( walkerSpacing / 4 );
			ellipse( walkers[i].x, walkers[i].y, 10, 10);
			//line( i * walkerSpacing, height, walkers[i].x, walkers[i].y );
	}
}
