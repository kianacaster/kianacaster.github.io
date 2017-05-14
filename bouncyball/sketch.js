var x = 180;
var y = 180;
var xspeed = 9;
var yspeed = 10;


function setup() 
{
  createCanvas(600, 600);
}

function draw() {
	background(0);
  	fill(255);
  	ellipse(x, y, 32);
	x = x + xspeed;
	
    if (x > 600 - 32 || x < 0 + 32)  {
    	xspeed = -xspeed ;	
  	}
	
	y = y + yspeed;
	

  	if (y > 600 - 32 || y < 0 + 32) {
    	yspeed = -yspeed;
		  	
  	}

}