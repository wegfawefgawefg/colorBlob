class SkullFace
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

		render()
		{
		}
}

var numChairs = 10;
var chairs = [];

var tooth1Model;
var tooth2Model;
var tooth3Model;

var screwdriverModel;
var mouthModel;

var laingif

function preload()
{
	//tooth1Model = loadModel('tooth1.OBJ');
	//tooth2Model = loadModel('tooth2.OBJ');
	//tooth3Model = loadModel('tooth3.OBJ');
	screwdriverModel = loadModel( 'screwdriver.obj' );
	mouthModel = loadModel( 'mouth.obj' );
	laingif = loadImage('flesh.jpg');
	//skellyModel = loadModel();
}

function setup() {
	createCanvas( windowWidth, windowHeight, WEBGL );
	frameRate(1000);
	setAttributes('antialias', true);
	slider.changed( buggerCuck );

	//ortho(-width, width, height, -height, 0)
}


function buggerCuck()
{

}

function draw()
{
	noCursor()
	//background( 255, 0, 0 );
	//background( 135, 206, 250 );
	background( '#94dee2');

	stroke( 0, 0, 0);
	fill(255, 0, 0);

	push();
	translate(0, 0, -1500);
	rotateX( PI );
	scale( 1300 );
	texture(laingif);
	model( mouthModel, true );
	pop();

	push();
	translate( mouseX - windowWidth / 2,  mouseY - windowHeight / 2, -500 );
	rotateX(-QUARTER_PI * 2);
	//rotateY(QUARTER_PI);
	scale(0.1);
	model( screwdriverModel, true );
	pop();

}
