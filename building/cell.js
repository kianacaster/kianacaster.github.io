function Cell(x, y, col){
	this.pos = createVector(x,y);
	this.draw = function(){
		fill(col);
		rect(this.pos.x,this.pos.y, GRID_SIZE, GRID_SIZE);
	}
	
	this.update = function(){	
		this.pos.x = constrain(this.pos.x, 0, width - (GRID_SIZE + 1));
		this.pos.y = constrain(this.pos.y, 0, height - (GRID_SIZE + 1));
	}	
}
