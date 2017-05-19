var backgroundcolour;
var ainput;
var c;
var n = 0;
var colourprompt;
var subbutton;
var preva, prevc;
function setup(){
createCanvas(600,600);
	angleMode(DEGREES);
	colorMode(HSB);
	background(0);	
	button = createButton("Draw Pattern");
	aval = createInput("127.5");
	cval = createInput("8");
	button.position(width, 0);
	aval.position(width, 40);
	cval.position(width, 80);
	
	
	button.mousePressed(function(){
		if(cval.value() !== prevc || aval.value() !== preva){
			preva = ainput = aval.value();
			prevc = c = cval.value();
			n = 0;
			background(0);
			drawPattern();
		
		}else{
			return;
		}
	});
}


function drawPattern(){
	requestAnimationFrame(function(){
		setTimeout(function(){
			drawPattern();
		}, 30)}
	);
	var a = n * float(ainput);
	var r = c * sqrt(n);
	var x = r * cos(a) + width / 2; 
	var y = r * sin(a) + height/ 2
	var rand;
	var clr;
	for(i=0;i<256;i++){
 		rand = Math.random() * 220;
		clr = rand;
	}
	fill(clr, 50, 50);
	ellipse(x,y,8,8); 
	n++;
}