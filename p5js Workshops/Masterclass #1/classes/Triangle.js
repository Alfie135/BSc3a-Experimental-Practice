class Triangle extends Shape {
    draw() {
        fill(this.fillColour);
        noStroke();
        triangle(
            this.x, this.y - this.size / 2, // Top corner
            this.x - this.size / 2, this.y + this.size / 2, // Bottom left corner
            this.x + this.size / 2, this.y + this.size / 2  // Bottom right corner
        );
    }
}
