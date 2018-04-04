/* eslint-disable */

function Point(iorder, rowNumber, icolor) {

	this.rowNumber = rowNumber;
	this.order = iorder;
	if(windowWidth >= windowHeight) {
		this.x = windowWidth/4 + windowWidth/15*iorder;
		this.y = windowHeight/6 + windowHeight/15*rowNumber;
	} else {
		this.x = windowWidth/4 + windowWidth/15*rowNumber;
		this.y = windowHeight/6 + windowHeight/15*iorder;
	}
	this.color = icolor;
	this.counter = 0;
	this.text = '0';

	this.display = function() {
		textAlign(CENTER);
		textSize(30);
		noStroke();
		if(this.counter % 2 === 0) {
			fill(this.color);
			text(this.text, this.x, this.y);
		} else {
			rectMode(CENTER);
			fill(this.color);
			rect(this.x, this.y, 40, 40);
			fill(255);
			text(this.text, this.x, this.y);
		}


	};

	this.update = function() {
		if(windowWidth >= windowHeight) {
			this.x = windowWidth/4 + windowWidth/15*iorder;
			this.y = windowHeight/6 + windowHeight/15*rowNumber;
		} else {
			this.x = windowWidth/4 + windowWidth/15*rowNumber;
			this.y = windowHeight/6 + windowHeight/15*iorder;
		}
	};

	this.setColor = function() {
		this.counter++;
		switch(rowNumber) {

			// ROW NUMBER ONE
			case 0:
				switch(this.counter % 2) {
					case 0:
						g1Pattern[this.order] = 0;
						myPart.replaceSequence(g1Phrase, g1Pattern);
						this.text = '0';
						break;
					case 1:
						g1Pattern[this.order] = 1;
						myPart.replaceSequence(g1Phrase, g1Pattern);
						this.text = '1';
						break;
				}
			break;

			//ROW NUMBER TWO
			case 1:
				switch(this.counter % 2) {
					case 0:
						g2Pattern[this.order] = 0;
						myPart.replaceSequence(g2Phrase, g2Pattern);
						this.text = '0';
						break;
					case 1:
						g2Pattern[this.order] = 1;
						myPart.replaceSequence(g2Phrase, g2Pattern);
						this.text = '1';
						break;
				}
			break;

			//ROW NUMBER THREE
			case 2:
				switch(this.counter % 2) {
					case 0:
						g3Pattern[this.order] = 0;
						myPart.replaceSequence(g3Phrase, g3Pattern);
						this.text = '0';
						break;
					case 1:
						g3Pattern[this.order] = 1;
						myPart.replaceSequence(g3Phrase, g3Pattern);
						this.text = '1';
						break;
				}
			break;

			case 3:
				switch(this.counter % 2) {
					case 0:
						bPattern[this.order] = 0;
						myPart.replaceSequence(bPhrase, bPattern);
						this.text = '0';
						break;
					case 1:
						bPattern[this.order] = 1;
						myPart.replaceSequence(bPhrase, bPattern);
						this.text = '1';
						break;
				}
			break;

			case 4:
				switch(this.counter % 2) {
					case 0:
						pPattern[this.order] = 0;
						myPart.replaceSequence(pPhrase, pPattern);
						this.text = '0';
						break;
					case 1:
						pPattern[this.order] = 1;
						myPart.replaceSequence(pPhrase, pPattern);
						this.text = '1';
						break;
				}
			break;

			case 5:
				switch(this.counter % 2) {
					case 0:
						cPattern[this.order] = 0;
						myPart.replaceSequence(cPhrase, cPattern);
						this.text = '0';
						break;
					case 1:
						cPattern[this.order] = 1;
						myPart.replaceSequence(cPhrase, cPattern);
						this.text = '1';
						break;
				}
			break;

			case 6:
				switch(this.counter % 2) {
					case 0:
						d1Pattern[this.order] = 0;
						myPart.replaceSequence(d1Phrase, d1Pattern);
						this.text = '0';
						break;
					case 1:
						d1Pattern[this.order] = 1;
						myPart.replaceSequence(d1Phrase, d1Pattern);
						this.text = '1';
						break;
				}
			break;

			case 7:
				switch(this.counter % 2) {
					case 0:
						d2Pattern[this.order] = 0;
						myPart.replaceSequence(d2Phrase, d2Pattern);
						this.text = '0';
						break;
					case 1:
						d2Pattern[this.order] = 1;
						myPart.replaceSequence(d2Phrase, d2Pattern);
						this.text = '1';
						break;
				}
			break;

			case 8:
				switch(this.counter % 2) {
					case 0:
						d3Pattern[this.order] = 0;
						myPart.replaceSequence(d3Phrase, d3Pattern);
						this.text = '0';
						break;
					case 1:
						d3Pattern[this.order] = 1;
						myPart.replaceSequence(d3Phrase, d3Pattern);
						this.text = '1';
						break;
				}
			break;

			case 9:
				switch(this.counter % 2) {
					case 0:
						customPattern[this.order] = 0;
						myPart.replaceSequence(customPhrase, customPattern);
						this.text = '0';
						break;
					case 1:
						customPattern[this.order] = 1;
						myPart.replaceSequence(customPhrase, customPattern);
						this.text = '1';
						break;
				}
			break;


			}
	};

	this.onClick = function() {
		if(mouseX >= this.x-20 && mouseX <= this.x+20 && mouseY >= this.y-20 && mouseY <= this.y+20){
			if(this.ellipseNumber == 0) memoryPointsA[aSelector][this.order]++;
			if(this.ellipseNumber == 1) memoryPointsB[bSelector][this.order]++;
			this.setColor();
		}
	};

	this.isActive = function(tick) {
		if((tick%cycle) == this.order) {
			fill(0);
			tempX = this.x;
			tempY = this.y - 20;
			ellipse(tempX, tempY, 5, 5);
		}
	};
}
