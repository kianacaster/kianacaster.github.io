class King extends Piece
{
	constructor(){
		super("king");
		this.inCheck = false;
	}

	getLegalMoves(board)
	{
		this.legalMoves = [];
		if(this.tile.tileY > 0){
			if(board.tiles[this.tile.tileY - 1][this.tile.tileX].isAvailable){
				this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX]);
			}else{
				if(!board.tiles[this.tile.tileY - 1][this.tile.tileX].isAvailable && board.tiles[this.tile.tileY - 1][this.tile.tileX].piece.colour !== this.colour){
					this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX]);
				}
			}
		}

		if(this.tile.tileY < 7){
			if(board.tiles[this.tile.tileY + 1][this.tile.tileX].isAvailable){
				this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX]);
			}else{
				if(!board.tiles[this.tile.tileY + 1][this.tile.tileX].isAvailable && board.tiles[this.tile.tileY + 1][this.tile.tileX].piece.colour !== this.colour){
					this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX]);				
				}
			}
		}
		if(this.tile.tileX < 7){
			if(board.tiles[this.tile.tileY][this.tile.tileX + 1].isAvailable){
				this.legalMoves.push(board.tiles[this.tile.tileY][this.tile.tileX + 1]);
			}else{
				if(!board.tiles[this.tile.tileY][this.tile.tileX + 1].isAvailable && board.tiles[this.tile.tileY][this.tile.tileX + 1].piece.colour !== this.colour){
					this.legalMoves.push(board.tiles[this.tile.tileY][this.tile.tileX + 1]);
				}
			}
		}

		if(this.tile.tileX > 0){
			if(board.tiles[this.tile.tileY][this.tile.tileX - 1].isAvailable){
				this.legalMoves.push(board.tiles[this.tile.tileY][this.tile.tileX - 1]);
			}else{
				if(!board.tiles[this.tile.tileY][this.tile.tileX - 1].isAvailable && board.tiles[this.tile.tileY][this.tile.tileX - 1].piece.colour !== this.colour){
					this.legalMoves.push(board.tiles[this.tile.tileY][this.tile.tileX - 1]);
				}
			}
		}

		if(this.tile.tileX < 7 && this.tile.tileY < 7){
			if(board.tiles[this.tile.tileY + 1][this.tile.tileX + 1].isAvailable){
				this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX + 1]);
					}else{
						if(!board.tiles[this.tile.tileY + 1][this.tile.tileX + 1].isAvailable && board.tiles[this.tile.tileY + 1][this.tile.tileX + 1].piece.colour !== this.colour){
							this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX + 1]);
						}
					}
		}

		if(this.tile.tileY < 7 && this.tile.tileX > 0){
			if(board.tiles[this.tile.tileY + 1][this.tile.tileX - 1].isAvailable){
				this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX - 1]);
					}else{
						if(!board.tiles[this.tile.tileY + 1][this.tile.tileX - 1].isAvailable && board.tiles[this.tile.tileY + 1][this.tile.tileX- 1].piece.colour !== this.colour){
							this.legalMoves.push(board.tiles[this.tile.tileY + 1][this.tile.tileX - 1]);
						}
					}
		}

		if(this.tile.tileY > 0 && this.tile.tileX < 7){
		if(board.tiles[this.tile.tileY - 1][this.tile.tileX + 1].isAvailable){
				this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX + 1]);
				}else{
					if(!board.tiles[this.tile.tileY - 1][this.tile.tileX + 1].isAvailable && board.tiles[this.tile.tileY - 1][this.tile.tileX + 1].piece.colour !== this.colour){
						this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX + 1]);
					}
				}
			}
		if(this.tile.tileY > 0 && this.tile.tileX > 0){
			if(board.tiles[this.tile.tileY - 1][this.tile.tileX - 1].isAvailable){
				this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX - 1]);
					}else{
						if(!board.tiles[this.tile.tileY - 1][this.tile.tileX - 1].isAvailable && board.tiles[this.tile.tileY - 1][this.tile.tileX - 1].piece.colour !== this.colour){
							this.legalMoves.push(board.tiles[this.tile.tileY - 1][this.tile.tileX - 1]);
						}
					}

		}
		console.log(this.inCheck)
	}
}