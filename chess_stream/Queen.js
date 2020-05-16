class Queen extends Piece
{
	constructor(){
		super("queen");
	}

	getLegalMoves(board)
	{	
		this.legalMoves = [];

		for (let i = 1; i <= 7; i++) { 
			let newX = this.tile.tileX + i; 
			let newY = this.tile.tileY + i; 
			if (newX < 8 && newY < 8) { 
				if(board.tiles[newY][newX].isAvailable){
					this.legalMoves.push(board.tiles[newY][newX]); 
				}else{
					if(!board.tiles[newY][newX].isAvailable && board.tiles[newY][newX].piece.colour !== this.colour){
						this.legalMoves.push(board.tiles[newY][newX]); 
						break;
					}else{
						break;
					}
				}

			}
		}
		for (let i = 1; i <= 7; i++) { 
			let newX = this.tile.tileX - i; 
			let newY = this.tile.tileY + i; 
			if (newX >= 0 && newY < 8) { 
				if(board.tiles[newY][newX].isAvailable){
					this.legalMoves.push(board.tiles[newY][newX]); 
				}else{
					if(!board.tiles[newY][newX].isAvailable && board.tiles[newY][newX].piece.colour !== this.colour){
						this.legalMoves.push(board.tiles[newY][newX]); 			
						break;		
					}else{
						break;
					}
				}
		
			}
		}
		for (let i = 1; i <= 7; i++) { 
			let newX = this.tile.tileX - i; 
			let newY = this.tile.tileY - i; 
			if (newX > 0 && newY >= 0) { 
				if(board.tiles[newY][newX].isAvailable){
					this.legalMoves.push(board.tiles[newY][newX]); 
				}else{
					if(!board.tiles[newY][newX].isAvailable && board.tiles[newY][newX].piece.colour !== this.colour){
						this.legalMoves.push(board.tiles[newY][newX]); 
						break;
					}else{
						break;
					}
				}
			}
		}
		for (let i = 1; i <= 7; i++) {  
			let newX = this.tile.tileX + i; 
			let newY = this.tile.tileY - i; 
			if (newX < 8 && newY >= 0) { 
				if(board.tiles[newY][newX].isAvailable){
					this.legalMoves.push(board.tiles[newY][newX]); 
				}else{
					if(!board.tiles[newY][newX].isAvailable && board.tiles[newY][newX].piece.colour !== this.colour){
						this.legalMoves.push(board.tiles[newY][newX]); 
						break;
					}else{
						break;
					}
				}
			}
		}
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