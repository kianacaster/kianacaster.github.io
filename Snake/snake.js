function Snake(){
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];
	this.score = 0;
			
	this.eat = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y);
		if(d < 1){
			this.total++;
			return true;
		}else{
			return false;
		}
	}

	this.dir = function(x, y){
		this.xspeed = x;
		this.yspeed = y;
	}	
	
	this.death = function(){
		for(var i = 0; i < this.tail.length; i++){
			pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			if(d < 1){
				console.log("Restarting");
				this.total = 0;
				this.tail.splice(0, this.tail.length);
				this.score = 0;
			}
		}
	}
	
	this.update = function(){
		if(this.total > 0){
			if(this.total == this.tail.length && this.tail.length > 0){
				this.tail.splice(0, 1);
			}
			this.tail.push(createVector(this.x, this.y));
		}
	
	
		this.x += this.xspeed * scl;
		this.y += this.yspeed * scl;
		
		this.x = constrain(this.x, 0, width - scl);
		this.y = constrain(this.y, 0, height - scl);
	}
	
	this.show = function(){
		fill(255);
		for(var i = 0; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		rect(this.x, this.y, scl, scl);
		
	}
}
