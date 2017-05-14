var circles = [];
var clr;
var randH;
var randS;
var randB;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB);		
  var protection = 0;
 while(circles.length < window.innerWidth / 4) {
    var circle = {
      x: random(0,width),
      y: random(0,height),
      r: random(6, 36)
    }

    var overlapping = false;
    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      var d = dist(circle.x, circle.y, other.x, other.y);
      if (d < circle.r + other.r) {
        overlapping = true;
      }
    }
  
    if (!overlapping) {
      circles.push(circle);
    }
    
    protection++;
    if (protection > 10000) {
      break;
    }
  }

    for (var i = 0; i < circles.length; i++) {

	randH = Math.random() * 510;
    	fill(randH, 50, 50);
    	noStroke();
    	ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
  }

}

function draw(){
	for(var i = 0 ; i < circles.length; i++){
		circles[i].x ++;
	}

}





