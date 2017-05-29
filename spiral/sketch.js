var spr;
var inc;
var theta;
function setup(){
	createCanvas(windowWidth, windowHeight);
	background(51);	
	spr = 1800;
	inc = 2 * Math.PI / spr;
	theta = inc;
	frameRate(240);
}

function draw(){
	
	while(theta < 145 * Math.PI){
		var newX = (width / 2) + theta * cos(theta);
		var newY = (height / 2) + theta * sin(theta);	
		noStroke();
		var randR = random(newX) - random(newY);
		var randG = random(newX) - random(newY);
		var randB = random(newX) + random(newY);
		fill(randR, randG, randB);
		ellipse(newX, newY, 16,16);
		theta += inc;
	}

}