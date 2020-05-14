class Piece
{
	constructor(type, colour){
		this.type = type;
		this.tile;
		this.legalMoves = [];
		this.hasMoved = false;
		this.colour;
	}

	display(context)
	{
		context.fillStyle = this.colour;
		context.fillText(this.type[0], (this.tile.tileX * this.tile.width) + 30, (this.tile.tileY * this.tile.height) + 30);
	}

	setTile(tile)
	{
		this.tile = tile;
	}

	move(destination)
	{
		for(let i = 0; i < this.legalMoves.length; i++){
			if(this.legalMoves[i] === destination){
				this.hasMoved = true;
				this.tile.piece = null;
				this.tile.isAvailable = true;
				destination.setPiece(this);
				moveCount++;
			}
		}

	}
}