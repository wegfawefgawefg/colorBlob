var canvas;
var userImage;
var imageLoaded = false;

var circleWidth = 50;
var circleHeight = 50;

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
		//image( userImage, 0, 0, 800, 800 );

		//	pick a random x and y in the image
		var randomX = random( userImage.width );
		var randomY = random( userImage.height );

		//	calculate equivalently scaled x and y in the Canvas
		var x = map( randomX, 0, userImage.width, 0, 800 );
		var y = map( randomY, 0, userImage.height, 0, 800 );

		//	sample the image pixel color
		userImage.loadPixels();
		var color = userImage.get( floor(randomX), floor(randomY) );

		//	draw circles in the canvas with sampled image pixel color
		fill( red(color), green(color), blue(color), 50 );
		noStroke();
		ellipseMode( CENTER );
		ellipse( x, y, circleWidth, circleHeight );
	}
}

function gotFile( file )
{
	canvas.removeClass('dashed');
	userImage = loadImage( file.data );

	if(file.type === 'image')
	{
		imageLoaded = true;
		background( 255, 255, 255 );
	}
}

function clamp( number, min, max )
{
	return min( max, max( min, number ));
}
