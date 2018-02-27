class Chair
{
		constructor( screenWidth, screenHeight)
		{
			this.x = random( -screenWidth * 0.75, screenWidth * 0.75 );
			this.y = random( -screenHeight * 0.75, screenHeight * 0.75 );
			this.z = 0;//random( -1000, -500 );
			this.rx = random( TWO_PI );
			this.ry = random( TWO_PI );
			this.rz = random( TWO_PI );

			this.baseWidth = 100;
			this.baseLength = 100;
			this.baseThickness = 10;
			this.legHeight = 100;
			this.legThickness = this.baseThickness;
			this.backHeight = 100;
		}

		render( chairNumber )
		{
			noStroke();
			//fill( 222, 184, 135 );
			fill( 149, 79, 29 );
			//fill( '#ee5f9b' );

			push();

			//	position chair
			translate( this.x, this.y, this.z );

			//	spin the chair lightly
			var verticalTranslation = sin( frameCount / 300 + chairNumber ) * 100;
			translate( 0, verticalTranslation, 0);

			var xRotation = sin( frameCount / 1000 + chairNumber + 1);
			var yRotation = sin( frameCount / 1000 + chairNumber + 2);
			var zRotation = sin( frameCount / 1000 + chairNumber + 3);

			rotateX( xRotation );
			rotateY( yRotation );
			rotateZ( zRotation );

			//	rotate chair into position
			rotateX( this.rx );
			rotateY( this.ry );
			rotateZ( this.rz );

			box( this.baseWidth, this.baseLength, this.baseThickness );
			//	go to chair corner
			translate( -this.baseWidth / 2, this.baseLength / 2, this.legHeight / 2);
			translate( this.baseThickness / 2, -this.baseThickness / 2, -this.baseThickness / 2);
			box( this.baseThickness, this.baseThickness, this.legHeight );
			//	next leg corner
			translate( this.baseWidth, -this.baseLength, 0);
			translate( -this.baseThickness, this.baseThickness, 0 );
			box( this.baseThickness, this.baseThickness, this.legHeight );
			//	next leg corner
			translate( -this.baseWidth, 0, 0);
			translate( this.baseThickness, 0, 0 );
			box( this.baseThickness, this.baseThickness, this.legHeight );
			//	next leg corner
			translate( this.baseWidth, this.baseLength, 0);
			translate( -this.baseThickness, -this.baseThickness, 0 );
			box( this.baseThickness, this.baseThickness, this.legHeight );
			//	go to back position
			translate( -this.baseWidth / 2, 0, -this.backHeight );
			translate( this.baseThickness / 2, 0, 0);
			box( this.baseWidth, this.baseThickness, this.backHeight );
			pop();
		}
}

var numChairs = 10;
var chairs = [];

var checkerImage;

function setup() {
	createCanvas( windowWidth, windowHeight, WEBGL );
	frameRate(1000);
	setAttributes('antialias', true);

	//checkerImage = loadImage( 'checker.png');
	ortho(-width, width, height, -height, 0)
	createChairs();
}

function draw()
{
	//background( 255, 0, 0 );
	//background( 135, 206, 250 );
	background( '#94dee2');

	for( var i = 0; i < numChairs; i++ )
	{
		chairs[i].render(i);
	}
}

function createChairs()
{
	chairs = [];

	for( var i = 0; i < numChairs; i++ )
	{
		var chair = new Chair( width, height );
		chairs.push( chair );
	}
}

function touchEnded() {
  createChairs();
}
