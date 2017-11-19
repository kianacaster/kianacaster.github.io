class Collider
{
	constructor(obj, type)
	{
		this.obj = obj;
		this.w = obj.r * 2;
		this.h = obj.r * 2;
	}
	
	update()
	{
		if(debug){
			ctx.strokeStyle = "#0F0";
			ctx.strokeRect(this.x, this.y, this.w, this.h);
		}	
		this.x = this.obj.pos.x - this.obj.r;
		this.y = this.obj.pos.y - this.obj.r;
	}
}