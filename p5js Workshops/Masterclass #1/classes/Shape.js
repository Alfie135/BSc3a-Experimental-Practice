class Shape {
    // Class properties
    x;
    y;
    vx;
    vy;
    size;
    fillColour;
    lifeTime;
    birthTime;
    dead;
    originalStates;
    constructor(x, y, size, fillColour, lifeTime, vx, vy){
        this.x = x;
        this.y = y;
        this.size = size;
        this.fillColour = fillColour;
        this.lifeTime = lifeTime;
        this.birthTime = millis();
        this.vx = vx;
        this.vy = vy;
        this.originalStates = {
            size: this.size,
        }
    }

    update(){
        // Calculate how long the shape has been alive
        this.timeAlive = millis() - this.birthTime;
        // Ratio of 0 to 1 from birth to death
        let ratio = this.timeAlive / this.lifeTime;
        // Test for death
        if(ratio >= 1){
            this.dead = true;
        }

        // Process size based on ratio
        this.size = this.originalStates.size * (1 - ratio); // Remaps the ratio from 1 to 0

        // Process movement
        this.x += this.vx;
        this.y += this.vy;
        // Test for boundary collision
        if(this.x < 0 + this.size/2 || this.x > width - this.size/2){
            this.vx *= -1; 
        }
        if (this.y < 0 + this.size/2 || this.y > height - this.size/2){
            this.vy *= -1;
        }
        // Update colour based on time alive
        let r = red(this.fillColour);
        let g = green(this.fillColour);
        let b = blue(this.fillColour);
        this.fillColour = color(r, g, b, 255 * (1 - ratio));

    }
}