function Point(iorder) {

	this.order = iorder;
	this.x = windowWidth/5 + windowWidth*0.08*iorder;
	this.y = windowHeight/2;
	this.counter = 0;

	this.update = function() {
			this.x = windowWidth/5 + windowWidth*0.08*iorder;
		this.y = windowHeight/2;
	}

	this.onClick = function() {
		if(mouseX >= this.x-20 && mouseX <= this.x+20 && mouseY >= this.y-20 && mouseY <= this.y+20){
			if(clapPattern[this.order] == 0) {
				clapPattern[this.order] = 1;
			} else if(clapPattern[this.order] == 1) {
				clapPattern[this.order] = 0;
			} 
		}
	};

	this.isActive = function(tick) {
		if((tick%cycle) == this.order) {
			fill(0);
			tempX = this.x;
			tempY = this.y + 30;
			ellipse(tempX, tempY, 4, 4);
		}
	};
}