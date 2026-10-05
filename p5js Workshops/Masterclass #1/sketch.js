// Used to store all shapes
let allShapes = [];
let previousMouseX, previousMouseY;

function setup() {
  createCanvas(2560, 1440);
}

function draw() {
  // Process interaction
  if(mouseIsPressed){
    // Resolve the difference between current frame and last frame. 
    let dx = mouseX - previousMouseX;
    let dy = mouseY - previousMouseY;
    // Map the difference to a number more compatible with the velocity.
    let mappedDX = map(dx, -width, width, -100, 100);
    let mappedDY = map(dy, -height, height, -100, 100);
    let myShape = new Square(
      mouseX, // X position
      mouseY, // Y position
      random(10, 100), // Size
      color(random(255), random(255), random(255)), // Colour
      random(2000, 10000), // Life time in milliseconds
      // random(-5, 5), // Randomise X velocity
      // random(-5, 5)  // Randomise Y velocity
      mappedDX, // Mapped X velocity
      mappedDY, // Mapped Y velocity
  );
    allShapes.push(myShape);

  }
  // Process updates
  for (let i = 0; i < allShapes.length; i++){
    allShapes[i].update();
    if(allShapes[i].dead){
      allShapes.splice(i, 1);
      i--;
    }
  }
  // Track previous frames mouse position
  previousMouseX = mouseX;
  previousMouseY = mouseY;

  //Render (draw)
  background(220);
  for (let i = 0; i < allShapes.length; i++){
    allShapes[i].draw();
  }
}
