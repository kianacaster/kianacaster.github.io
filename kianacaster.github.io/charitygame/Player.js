// Player constructor - takes an x and y position
function Player(x, y){
	// Turn it's position into a vector
	this.pos = createVector(x,y);
	this.jumping = false;
	this.dir = 0;
	this.movespeed = 5;
	this.jumpheight = 60;
	this.gravity = 5;
	this.draw = function(){
		fill(80,255,32);
		rect(this.pos.x, this.pos.y, 32, 32);
	}
	
	this.update = function(){
		this.pos.x += this.movespeed*this.dir;
		this.pos.y += this.gravity;
		
		if(this.pos.y > height){
			location.reload();
		}
		
		this.pos.x = constrain(this.pos.x, 0, width - (GRID_SIZE + 1));
		this.pos.y = constrain(this.pos.y, 0, height + GRID_SIZE);

	}
	
	this.collision = function(){
		
	}
}

function setDir(dir){
	player.dir = dir;
}
