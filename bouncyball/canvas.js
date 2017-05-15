var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var width = 600;
var height = 600;
canvas.width = width;
canvas.height = height;
var speed = 10;
var ball = new Ball(width / 2, height / 2);

function Ball(x,y){
	this.x = x;
	this.y = y;
	this.dx = 9;
	this.dy = 10;
	this.r = 20;
	this.draw = function(){
		c.fillStyle = "#FFFFFF";
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2);
		c.fill();
	}
	
	this.update = function(){
		this.x += this.dx;
		this.y += this.dy;
	
		if(this.x > width - this.r || this.x < this.r){
			this.dx = invert(this.dx);
		}
		
		if(this.y > height - this.r || this.y < this.r){
			this.dy = invert(this.dy);
		}
	}
}

function animate(){
	c.fillStyle = "#000000";
	c.fillRect(0,0,width,height);

	requestAnimationFrame(function(){
		setTimeout(function(){
			animate();
		}, speed)}
	);
	
	ball.draw();
	ball.update();
}	
animate();	