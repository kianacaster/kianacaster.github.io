var started = false;
var player;
function startGame(){
	console.log("Started");
	cell = undefined;
	setInterval(function(){
		background(0);
		for(var i = 0; i < uniqueTiles.length; i++){
			noStroke();
			rect(uniqueTiles[i].pos.x,uniqueTiles[i].pos.y,GRID_SIZE,GRID_SIZE);
		}

		player.draw();
		player.update();				
		player.collision();
	}, 30);
}

function keyPressed(){
	if(cell !== undefined){
		if(keyCode == RIGHT_ARROW){
			cell.pos.x += GRID_SIZE;
		}else if(keyCode == LEFT_ARROW){
			cell.pos.x += -GRID_SIZE;
		}else if(keyCode == UP_ARROW){
			cell.pos.y += -GRID_SIZE;
		}else if(keyCode == DOWN_ARROW){
			cell.pos.y += GRID_SIZE;
		}else if(keyCode == 32){
			uniqueTiles.push(new Cell(cell.pos.x, cell.pos.y, 255));
		}
	}
	if(keyCode == ENTER && started == false){
		startGame();
		started = true;
	}
	
	if(started){
		if(keyCode == RIGHT_ARROW){
			setDir(1);
		}else if(keyCode == LEFT_ARROW){
			setDir(-1);
		}else if(keyCode == UP_ARROW || keyCode == 32 && player.jumping == false){
			player.jumping = true;
			player.pos.y += -player.jumpheight;
		}
	}
}

function keyReleased(){
	if(started){
		if(keyCode == RIGHT_ARROW){
			setDir(0);
		}else if(keyCode == LEFT_ARROW){
			setDir(0);
		}
	}
}
