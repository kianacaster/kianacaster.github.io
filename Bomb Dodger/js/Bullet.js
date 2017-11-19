class Bullet
{
	constructor(pos, w, h)
	{
		this.pos = pos;
		this.w = w;
		this.h = h;
		this.speed = 10;
	}
	
	update()
	{
		this.draw();
		this.move();
	}
	draw()
	{
		ctx.fillStyle = "FF0011";
		ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
	}
	
	move()
	{
		this.pos.y += -this.speed;
	}
}