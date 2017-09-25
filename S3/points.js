function Point(iorder, ellipseNumber) {

	this.ellipseNumber = ellipseNumber;
	this.order = iorder;
	this.cx = centerPoints[this.ellipseNumber*2];
	this.cy = centerPoints[this.ellipseNumber*2 + 1];
	this.trig = (this.order/(cycle))*2*PI;
	this.x = sin(this.trig)*radius/2+this.cx;
	this.y = -(cos(this.trig))*radius/2+this.cy;
	this.color = color(255, 255, 255);
	this.counter = 0;
	this.text = ' ';

	this.display = function() {
		fill(this.color);
		ellipse(this.x, this.y, 35, 35);
		fill(0);
		textAlign(CENTER);
		text(this.text, this.x, this.y);
	};

	this.update = function() {
		this.cx = centerPoints[this.ellipseNumber*2];
		this.cy = centerPoints[this.ellipseNumber*2 + 1];
		this.x = sin(this.trig)*radius/2+this.cx;
		this.y = -(cos(this.trig))*radius/2+this.cy;
	};

	this.setColor = function() {
		if (this.ellipseNumber == 0) {
			switch(memoryPointsA[aSelector][this.order] % 4) {
				case 0: 
					this.color = color(255, 255, 255);
					kickPattern[this.order] = 0;
					clapPattern[this.order] = 0;
					snapPattern[this.order] = 0;
					myPart.replaceSequence(myKickPhrase,kickPattern);
					myPart.replaceSequence(myClapPhrase, clapPattern);
					myPart.replaceSequence(mySnapPhrase, snapPattern);
					break;
				case 1: 
					this.counter++;
					this.color = color(30, 30, 255);
					kickPattern[this.order] = 1;
					clapPattern[this.order] = 0;
					snapPattern[this.order] = 0;
					myPart.replaceSequence(myKickPhrase,kickPattern);
					myPart.replaceSequence(myClapPhrase, clapPattern);
					myPart.replaceSequence(mySnapPhrase, snapPattern);
					break;
				case 2: 
					this.color = color(30, 255, 30);
					kickPattern[this.order] = 0;
					clapPattern[this.order] = 1;
					snapPattern[this.order] = 0;
					myPart.replaceSequence(myKickPhrase,kickPattern);
					myPart.replaceSequence(myClapPhrase, clapPattern);
					myPart.replaceSequence(mySnapPhrase, snapPattern);
					break;
				case 3: 
					this.color = color(255, 30, 30);
					kickPattern[this.order] = 0;
					clapPattern[this.order] = 0;
					snapPattern[this.order] = 1;
					myPart.replaceSequence(myKickPhrase,kickPattern);
					myPart.replaceSequence(myClapPhrase, clapPattern);
					myPart.replaceSequence(mySnapPhrase, snapPattern);
					break;
			}
		
		} else {
			switch(memoryPointsB[bSelector][this.order] % 7) {
				case 0: 
					this.color = color(255, 255, 255);
					do1Pattern[this.order] = 0;
					rePattern[this.order] = 0;
					miPattern[this.order] = 0;
					solPattern[this.order] = 0;
					laPattern[this.order] = 0;
					do2Pattern[this.order] = 0;
					myPart.replaceSequence(myDo1Phrase,do1Pattern);
					myPart.replaceSequence(myRePhrase,rePattern);
					myPart.replaceSequence(myMiPhrase,miPattern);
					myPart.replaceSequence(mySolPhrase,sol.Pattern);
					myPart.replaceSequence(myLaPhrase,laPattern);
					myPart.replaceSequence(myDo2Phrase,do2Pattern);	
					this.text = ' ';
					break;
				case 1: 
					this.color = color(218,165,32);
					do1Pattern[this.order] = 1;
					rePattern[this.order] = 0;
					miPattern[this.order] = 0;
					solPattern[this.order] = 0;
					laPattern[this.order] = 0;
					do2Pattern[this.order] = 0;
					myPart.replaceSequence(myDo1Phrase,do1Pattern);
					myPart.replaceSequence(myRePhrase,rePattern);
					myPart.replaceSequence(myMiPhrase,miPattern);
					myPart.replaceSequence(mySolPhrase,sol.Pattern);
					myPart.replaceSequence(myLaPhrase,laPattern);
					myPart.replaceSequence(myDo2Phrase,do2Pattern);
					this.text = 'DÓ';
					break;
				case 2: 
					this.color = color(230, 230, 250);
					do1Pattern[this.order] = 0;
					rePattern[this.order] = 1;
					miPattern[this.order] = 0;
					solPattern[this.order] = 0;
					laPattern[this.order] = 0;
					do2Pattern[this.order] = 0;
					myPart.replaceSequence(myDo1Phrase,do1Pattern);
					myPart.replaceSequence(myRePhrase,rePattern);
					myPart.replaceSequence(myMiPhrase,miPattern);
					myPart.replaceSequence(mySolPhrase,sol.Pattern);
					myPart.replaceSequence(myLaPhrase,laPattern);
					myPart.replaceSequence(myDo2Phrase,do2Pattern);
					this.text= 'RÉ';
					break;
				case 3: 
					this.color = color(170, 250, 172);
					do1Pattern[this.order] = 0;
					rePattern[this.order] = 0;
					miPattern[this.order] = 1;
					solPattern[this.order] = 0;
					laPattern[this.order] = 0;
					do2Pattern[this.order] = 0;
					myPart.replaceSequence(myDo1Phrase,do1Pattern);
					myPart.replaceSequence(myRePhrase,rePattern);
					myPart.replaceSequence(myMiPhrase,miPattern);
					myPart.replaceSequence(mySolPhrase,sol.Pattern);
					myPart.replaceSequence(myLaPhrase,laPattern);
					myPart.replaceSequence(myDo2Phrase,do2Pattern);
					this.text= 'MI';
					break;
				case 4: 
					this.color = color(222, 129, 192);
					do1Pattern[this.order] = 0;
					rePattern[this.order] = 0;
					miPattern[this.order] = 0;
					solPattern[this.order] = 1;
					laPattern[this.order] = 0;
					do2Pattern[this.order] = 0;
					myPart.replaceSequence(myDo1Phrase,do1Pattern);
					myPart.replaceSequence(myRePhrase,rePattern);
					myPart.replaceSequence(myMiPhrase,miPattern);
					myPart.replaceSequence(mySolPhrase,sol.Pattern);
					myPart.replaceSequence(myLaPhrase,laPattern);
					myPart.replaceSequence(myDo2Phrase,do2Pattern);
					this.text= 'SOL';
					break;
				case 5: 
					this.color = color(132, 170, 233);
					do1Pattern[this.order] = 0;
					rePattern[this.order] = 0;
					miPattern[this.order] = 0;
					solPattern[this.order] = 0;
					laPattern[this.order] = 1;
					do2Pattern[this.order] = 0;
					myPart.replaceSequence(myDo1Phrase,do1Pattern);
					myPart.replaceSequence(myRePhrase,rePattern);
					myPart.replaceSequence(myMiPhrase,miPattern);
					myPart.replaceSequence(mySolPhrase,sol.Pattern);
					myPart.replaceSequence(myLaPhrase,laPattern);
					myPart.replaceSequence(myDo2Phrase,do2Pattern);
					this.text= 'LÁ';
					break;
				case 6: 
					this.color = color(255,248,220);
					do1Pattern[this.order] = 0;
					rePattern[this.order] = 0;
					miPattern[this.order] = 0;
					solPattern[this.order] = 0;
					laPattern[this.order] = 0;
					do2Pattern[this.order] = 1;
					myPart.replaceSequence(myDo1Phrase,do1Pattern);
					myPart.replaceSequence(myRePhrase,rePattern);
					myPart.replaceSequence(myMiPhrase,miPattern);
					myPart.replaceSequence(mySolPhrase,sol.Pattern);
					myPart.replaceSequence(myLaPhrase,laPattern);
					myPart.replaceSequence(myDo2Phrase,do2Pattern);
					this.text= 'dó';
					break;
			}
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
			tempX = sin(this.trig)*radius*1.2/2+this.cx;
			tempY = -(cos(this.trig))*radius*1.2/2+this.cy;
			ellipse(tempX, tempY, 5, 5);
		}
	};
}