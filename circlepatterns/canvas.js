var canvas = document.querySelector('canvas');
var slider = document.getElementById('slider');
var c = canvas.getContext('2d');
var width = 600;
var height = 400;
canvas.width = width;
canvas.height = height;
var delay = 10;
var circles = [];
c.fillStyle = "#000000";
c.fillRect(0,0,width,height);
var distance = 10;
var canchange = true;
var p = document.getElementById("incval");
var prev = 10;
slider.onchange = function(){
	if(canchange){
		c.fillStyle = "#000000";
		c.fillRect(0,0,width,height);
		circles.push(new Circle(width / 1.5));
		distance = slider.value;
		canchange = false;
		prev = slider.value;
	}
}

function Circle(r){
	this.x = width / 2;
	this.y = height / 2;
	this.r = r;
	this.col = "rgba(" + floor(random(255)) +"," + floor(random(255)) +","+ floor(random(255)) +",1)";
	this.draw = function(){
		c.strokeStyle = this.col;
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2);
		c.stroke();	
	}
}
circles.push(new Circle(width / 1.5));
function animate(){
	p.innerHTML = "Current increment: " + str(distance);
	c.strokeStyle = "black";
	requestAnimationFrame(function(){
		setTimeout(function(){
			animate();
		}, delay)}
	);	
	for(var i = 0; i < circles.length; i++){
		if(circles[i].r - distance > 0){
			circles[i].draw();
			circles.push(new Circle(circles[i].r - distance));
			circles.cut(0);
		}else{
			circles.wipe();
			canchange = true;
			break;
		}
	}
	
	if(canchange && slider.value !== prev){
		distance = slider.value;
		slider.onchange();
	}
}	
animate();
