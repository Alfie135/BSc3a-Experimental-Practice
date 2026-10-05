class Square extends Shape {
    draw (){
        fill(this.fillColour);
        noStroke();
        rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

}