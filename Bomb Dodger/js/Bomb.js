class Bomb
{
	constructor(pos, r)
	{
		this.pos = pos;
		this.r = r;
		this.collider = new Collider(this, "circ");
	}
	
	update()
	{
		this.collider.update();
		this.draw();
		this.move();
	}
	
	draw()
	{
		ctx.fillStyle = "#000";
		ctx.beginPath();
		ctx.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI);
		ctx.fill();
	}
	
	move()
	{
		this.pos.y += 5;
	}
}