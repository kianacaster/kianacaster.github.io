class Tile
{
	constructor(tileX, tileY)
	{
		this.tileX = tileX;
		this.tileY = tileY;
		this.width = this.height = 60;
		this.colour;
		this.piece;
		this.isAvailable = true;
		this.selected = false;
	}

	setColour()
	{
		if(this.tileY % 2 === 0){
			if(this.tileX % 2 === 0){
				this.colour = "#72b4ed";
			}else{
				this.colour = "#005eb0";
			}
		}else{
			if(this.tileX % 2 === 0){
				this.colour = "#005eb0";
			}else{
				this.colour = "#72b4ed";
			}
		}

	}

	setPiece(piece)
	{
		this.piece = piece;
		piece.setTile(this);
		this.isAvailable = false;
	}

	select()
	{
		this.colour = "green";
		this.selected = true;
	}

	deselect()
	{
		this.selected = false;
		this.setColour();
	}
}