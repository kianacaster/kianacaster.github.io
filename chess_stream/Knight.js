class Knight extends Piece
{
	constructor(){
		super("night");
	}

	getLegalMoves(board)
	{
		this.legalMoves = [];

		if(this.tile.tileY >= 2 && this.tile.tileX <= 6) this.legalMoves.push(board.tiles[this.tile.tileY - 2][this.tile.tileX + 1]);
		
		if(this.tile.tileY >= 2 && this.tile.tileX >= 1) this.legalMoves.push(board.tiles[this.tile.tileY - 2][this.tile.tileX - 1]);
		
		if(this.tile.tileY <= 5 && this.tile.tileX <= 6) this.legalMoves.push(board.tiles[this.tile.tileY + 2][this.tile.tileX + 1]);
		
		if(this.tile.tileY <= 5 && this.tile.tileX >= 1) this.legalMoves.push(board.tiles[this.tile.tileY + 2][this.tile.tileX - 1]);
		
		
		if(this.tile.tileY >= 1 && this.tile.tileX <= 6) this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX + 2]);
		
		if(this.tile.tileY >= 1 && this.tile.tileX >= 2) this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX - 2]);
		
		if(this.tile.tileY <= 6 && this.tile.tileX <= 6) this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX + 2]);
		
		if(this.tile.tileY <= 6 && this.tile.tileX >= 2) this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX - 2]);

	}
}