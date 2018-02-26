var canvas;
var graphics;
var userImage;
var imageLoaded = false;

function setup() {
	// setup canvas
	canvas = createCanvas( 800, 800 );
	graphics = createGraphics( 100, 100 );
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
		image( graphics, 0, 0, 800, 800 );
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

// function modifyImage()
// {
// 	graphics.image( userImage, 0, 0, 100, 100 );
//
// 	userImage.loadPixels();
// 	var randomX = floor( random( 100 ) );
// 	var randomY = floor( random( 100 ) );
// 	console.log( randomX, randomY );
// 	userImage.set( randomX, randomY, color( 0, 255, 0 ) );
// 	userImage.updatePixels();
// }

function modifyImage()
{
	graphics.image( userImage, 0, 0, 100, 100 );

	userImage.loadPixels();
	var randomX = floor( random( 100 ) );
	var randomY = floor( random( 100 ) );
	console.log( randomX, randomY );
	userImage.set( randomX, randomY, color( 0, 255, 0 ) );
	userImage.updatePixels();
}
