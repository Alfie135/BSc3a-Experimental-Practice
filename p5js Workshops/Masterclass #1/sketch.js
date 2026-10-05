// Used to store all shapes
let allShapes = [];
let previousMouseX, previousMouseY;
let buttons = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  width - (SoundButton.Width * 6) / 2;
  let offset = (width - (SoundButton.Width * 6)) / 2;
  for (let i = 0; i < 6; i++) {
    let button = new SoundButton(i, i * SoundButton.Width + offset, height - SoundButton.Height, color(random(255), random(255), random(255)));
    buttons.push(button);
  }

  _renderer.canvas.addEventListener("soundButtonPressed", placeShape)
}

function placeShape(event) {
  console.log(event);
  let buttonCircle = new Circle(event.detail.x, event.detail.y, random(20, 100), event.detail.colour, random(2000, 10000), random(-2, 2), random(-2, 2));
  allShapes.push(buttonCircle);
};

function draw() {
  // Process interaction ////////////////////////////////////////////////////////////////////////////////
  if (mouseIsPressed) {
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
  // Process updates ////////////////////////////////////////////////////////////////////////////////
  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].update();
    if (allShapes[i].dead) {
      allShapes.splice(i, 1);
      i--;
    }
  }

  // Update buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].update();
  }

  // Track previous frames mouse position
  previousMouseX = mouseX;
  previousMouseY = mouseY;

  //Render (draw) ////////////////////////////////////////////////////////////////////////////////
  background(220);
  for (let i = 0; i < allShapes.length; i++) {
    allShapes[i].draw();
  }
  // Loop through and draw all buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].draw();
  }

}
