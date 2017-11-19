class Player
{
	constructor(pos, w, h){
		this.pos = pos;
		this.w = w;
		this.h = h;
		this.speed = 5;
		this.dir = 0;
		this.bullets = [];
		this.bulletHeight = 25;
		this.bulletWidth = 5;
		this.lives = 3;
		this.score = 0;
		this.scoreString;
	}
	
	update()
	{
		this.scoreString = this.score.toString();
		this.draw();
		this.move();
		this.collision();
		if(this.lives == 2){
			document.getElementById("heart3").style.visibility = "hidden";
		};
		if(this.lives == 1){
			document.getElementById("heart2").style.visibility = "hidden";
		};
		if(this.lives == 0){
			document.getElementById("heart1").style.visibility = "hidden";
			endGame();
		};
	}
	
	draw()
	{	
		ctx.fillStyle = "#F77";
		ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
		if(this.bullets.length > 0){
			for(let i = this.bullets.length - 1; i >= 0; i--){
				this.bullets[i].update();
				if(this.bullets[i].pos.y + this.bulletHeight < 0){
					this.bullets.splice(i, 1);
				}
			}
		}
		ctx.font = "30px Arial";
		ctx.fillText("Score : " + this.scoreString, width - 15*(this.scoreString.length + 7),30);
	}
	
	shoot()
	{
		this.bullets.push(new Bullet(new Vector(this.pos.x + this.w / 2, this.pos.y - this.bulletHeight), this.bulletWidth, this.bulletHeight))	
	}
	
	setDir(dir)
	{
		this.dir = dir;
	}
	
	move()
	{
		this.pos.x += this.speed * this.dir;
	}
	
	collision()
	{
		if(this.pos.x < 0) this.pos.x = 0;
		if(this.pos.x + this.w > width) this.pos.x = width - this.w;
	}
}