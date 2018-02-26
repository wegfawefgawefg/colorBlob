var canvas;
var userImage;
var imageLoaded = false;

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
		modifyImage();
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

function modifyImage()
{
	userImage.loadPixels();
	var randomPixelIndex = random( userImage.pixels.length );
	console.log( randomPixelIndex );
	userImage.pixels[ randomPixelIndex ] = color( 0, 255, 0 );
	userImage.updatePixels();
}
