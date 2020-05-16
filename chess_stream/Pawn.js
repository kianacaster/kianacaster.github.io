class Pawn extends Piece
{
	constructor(){
		super("pawn");
	}

	getLegalMoves(board)
	{
		this.legalMoves = [];	
		if(this.colour == "white"){
			if(board.tiles[this.tile.tileY - 1][this.tile.tileX].isAvailable) this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX]);
			if(!this.hasMoved){
				if(board.tiles[this.tile.tileY - 2][this.tile.tileX].isAvailable)this.legalMoves.push(board.tiles[this.tile.tileY - 2][this.tile.tileX]);
			}	
			if(board.tiles[this.tile.tileY - 1][this.tile.tileX + 1] && !board.tiles[this.tile.tileY - 1][this.tile.tileX + 1].isAvailable && !board.tiles[this.tile.tileY - 1][this.tile.tileX + 1].colour !== this.colour) this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX+1]);
			if(board.tiles[this.tile.tileY - 1][this.tile.tileX - 1] && !board.tiles[this.tile.tileY - 1][this.tile.tileX - 1].isAvailable && !board.tiles[this.tile.tileY - 1][this.tile.tileX - 1].colour !== this.colour) this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX-1]);
		}
		if(this.colour == "black"){
			if(board.tiles[this.tile.tileY + 1][this.tile.tileX].isAvailable)this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX]);
			if(!this.hasMoved){
				if(board.tiles[this.tile.tileY + 2][this.tile.tileX].isAvailable)this.legalMoves.push(board.tiles[this.tile.tileY + 2][this.tile.tileX]);
			}	
			if(board.tiles[this.tile.tileY + 1][this.tile.tileX + 1] && !board.tiles[this.tile.tileY + 1][this.tile.tileX + 1].isAvailable && !board.tiles[this.tile.tileY + 1][this.tile.tileX + 1].colour !== this.colour) this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX+1]);
			if(board.tiles[this.tile.tileY + 1][this.tile.tileX - 1] && !board.tiles[this.tile.tileY + 1][this.tile.tileX - 1].isAvailable && !board.tiles[this.tile.tileY + 1][this.tile.tileX - 1].colour !== this.colour) this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX-1]);
		}
		// for(let i = 0; i < 7){
		// 	for(let j = 0; j < 7){
		// 		if(!board.tiles[i][j].isAvailable){
		// 			for(let k = 0; k < this.legalMoves.length; k++){
		// 				if(board.tiles[i][j] == this.legalMoves[k]){
		// 					if(board.tiles[i][j].piece.type == "king"){
		// 						board.tiles[i][j].inCheck = true;
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// }
	}

}