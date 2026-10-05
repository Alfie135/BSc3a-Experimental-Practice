class Square extends Shape {
    draw (){
        fill(this.fillColour);
        noStroke();
        rect(this.x, this.y, this.size, this.size);
        rectMode(CENTER);
    }

}