// Initialize variables
var GRID_SIZE = 32;
var cell;
var uniqueTiles = [];
var player;

// Create a canvas, draw a player at a random position on the canvas and draw the "main" cell at 0, 0
function setup(){
	createCanvas(800 + GRID_SIZE + 1, 641);
	
	player = new Player(random(GRID_SIZE,width-GRID_SIZE), random(GRID_SIZE,height-GRID_SIZE*2));
	cell = new Cell(0, 0, "yellow");

}

// If the game hasn't started, draw a grid on the canvas
function draw(){
	if(!started){
		for(var y = 0; y < height; y += GRID_SIZE){
			for(var x = 0; x < width; x += GRID_SIZE){
				fill(160);
				rect(x,y,GRID_SIZE,GRID_SIZE);
			}
		}
	}	
	
	// Draw all the tiles from the uniqueTiles array 
	for(var i = 0; i < uniqueTiles.length; i++){
		uniqueTiles[i].draw();
	}
	// If the "main" cell isn't undefined (basically if the game hasn't started), update the cell 
	if(cell !== undefined){
		player.draw();
		cell.draw();
		cell.update();
	}	
}
