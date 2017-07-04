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
		return(d < 1);
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
				background(0);
				alert("You died with a score of " + this.score + "\n" + "Press 'OK' to replay");
				this.total = 0;
				this.score = 0;
				this.tail.splice(0, this.tail.length);
				console.log("Restarting");
				
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
		
		if(this.x  + scl > width && this.xspeed == 1){
			this.x = 0;
		}else if(this.x < 0 && this.xspeed == -1){
			this.x = width - scl;
		}
		
		if(this.y  + scl > height && this.yspeed == 1){
			this.y = 0;
		}else if(this.y < 0 && this.yspeed == -1){
			this.y = height - scl;
		}
		//this.x = constrain(this.x, 0, width - scl);
		//this.y = constrain(this.y, 0, height - scl);
	}
	
	this.show = function(){
	noStroke();
		fill(0);
		for(var i = 0; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		rect(this.x, this.y, scl, scl);
		
	}
}

