var snake;
var scl = 20;
var scr;
var food;

function setup(){
	createCanvas(800, 600);
	scr = document.getElementById("scr");
	snake = new Snake();
	frameRate(10);
	pickLocation();
}

function pickLocation(){
	var cols = width / scl;
	var rows = height / scl;
	food = createVector(floor(random(cols)), floor(random(rows)));
	food.mult(scl);
}

function draw(){
	scr.innerHTML = "Score: " + str(snake.score);
	background(0);
	/*for(var y = 0; y < height; y += scl){
		for(var x = 0; x < width; x += scl){
			fill(51);
			rect(x,y,scl, scl);
		}
	}*/
	if(snake.eat(food)){
		pickLocation();
		snake.score++;
	}
	snake.death();
	snake.update();
	snake.show();
	fill(255, 0, 0);
	rect(food.x, food.y, scl, scl);
}

function keyPressed(){
	if(keyCode == UP_ARROW && snake.yspeed !== 1){
		snake.dir(0, -1);	
	}else if(keyCode == DOWN_ARROW && snake.yspeed !== -1){
		snake.dir(0, 1);
	}else if(keyCode == RIGHT_ARROW && snake.xspeed !== -1){
		snake.dir(1, 0);
	}else if(keyCode == LEFT_ARROW && snake.xspeed !== 1){
		snake.dir(-1, 0);
	}
}
