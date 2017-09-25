function Particle (module, index, centerX, centerY, life) {
	this.module = module;
	this.index = index;
	this.centerX = centerX;
	this.centerY = centerY;
	this.life = life;
	this.health = life;
	this.radius = life;
	this.velocity = 0;

	this.gravity = function() {
		var gravity = 4*faderPos;

		if(this.centerY >= windowHeight) {
			this.centerY = windowHeight;
			this.trigger();
		} else if (this.centerY <= consoleHeight) {
			this.centerY = consoleHeight;
		}

		if(!freezeOff) return;
		if (this.centerY >= windowHeight || this.centerY <= consoleHeight) {
			if(gravOn) {
				this.velocity *= -0.95;
				this.health -= 2;
			} else {
				this.velocity *= -0.98;
			}
		} else {
			this.velocity += gravity;
		}

		this.centerY += this.velocity;
	}

	this.draw = function() {
		fill(80, 80, 80);
		ellipse(this.centerX, this.centerY, this.life+1, this.life+1);
		fill(161, 222, 223);
		ellipse(this.centerX, this.centerY, this.health, this.health);
	}

	this.trigger = function() {
		if(!freezeOff) return;
		if(this.centerX <= windowWidth/3) {
			s1.play();
		}else if(this.centerX <= 2* windowWidth/3) {
			s2.play();
		} else {
			s3.play();
		}
	}

	this.getHealth = function() {
		return this.health;
	}
}