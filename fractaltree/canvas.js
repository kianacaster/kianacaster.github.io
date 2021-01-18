const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight - 5;

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
//#b8cbff
function background(colour, canvW, canvH)
{
  ctx.fillStyle = colour;
  ctx.fillRect(0, 0, canvW, canvH);
}
let ang = 7.6;
let inc = 0.01;
function update()
{
  background("black", width, height);
  tree(width / 2, height, height / 3, 0, ang);
  ang += inc;
  if(ang < 7.6) {inc *= -1} else if(ang >= 10){ inc *= -1; } ;
  //console.log(ang);
  requestAnimationFrame(function(){
			setTimeout(function(){
				update();
			}, 5)}	
		);	
}

ctx.lineWidth = 8;
function tree(x, y, len, theta, theta2) {
  //let col = hslToHex(360 - len / 2, 100, 360 - theta2 * 25);
  let col = hslToHex(127 - len / 2, 100, 360 - Math.sin(theta2));
  ctx.strokeStyle = col;
  
  ctx.beginPath();
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(theta * Math.PI / theta2);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();
  if (len < 4) {
    ctx.restore();
    return;
  }

  tree(0, -len, len*0.67, -15, theta2);
  tree(0, -len, len*0.67, 15, theta2);
  ctx.restore();
}
update();