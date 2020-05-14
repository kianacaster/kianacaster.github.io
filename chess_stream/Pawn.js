class Pawn extends Piece
{
	constructor(){
		super("pawn");
	}

	getLegalMoves(board)
	{
		this.legalMoves = [];	
		if(this.colour == "white"){
			this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX]);
			if(!this.hasMoved) this.legalMoves.push(board.tiles[this.tile.tileY - 2][this.tile.tileX]);
		}
		if(this.colour == "black"){
			this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX]);
			if(!this.hasMoved) this.legalMoves.push(board.tiles[this.tile.tileY + 2][this.tile.tileX]);
		}
	}
}
