class Board
{
	constructor()
	{
		this.tiles = [];

	}

	initialise()
	{
		for(let i = 0; i < 8; i++){
			this.tiles.push(new Array(8));
		}
		for(let i = 0; i < 8; i++){
			for(let j = 0; j < 8; j++){
				this.tiles[i][j] = new Tile(j, i);
			}
		}
		for(let i = 0; i < 8; i++){
			for(let j = 0; j < 8; j++){
				this.tiles[i][j].setColour();
				if(i == 1){
					this.tiles[i][j].setPiece(new Pawn());
					this.tiles[i][j].piece.colour = "black";	
				} 
				if(i == 6){
					this.tiles[i][j].setPiece(new Pawn());
					this.tiles[i][j].piece.colour = "white";
				}
			}
		}
		this.tiles[0][0].setPiece(new Rook());
		this.tiles[0][0].piece.colour = "black";
		this.tiles[0][7].setPiece(new Rook());
		this.tiles[0][7].piece.colour = "black";
		this.tiles[7][0].setPiece(new Rook());
		this.tiles[7][0].piece.colour = "white";
		this.tiles[7][7].setPiece(new Rook());
		this.tiles[7][7].piece.colour = "white";

		this.tiles[0][1].setPiece(new Knight());
		this.tiles[0][1].piece.colour = "black";
		this.tiles[7][1].setPiece(new Knight());
		this.tiles[7][1].piece.colour = "white";
		this.tiles[7][6].setPiece(new Knight());
		this.tiles[7][6].piece.colour = "white";
		this.tiles[0][6].setPiece(new Knight());
		this.tiles[0][6].piece.colour = "black";

		this.tiles[7][5].setPiece(new Bishop());
		this.tiles[0][5].setPiece(new Bishop());
		this.tiles[0][5].piece.colour = "black";
		this.tiles[7][5].piece.colour = "white";
		this.tiles[7][2].setPiece(new Bishop());
		this.tiles[0][2].setPiece(new Bishop());
		this.tiles[0][2].piece.colour = "black";
		this.tiles[7][2].piece.colour = "white";
		this.tiles[0][3].setPiece(new Queen());
		this.tiles[7][3].setPiece(new Queen());
		this.tiles[0][3].piece.colour = "black";
		this.tiles[7][3].piece.colour = "white";
		this.tiles[0][4].setPiece(new King());
		this.tiles[7][4].setPiece(new King());
		this.tiles[0][4].piece.colour = "black";
		this.tiles[7][4].piece.colour = "white";
		// this.tiles[2][3].setPiece(new King());
		// this.tiles[7][3].setPiece(new King());
		// this.tiles[2][3].piece.colour = "black";
		// this.tiles[7][3].piece.colour = "white";

	}

	display(context)
	{
		for(let i = 0; i < 8; i++){
			for(let j = 0; j < 8; j++){
				context.fillStyle = this.tiles[i][j].colour;
				context.fillRect(this.tiles[i][j].tileX * this.tiles[i][j].width, 
					this.tiles[i][j].tileY * this.tiles[i][j].height, 
					this.tiles[i][j].width, this.tiles[i][j].height);
				if(!this.tiles[i][j].isAvailable) this.tiles[i][j].piece.display(context);
			}
		}
	}

}