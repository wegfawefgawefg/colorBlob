var canvas;
var userImage;
var imageLoaded = false;

var neighborhoodSize = 1;

var redDeltaRequirements = 150;
var greenDeltaRequirements = 150;
var blueDeltaRequirements = 150;

function setup() {
	// setup canvas
	canvas = createCanvas( 800, 800 );
	frameRate(1000);

	//	color default look of canvas
	canvas.background( 200, 200, 200 );
	textSize( 24 );
	textAlign( CENTER );
	text( 'Drop An Image Into The Canvas!', width / 2, height / 2 );

	canvas.id('mainCanvas');
	canvas.addClass('dashed');
	canvas.drop( gotFile );
}

function draw()
{
	if( imageLoaded === true )
	{
		image( userImage, 0, 0, 800, 800 );

			userImage.loadPixels();
			//	get a random pixel;
			var pixelX = floor( random( userImage.width ) );
			var pixelY = floor( random( userImage.height ) );

			//	test pixel for happiness;
			//	//	get that pixels color
			selectedPixel = userImage.get( pixelX, pixelY );

			//	//	determine neighborhood coordinates
			startX = pixelX - neighborhoodSize;
			startY = pixelY - neighborhoodSize;
			endX = pixelX + neighborhoodSize;
			endY = pixelY + neighborhoodSize;

			//	//	do bounds checking
			startX = max( 0, startX );
			startY = max( 0, startY );
			endX = min( endX, userImage.width );
			endY = min( endY, userImage.height );

			//	//	sum the neighborhood by color
			var numNeighbors = 0;
			var totalRed = 0;
			var totalGreen = 0;
			var totalBlue = 0;
			for( var y = startY; y <= endY; y++ )
			{
				for( var x = startX; x <= endX; x++ )
				{
					//	skip yourself
					if( ( x === pixelX ) && ( y === pixelY ) )
					{
						continue;
					}

					totalRed += red( userImage.get( x, y ) );
					totalGreen += green( userImage.get( x, y ) );
					totalBlue += blue( userImage.get( x, y ) );

					numNeighbors++;
				}
			}
			//	//	get average neighborhood color values
			var averageRed = totalRed / numNeighbors;
			var averageGreen = totalGreen / numNeighbors;
			var averageBlue = totalBlue / numNeighbors;

			//	determine pixel happiness
			var pixelIsHappy = true;
			if( ( abs( averageRed - red( selectedPixel )) ) > redDeltaRequirements )
			{
				pixelIsHappy = false;
			}
			else if( ( abs( averageGreen - green( selectedPixel )) ) > redDeltaRequirements )
			{
				pixelIsHappy = false;
			}
			else if( ( abs( averageBlue - blue( selectedPixel )) ) > redDeltaRequirements )
			{
				pixelIsHappy = false;
			}
			else
			{
				pixelIsHappy = true;
			}

			//	if pixel is unhappy pick another random pixel and swap locations
			if( pixelIsHappy === false )
			{
				var pixel2X = floor( random( userImage.width ) );
				var pixel2Y = floor( random( userImage.height ) );

				var secondSelectedPixel = userImage.get( pixel2X, pixel2Y );

				//	swap
				userImage.set( pixelX, pixelY, secondSelectedPixel );
				userImage.set( pixel2X, pixel2Y, selectedPixel );
			}
			userImage.updatePixels();
	}
}

function gotFile( file )
{
	canvas.removeClass('dashed');
	userImage = loadImage( file.data );

	if(file.type === 'image')
	{
		imageLoaded = true;
	}
}

function clamp( number, min, max )
{
	return min( max, max( min, number ));
}
