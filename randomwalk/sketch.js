var x;
var y;
var speed;
var rsclr;

function setup()
{
	createCanvas(window.innerWidth,window.innerHeight);


	// Pre sets the x and y values to be the center of the screen
	x = width/2;
	y = height/2;	

	colorMode(HSB);

	// Chooses a random number between 0 and 360, this'll be used to define the point's colour later
	rsclr = random(360);
	background(random(360 - rsclr),random(360 - rsclr),random(360 - rsclr));	
}


function draw()
{
	rsclr = ceil(rsclr);
	// Sets the move speed to a random value every frame
	speed = round(random(1,5));

	// Generates a random number between 0 and 8, then rounds it down. This is used to help choose which direction to move the point.
	var r = floor(random(8));	
	
	// The rsclr var can increase or decrease by a maximum of 5 - this keeps a nice gradient in the colouring...sort of
	if(rsclr > 1 && rsclr < 359){
		rsclr = random(rsclr - 5, rsclr + 5);
	}else{
		rsclr = floor(random(360));
	}
	// This just sets the colour to the random colour that was generated, with an alpha of 25
	noStroke();
	fill(rsclr, 100, 50, 25);
	
	// Draws the point at the x and y values that are being updated randomly
	ellipse(x,y,32,32);
	
	// A switch statement to check the outcome of the random number (to decide the direction to move)
	switch(r){

		// Move right
		case 0:
			x += speed;
			break;

		// Move left	
		case 1:
			x +=  -speed;
			break;

		// Move up	
		case 2:
			y += -speed;
			break;

		// Move down	
		case 3:
			y += speed;
			break;

		// Move diagonally downwards and to the right	
		case 4:
			y += speed;
			x += speed;
			break;

		// Move diagonally downwards and to the left	
		case 5:	
			y += speed;
			x += -speed;
			break;

		// Move diagonally upwards and to the right	
		case 6:
			y += -speed;
			x += speed;
			break;

		// Move diagonally upwards and to the left 	
		case 7:
			y += -speed;
			x += -speed;
			break;
		
		}
		
		// If the point is off the screen at all, it will reset back to the center
		if(x < 0 || x > width || y < 0 || y > height){ 
			x = width/2; y = height / 2 ; 
		}
}
