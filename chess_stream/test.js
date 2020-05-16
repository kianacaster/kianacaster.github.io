for (let i = 1; i <= 7; i++) { 
	const { tileX, tileY } = this.tile; 
	let newX = tileX + i; 
	let newY = tileY + i; 
	if (newX < 8 && newY + i < 8) { 
		this.legalMoves.push(board.tiles[newX][newY]) 
	} 
}