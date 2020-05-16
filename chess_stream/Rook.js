class Rook extends Piece
{
	constructor(){
		super("rook");
	}

	getLegalMoves(board)
	{
		this.legalMoves = [];
		for(let i = this.tile.tileX-1; i >= 0; i--){
			//if(!board.tiles[this.tile.tileY][i]) continue;
			if(board.tiles[this.tile.tileY][i].isAvailable){
				this.legalMoves.push(board.tiles[this.tile.tileY][i]);
			}else{
				if(board.tiles[this.tile.tileY][i].piece.colour !== this.colour){
					this.legalMoves.push(board.tiles[this.tile.tileY][i]);
					break;
				}
				break;
			}
		}	
		for(let i = this.tile.tileX+1; i <= 7; i++){
			//if(!board.tiles[this.tile.tileY][i]) continue;
			if(board.tiles[this.tile.tileY][i].isAvailable){
				this.legalMoves.push(board.tiles[this.tile.tileY][i]);
			}else{
				if(board.tiles[this.tile.tileY][i].piece.colour !== this.colour){
					this.legalMoves.push(board.tiles[this.tile.tileY][i]);
					break;
				}
				break;
			}
		}	
		for(let i = this.tile.tileY-1; i >= 0; i--){
			//if(!board.tiles[this.tile.tileY][i]) continue;
			if(board.tiles[i][this.tile.tileX].isAvailable){
				this.legalMoves.push(board.tiles[i][this.tile.tileX]);
			}else{
				if(board.tiles[i][this.tile.tileX].piece.colour !== this.colour){
					this.legalMoves.push(board.tiles[i][this.tile.tileX]);
					break;
				}
				break;
			}
		}	
		for(let i = this.tile.tileY+1; i <= 7; i++){
			//if(!board.tiles[i][this.tile.tileX]) break;
			if(board.tiles[i][this.tile.tileX].isAvailable){
				this.legalMoves.push(board.tiles[i][this.tile.tileX]);
			}else{
				if(board.tiles[i][this.tile.tileX].piece.colour !== this.colour){
					this.legalMoves.push(board.tiles[i][this.tile.tileX]);
					break;
				}
				break;
			}
		}	
	}
}