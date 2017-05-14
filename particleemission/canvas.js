var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var width = window.innerWidth;
var height = window.innerHeight;
canvas.width = width;
canvas.height = height;
var particles = [];
var speed = 50;
var r = 255;
var g = 0;
var b = 0;
var a = 0.006;
var emitters = [];
function Emitter(x,y){
	this.x = x;
	this.y = y;
	this.dx = 1;
	this.dy = 1;
	this.update = function(){
		for(var i = 0; i < 20; i++){
			particles.push(new Particle(this.x,this.y,20,20));
		}
	}	
}
function Particle(x,y,w,h){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;	
	this.draw = function(){
		c.fillStyle = 'rgba(' + r +',' + g +','+ b +','+ a + ')';
		c.fillRect(this.x,this.y,this.w,this.h);
	}
	this.update = function(){
		this.x += random(-10,10);
		this.y += 10;
	}
}
window.onload = function(){
	for(var i = 0; i < 5; i++){
		emitters.push(new Emitter(random(width), random(height)));
	}
}
function animate(){
	requestAnimationFrame(function(){
		setTimeout(function(){
			animate();
		}, speed)}
	);
	c.fillStyle = "rgba(10,0,0,0.05)";
	c.fillRect(0,0,width,height);
	r = floor(random(155,255));
	g = floor(random(155,200));
	b = floor(random(155,255));
	for(var i = 0; i < particles.length - 1; i++){
		particles[i].draw();
		particles[i].update();
		if(particles[i].y > height){
			particles.cut(i);
		}
	}
	for(var i = 0 ; i < emitters.length - 1; i++){
		if(emitters[i].x + 20 > width || emitters[i].x < 0){
			emitters[i].dx = invert(emitters[i].dx);
		}
		if(emitters[i].y + 20 > height || emitters[i].y < 0){
			emitters[i].dy = invert(emitters[i].dy);
		}
		emitters[i].x += 20 * emitters[i].dx;
		emitters[i].y += floor(random(10,20)) * emitters[i].dy;
		emitters[i].update();
	}
}	
animate();