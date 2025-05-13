var keys = [];

let playerController;
// Global variables for loaded 3D models and textures
let millisecond;
let timer = 172800; // Timer variable, in seconds (172800 sec = 48 hours)

let fontNormal; // Font for text rendering

let narrator; // Audio object for background sound

// Variables for 3D models (room parts)
let walls;
let floor;
let roof;
let desks;
let cabnets;
let doors;

//Colliders
let collider1;

let colliders;

// Helper function: jQuery-like shorthand for document.querySelector
var $ = function(prop) {
  return document.querySelector(prop);  
};

// Helper function: Convert degrees to radians (for angles)
var ang = function(a) {
    return a * (Math.PI / 180);
};

// Texture variables
var floorTexture, wallTexture, roofTex, deskTex, cabTex, doorTex;

var mx = 0, my = 0; // Mouse movement deltas
// Listen for mouse movement to update mx and my (mouse deltas)
document.body.addEventListener("mousemove", function(e) {
    mx = e.movementX;
    my = e.movementY;
});

// Preload function: Loads all assets before setup()
function preload() {
    // Load sound files (mp3, ogg)
    soundFormats('mp3', 'ogg');
    narrator = loadSound('Audio/WaitingSimAudio.mp3');

    // Load image textures for 3D models
    floorTexture = loadImage('Textures/FloorBake.png');
    wallTexture = loadImage('Textures/WallBake.png');
    roofTex = loadImage('Textures/RoofBake.png');
    deskTex = loadImage('Textures/BakeTabel.png');
    cabTex = loadImage('Textures/FilingCabnets1K.png');
    doorTex = loadImage('Textures/DoorBake.png');

    // Load 3D models (.obj files)
    walls = loadModel('Models/Walls.obj', true);
    floor = loadModel('Models/Floor.obj', true);
    roof = loadModel('Models/Roof.obj', true);
    desks = loadModel('Models/Desk.obj', true);
    cabnets = loadModel('Models/Cabnets.obj', true);
    doors = loadModel('Models/Doors.obj', true);

    // Load font for text rendering
    fontNormal = loadFont('Fonts/JMH Typewriter-Bold.ttf');

  //playerController = new playerController.js;
}

// Setup function: Runs once at the start
function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
      cam = createCamera();
      cam.perspective(PI / 3.0, width / height, 0.01, 10000);
      fullscreen();
      let millisecond = millis();
      userStartAudio();
      narrator.play();

  //Load Colliders
  collider1 = new collider(1000, 100, 0, 'blue', 20, 1900, 150, false);

  colliders = [collider1];
  
      // Initialize the player controller and assign the camera
      playerController = new PlayerController(0,0,200);
      playerController.cam = cam;
}

// Draw function: Main animation loop, runs every frame
function draw() {
        for (let i = 0; i < colliders.length; i = i + 1) {
          colliders[i].display();
          if (!playerController.isColliding(colliders[i])) {
      
            print('NOT Colliding!!!!!');
            //playerClass.move(0,-1,0);
          }
          else {
            print('Colliding!!!!!');
            if (playerController.isColliding(colliders[i]) && colliders[i].item == true) {
              items = items + 1;
              print('Collided with item');
              colliders[i].setZ();
      
            }
            playerController.setlocation();
          }
      
      
        }
    // Set the target frame rate
    frameRate(60);

    // Clear the canvas with a white background
    background(255);

    // Disable outlines on shapes
    noStroke();

    // Enable smooth rendering
    smooth();

    // Update and apply player camera
      playerController.handleMouseMovement(mx, my);
      playerController.updateCamera();
      
      // Check for collisions and handle movement
        if (keys[87]) {
          let collideup = checkCollision();
          if (collideup == false) {
            playerController.handleMovement();
          }
        }

       if (keys[83]) {
          let collidedown = checkCollision();
          if (collidedown == false) {
            playerController.handleMovement();
          }
        }

       if (keys[65]) {
          let collidedown = checkCollision();
          if (collidedown == false) {
            playerController.handleMovement();
          }
        }
  
        if (keys[68]) {
          let collidedown = checkCollision();
          if (collidedown == false) {
            playerController.handleMovement();
          }
        }
    

    // Rotate the view to match 3D world orientation
    rotateX(ang(90));

    // Draw and texture the walls
    translate(90, 200, 0);
    texture(wallTexture);
    model(walls);

    // Draw and texture the floor
    translate(0, -1, -11);
    texture(floorTexture);
    model(floor);

    // Draw and texture the roof
    translate(0, 0, 22);
    texture(roofTex);
    model(roof);

    // Draw and texture the desks
    translate(-14, 40, -18.7);
    scale(0.47);
    texture(deskTex);
    model(desks);

    // Draw and texture the cabinets
    translate(-80, -1, 7);
    scale(0.16);
    texture(cabTex);
    model(cabnets);

    // Draw and texture the doors (with complex transformation)
    translate(800, -1200, 7);
    scale(-11);
    rotateX(ang(180));
    rotateZ(ang(270));
    texture(doorTex);
    model(doors);

    // Decrement timer every second (60 frames = 1 second)
    if (frameCount % 60 == 0 && timer > 0) {
        timer--;
    }

    // Display "You Lose!" when timer reaches 0
    if (timer == 0) {
        text("You Lose!", 1000, -600, 0);
    }
}

// Track key presses (set key state to true)
function keyPressed() {
  keys[keyCode] = true;
  playerController.keys[keyCode] = true;
}
function keyReleased() {
  keys[keyCode] = false;
  playerController.keys[keyCode] = false;
}
function mouseClicked() {
  if (canvas.requestPointerLock) {
    canvas.requestPointerLock();
  }
}

function checkCollision() {
  for (let i = 0; i < colliders.length; i = i + 1) {
    if (playerController.isColliding(colliders[i])) {
      return true;
    }
  }
  return false;
}