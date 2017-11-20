const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = 800;
const height = canvas.height = 600;
const shootingSFX1 = new Audio("assets/shot1.mp3");
const shootingSFX2 = new Audio("assets/shot2.mp3");
const lifeLostSFX = new Audio("assets/explode01.ogg");
let scene = 0;
const playerHeight = 10;
const playerWidth = 100;
let debug = false;
const player = new Player(new Vector(width/2 - playerWidth/2, height - playerHeight), playerWidth, playerHeight);
let bombs = [];
let difficulty = 0;
window.onload = function(){
	update();
}

function background(){
	ctx.fillStyle = "#DDF";
	ctx.fillRect(0,0,width,height);
}

function update(){
	background();
	if(scene == 0){
		let title = "Bomb Dodger";
		let beginText = "Press 'E' to begin.";
		ctx.fillStyle = "#000";
		ctx.font = "60px Arial";
		ctx.fillText(title, width/2-30*title.toString().length/2, height/2);
		ctx.font = "25px Arial";
		ctx.fillText(beginText, width/2-12.5*beginText.toString().length/2, height/2 + 40);
	}else if(scene == 1){
		begin();
		scene++;
	}
	requestAnimationFrame(update);
	player.update();
	if(bombs){
		for(let i = bombs.length - 1; i >= 0; i--){
			bombs[i].update();
			if(bombs[i].pos.y - bombs[i].r > height) bombs.splice(i, 1);
			if(bombs[i].pos.y + bombs[i].r >= player.pos.y + player.h && bombs[i].pos.x > player.pos.x && bombs[i].pos.x < player.pos.x + player.w){
				lifeLostSFX.play();
				bombs.splice(i, 1);
				player.lives--;
			}
			for(let j = player.bullets.length - 1; j >= 0; j--){
				if(player.bullets[j].pos.x > bombs[i].collider.x
				   && player.bullets[j].pos.x + player.bullets[j].w < bombs[i].collider.x + bombs[i].collider.w
				   && player.bullets[j].pos.y < bombs[i].collider.y + bombs[i].collider.h
				   && player.bullets[j].pos.y + player.bullets[j].h > bombs[i].collider.y){
					lifeLostSFX.play();
					player.score += Math.floor(1000-10*bombs[i].r);
					bombs.splice(i, 1);
					player.bullets.splice(j, 1);
				}
			}
		}
	}
}
function begin(){
	player.lives = 3;
	player.score = 0;
	setInterval(spawnBomb, 400 - difficulty);
}
document.addEventListener("keydown", (event)=>{
	if(event.keyCode === 37){
		player.setDir(-1);
	}
	if(event.keyCode === 39){
		player.setDir(1);
	}
	
	if(event.keyCode == 32){
		if(Math.random() > 0.5){
			shootingSFX1.play();
		}else{
			shootingSFX2.play();
		}
		player.shoot();
	}
});

document.addEventListener("keyup", (event)=>{
	if(event.keyCode === 37){
		player.setDir(0);
	}
	if(event.keyCode === 39){
		player.setDir(0);
	}
	if(event.keyCode === 69 && scene==0){
		scene = 1;
	}
});

function spawnBomb(){
	bombs.push(new Bomb(new Vector(Math.random() * width, -10), Math.random() * 25 + 10));
}	

function endGame(){
	alert("You Lost with a Score of " + player.score);
	window.location.reload();
}