var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var width = 600;
var height = 600;
canvas.width = width;
canvas.height = height;
var delay = 20;
var x, y;
var speed;
var r,g,b;
var rsclr = random(255);
r = floor(random(255));
g = floor(random(255));
b = floor(random(255));
x = width / 2;
y = height / 2;	
c.fillStyle = 'rgba(' + r +',' + g +','+ b +', 1)';
c.fillRect(0,0,width,height);
function animate(){
	requestAnimationFrame(function(){
		setTimeout(function(){
			animate();
		}, delay)}
	);
	c.fillStyle = "rgba(" + floor(random(255 - rsclr)) +"," + floor(random(255 - rsclr)) +","+ floor(random(255 - rsclr)) +",1)";
	c.beginPath();
	c.arc(x,y,32,0,Math.PI*2);
	c.fill();
	rsclr = ceil(rsclr);
	speed = round(random(2,10));
	var r = floor(random(8));	
	if(rsclr > 1 && rsclr < 25){
		rsclr = random(rsclr - 5, rsclr + 5);
	}else{
		rsclr = floor(random(360));
	}
	switch(r){
		case 0:
			x += speed;
			break;
		case 1:
			x +=  -speed;
			break;
		case 2:
			y += -speed;
			break;	
		case 3:
			y += speed;
			break;
		case 4:
			y += speed;
			x += speed;
			break;
		case 5:	
			y += speed;
			x += -speed;
			break;
		case 6:
			y += -speed;
			x += speed;
			break;
		case 7:
			y += -speed;
			x += -speed;
			break;
		}
		if(x < 0 || x > width || y < 0 || y > height){ 
			x = width/2; y = height / 2 ; 
		}
}	
animate();	
