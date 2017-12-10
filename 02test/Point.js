function Point(iorder, ellipseNumber) {

    this.ellipseNumber = ellipseNumber;
    this.order = iorder
    this.cx = centerPoints[this.ellipseNumber*2];
    this.cy = centerPoints[this.ellipseNumber*2 + 1];
    this.trig = (this.order / (nPoints)) * 2 * PI
    this.x = sin(this.trig) * radius / 2 + this.cx
    this.y = -(cos(this.trig)) * radius / 2 + this.cy
    this.color = color(255, 255, 255)
    this.counter = 0
    this.text = ' ';

    this.display = function() {
        fill(this.color)
        strokeWeight(2)
        ellipse(this.x, this.y, 35, 35)
        fill(0);
        textAlign(CENTER);
        strokeWeight(1)
        text(this.text, this.x, this.y+4)
    }

    this.update = function() {
        this.cx = centerPoints[this.ellipseNumber*2];
        this.cy = centerPoints[this.ellipseNumber*2 + 1];
        this.x = sin(this.trig) * radius / 2 + this.cx
        this.y = -(cos(this.trig)) * radius / 2 + this.cy
    }

    this.setColor = function() {
        if(this.ellipseNumber == 0) {
            var testValue = this.counter % 4
            switch (testValue) {
                case 3:
                    this.counter++
                    this.color = color(255, 255, 255)
                    soundStringA[this.order] = 0
                    break
                case 0:
                    this.counter++
                    this.color = color(30, 30, 225)
                    soundStringA[this.order] = 1
                    break
                case 1:
                    this.counter++
                    this.color = color(30, 225, 30)
                    soundStringA[this.order] = 2
                    break
                case 2:
                    this.counter++
                    this.color = color(225, 30, 30)
                    soundStringA[this.order] = 3
                    break
            }
        } else {
            var testValue = this.counter%7;
            switch(testValue) {
                case 6:
                    this.counter++;
                    this.color = color(255, 255, 255);
                    soundStringB[this.order] = 0
                    this.text = ' ';
                    break;
                case 0:
                    this.counter++;
                    this.color = color(255, 255, 200);
                    soundStringB[this.order] = 4
                    this.text = 'DÓ';
                    break;
                case 1:
                    this.counter++;
                    this.color = color(255, 255, 200);
                    soundStringB[this.order] = 5
                    this.text = 'RÉ';
                    break;
                case 2:
                    this.counter++;
                    this.color = color(255, 255, 200);
                    soundStringB[this.order] = 6
                    this.text = 'MI';
                    break;
                case 3:
                    this.counter++;
                    this.color = color(255, 255, 200);
                    soundStringB[this.order] = 7
                    this.text = 'SOL';
                    break;
                case 4:
                    this.counter++;
                    this.color = color(255, 255, 200);
                    soundStringB[this.order] = 8
                    this.text = 'LÁ';
                    break;
                case 5:
                    this.counter++;
                    this.color = color(255, 255, 200);
                    soundStringB[this.order] = 9
                    this.text = 'dó';
                    break;
                }

        }
    }

    this.onClick = function() {
        if (mouseX >= this.x - 20 && mouseX <= this.x + 20 && mouseY >= this.y - 20 && mouseY <= this.y + 20) {
            this.setColor()
        }
    }

    this.isActive = function(tick) {
        if ((tick % nPoints) == this.order) {
            fill(0)
            tempX = sin(this.trig) * radius * 1.2 / 2 + this.cx
            tempY = -(cos(this.trig)) * radius * 1.2 / 2 + this.cy
            ellipse(tempX, tempY, 5, 5)
        }
    }
}
