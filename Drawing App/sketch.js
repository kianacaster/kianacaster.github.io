// Basic Drawing Web-page - created by K14N \\

// Setup variables
var socket;
var bgcolour = 255; // Sets the background colour to white
var fr = 120; // Frame rate = 120
var clr = 0; // Colour is black

// Drawing Variables
// Pre-defines these variables
var lastX = 0; 
var lastY = 0;
var startX = 0;
var startY = 0;

// Button variables
// More pre-definition
var drawThickness = 10;
var rubThickness = 10;
var drawplus1;
var drawminus1;
var drawplus10;
var drawminus10;
var rubplus1;
var rubminus1;
var rubplus10;
var rubminus10;
var temp;
var cw;
var ch;
var params;
var id;
var canvas;
var bgc;
var updbgc;
var data;

function setup() {
	socket = io.connect("http://localhost:3000");
	socket.on("drawing", newDrawing);
	params = getURLParams();
	cw = params.width;
	ch = params.height;
	id = params.id;
	brc = createInput("#000000");
	updbc = createButton("Update Brush Colour");
	canvas = createCanvas(cw,ch); // Draws a canvas
	background(bgcolour); // Sets the background colour to the colour defined earlier
	frameRate(fr); // Sets the frame rate
	cursor('assets/cursor.png'); // Uses a custom cursor
	var button = createButton('Clear Canvas'); // Creates a clear canvas button
	var saveButton = createButton('Save Your Work'); // Creates a save button
	// Buttons to increase pen and rubber thickness
	drawplus1 = createButton('Pen Thickness +1'); 
	drawminus1 = createButton('Pen Thickness -1'); 
	drawplus10 = createButton('Pen Thickness +10');
	drawminus10 = createButton('Pen Thickness -10');
	rubplus1 = createButton('Rubber Thickness +1');
	rubminus1 = createButton('Rubber Thickness -1');
	rubplus10 = createButton('Rubber Thickness +10');
	rubminus10 = createButton('Rubber Thickness -10');
	var back = createButton('Back to homepage');

	// Sets the postition of the buttons
	button.position(cw, 0);
	drawplus1.position(cw, 40);
	drawplus10.position(cw, 65);
	drawminus1.position(cw, 105);
	drawminus10.position(cw, 130);
	rubplus1.position(cw, 170);
	rubplus10.position(cw, 195);
	rubminus1.position(cw, 235);
	rubminus10.position(cw, 260);
	saveButton.position(cw, ch - 45);
	back.position(cw,ch-20);
	updbc.position(cw, ch-90);
	brc.position(cw, ch-115);
	// Runs the functions when the button is pressed
	button.mousePressed(clearCanvas);
	saveButton.mousePressed(function(){saveCanvas(canvas, 'myBoard_' + id, 'png');});
	drawplus1.mousePressed(drawthicknessp1);
	drawminus1.mousePressed(drawthicknessm1);
	drawplus10.mousePressed(drawthicknessp10);
	drawminus10.mousePressed(drawthicknessm10);
	rubplus1.mousePressed(rubthicknessp1);
	rubminus1.mousePressed(rubthicknessm1);
	rubplus10.mousePressed(rubthicknessp10);
	rubminus10.mousePressed(rubthicknessm10);
	updbc.mousePressed(function(){ clr = brc.value(); });
	back.mousePressed(function(){window.location.replace("index.html");});
}

function drawthicknessp1(){ if(drawThickness < 75){drawThickness++;} } // Increases drawThickness by 1
function drawthicknessm1(){ if(drawThickness - 1 > 0){ drawThickness = drawThickness - 10; }else{ drawThickness = 1; } } // Decreases drawThickness by 10, can't go lower than 1
function drawthicknessp10(){ if(drawThickness < 75){drawThickness+=10;} } // Increases drawThickness by 10
function drawthicknessm10(){ if(drawThickness - 10 > 0){ drawThickness = drawThickness - 10; }else{ drawThickness = 1; } }	

function rubthicknessp1(){ if(rubThickness < 75){rubThickness++;} }// Increases rubThickness by 1
function rubthicknessm1(){ if(rubThickness - 1 > 0){ rubThickness = rubThickness - 10; }else{ rubThickness = 1; } } // Decreases rubThickness by 1, can't go lower than 1
function rubthicknessp10(){ if(rubThickness < 75){rubThickness+=10;} }// Increases rubThickness by 10
function rubthicknessm10(){ if(rubThickness - 10 > 0){ rubThickness = rubThickness - 10; }else{ rubThickness = 1; } }// Decreases rubThickness by 10, can't go lower than 1

function clearCanvas(){ // Clears the canvas
	clear(); 
	temp = drawThickness;
	drawThickness = 0;
	setTimeout(restore, 500);
} 

function restore(){ 
	drawThickness = temp; 
}

// 	If the mouse is pressed draw a line from the start coordinates to the end coordinates - left mouse draws black, right mouse draws white (illusion of an eraser)
function draw() {
	data = { x: mouseX, y: mouseY, pressed: mouseIsPressed, button: mouseButton }
	strokeWeight(5);
	stroke(0);
	line(0,0,cw,0);
	line(cw,0,cw,ch);
	line(0,ch,cw,ch);
	line(0,ch,0,0);
	socket.emit("mouse", data);
	if(mouseIsPressed){
		if(mouseButton == LEFT){
		data.button = "LEFT"
		lastX = mouseX;
		lastY = mouseY;
		drawLine(startX,startY,lastX,lastY, clr, drawThickness);
		startX = mouseX;
		startY = mouseY;
		}else if(mouseButton == RIGHT){
			data.button = "RIGHT"
			lastX = mouseX;
			lastY = mouseY;
			drawLine(startX,startY,lastX,lastY, bgcolour, rubThickness);
			startX = mouseX;
			startY = mouseY;	
		}
	}else{
		startX = mouseX;
		startY = mouseY;
	}
}
function newDrawing(){
	var dstartX;
	var dstartY;
	var dlastX;
	var dlastY;
	if(data.pressed = true){
		if(data.button == "LEFT"){
		dlastX = data.x;
		dlastY = data.y;
		drawLine(dstartX,dstartY,dlastX,dlastY, clr, drawThickness);
		dstartX = data.x;
		dstartY = data.y;
		}else if(data.button == "RIGHT"){
			dlastX = data.x;
			dlastY = data.y;
			drawLine(dstartX,dstartY,dlastX,dlastY, bgcolour, rubThickness);
			dstartX = data.x;
			dstartY = data.y;	
		}
	}else{
		dstartX = data.x;
		dstartY = data.y;
	}

}
// Draws a line
function drawLine(x1,y1,x2,y2,colour, thickness){ 
			stroke(colour); 
			strokeWeight(thickness);
			line(x1,y1,x2,y2);
}