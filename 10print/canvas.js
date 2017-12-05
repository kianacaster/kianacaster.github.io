const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const width = canvas.width = 800;
const height = canvas.height = 600;
const spacing = 20;

let xOff = 0;
let yOff = 0;

ctx.lineWidth = spacing / 10;
ctx.fillStyle = "#000";
ctx.strokeStyle = "#FFF";

ctx.fillRect(0, 0, width, height);

function animate(){
	if(yOff > height) return;
	if(xOff >= width){ xOff = 0; yOff += spacing; }

	if(Math.random() > 0.5){
		ctx.beginPath();
		ctx.moveTo(xOff, yOff);
		ctx.lineTo(xOff + spacing, yOff + spacing);
		ctx.stroke();
	}else{
		ctx.beginPath();
		ctx.moveTo(xOff, yOff + spacing);
		ctx.lineTo(xOff + spacing, yOff);
		ctx.stroke();	
	}
	
	xOff += spacing;
	
	requestAnimationFrame(animate);	
}	
animate();	
