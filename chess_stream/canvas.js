const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = 480;
const height = canvas.height = 480;

let moveCount = 0;

let board;

function start(){
	ctx.font = "30px Arial";
	board = new Board();
	board.initialise();
	update();
}


function update(){
	board.display(ctx);
	requestAnimationFrame(update);

}

start();


let selectedTile;
let selectedPiece;
canvas.addEventListener('click', event => {
	/*for(let i = 0; i < 8; i++){
		for(let j = 0; j < 8; j++){
			if(!board.tiles[i][j].isAvailable) board.tiles[i][j].piece.getLegalMoves(board);
		}
	}*/
	if(selectedTile){
		selectedTile.deselect();
	} 
	let mouseX = event.clientX;
	let mouseY = event.clientY;

	let tileX = Math.floor(mouseX / (width / 8));
	let tileY = Math.floor(mouseY / (width / 8));

	//if(!selectedTile){
	board.tiles[tileY][tileX].select();
	selectedTile = board.tiles[tileY][tileX];
	//}else{
		if(selectedPiece) {	
			if(moveCount % 2 == 0){
				if(selectedPiece.colour == "white"){
					selectedPiece.getLegalMoves(board)
					selectedPiece.move(selectedTile);
					selectedPiece = null;
					selectedTile.deselect();
					selectedTile = null;
				}else{
					selectedPiece = null;
					selectedTile.deselect();
					selectedTile = null;
				}
			}else{
				if(selectedPiece.colour == "black"){
					selectedPiece.getLegalMoves(board)
					selectedPiece.move(selectedTile);
					selectedPiece = null;
					selectedTile.deselect();
					selectedTile = null;
				}else{
					selectedPiece = null;
					selectedTile.deselect();
					selectedTile = null;
				}
			}
		}else{
			board.tiles[tileY][tileX].select();
			selectedTile = board.tiles[tileY][tileX];
		}
	//}
	if(selectedTile){
		if(!selectedTile.isAvailable && !selectedPiece) selectedPiece = selectedTile.piece;
	}

});