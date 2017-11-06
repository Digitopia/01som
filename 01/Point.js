function Point(iorder) {

    this.order = iorder
    this.trig = (this.order / (cycle)) * 2 * PI
    this.x = sin(this.trig) * radius / 2 + cx
    this.y = -(cos(this.trig)) * radius / 2 + cy
    this.color = color(255, 255, 255)
    this.counter = 0

    this.display = function() {
        fill(this.color)
        strokeWeight(2)
        ellipse(this.x, this.y, 35, 35)
    }

    this.update = function() {
        this.x = sin(this.trig) * radius / 2 + cx
        this.y = -(cos(this.trig)) * radius / 2 + cy
    }

    this.setColor = function() {
        var testValue = this.counter % 4
        switch (testValue) {
            case 3:
                this.counter++
                    this.color = color(255, 255, 255)
                soundString[this.order] = 0
                break
            case 0:
                this.counter++
                    this.color = color(30, 30, 225)
                soundString[this.order] = 1
                break
            case 1:
                this.counter++
                    this.color = color(30, 225, 30)
                soundString[this.order] = 2
                break
            case 2:
                this.counter++
                    this.color = color(225, 30, 30)
                soundString[this.order] = 3
                break
        }
    }

    this.onClick = function() {
        if (mouseX >= this.x - 20 && mouseX <= this.x + 20 && mouseY >= this.y - 20 && mouseY <= this.y + 20) {
            this.setColor()
        }
    }

    this.isActive = function(tick) {
        if ((tick % cycle) == this.order) {
            fill(0)
            noStroke()
            tempX = sin(this.trig) * radius * 1.2 / 2 + cx
            tempY = -(cos(this.trig)) * radius * 1.2 / 2 + cy
            ellipse(tempX, tempY, 5, 5)
        }
    }
}
