var columnWidth = 100;
var numColumns;
var averageHeight = 0;

function setup() {
	// setup canvas
	createCanvas( windowWidth, windowHeight );
	frameRate(1000);
	colorMode(HSB);

	numColumns = width / columnWidth;
}

function draw()
{
	var waveHue = 220 + sin( millis() / 1000);
	var saturation = 20 + map( averageHeight, 0, height, 50, 0 );
	background( waveHue, 255, 255, 1 );
	stroke( 210, saturation, 100, 1);
	strokeWeight( columnWidth );
	strokeCap(ROUND);

	var timeComponent = millis() / 10000;

	var totalHeights = 0;
	for( var i = 0; i < numColumns + 2; i++ )
	{
		var colX = i * columnWidth;
		var noiseComponent = noise( colX / 4000  + timeComponent );
		var colHeight = map( noiseComponent, 0, 1, 0, height * 0.75 ) + height / 4;
		line( colX, 0, colX, colHeight );

		totalHeights += colHeight;/
	}

	averageHeight = totalHeights / numColumns;

	// fill( 0, 0, 0, 255 );
	// stroke( 255, 0, 100, 0.5 );
	// ellipse( width * 0.25, height / 4, 300, 300 );
	// ellipse( width * 0.75, height / 4, 300, 300 );

	//	draw clouds
	var cloudTimeComponent = timeComponent / 1;
	for( var i = 0; i < 3; i++ )
	{
		var lengthNoise = noise( i * 100 + cloudTimeComponent );
		var cloudLength = map( lengthNoise, 0, 1, 0, width * 0.7 );
		var heightNoise = noise( i * 1000 + 1000 + cloudTimeComponent );
		var cloudHeight = averageHeight - map( heightNoise, 0, 1, 0, height / 10 ) + (cloudLength / 20) - (height * 0.4) - 50;
		var xPosNoise = noise( i * 1000 + 2000 + cloudTimeComponent  / 20);
		var cloudXPos = map( xPosNoise, 0, 1, -width, width * 2 );
		var cloudAlpha = map( cloudLength, 0, width * 0.7, 0.8, 0.3 );
		//console.log( cloudHeight );

		stroke( 195, 0, 255, cloudAlpha );
		strokeWeight( columnWidth );
		var halfCloudLength = cloudLength / 2;
		//line( cloudXPos - halfCloudLength, cloudHeight, cloudXPos + halfCloudLength, cloudHeight );
		line( cloudXPos - halfCloudLength, cloudHeight, cloudXPos + halfCloudLength, cloudHeight );
	}
}
