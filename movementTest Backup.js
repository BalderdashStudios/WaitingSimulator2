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

// Helper function: jQuery-like shorthand for document.querySelector
var $ = function(prop) {
  return document.querySelector(prop);  
};

// Helper function: Convert degrees to radians (for angles)
var ang = function(a) {
    return a * (Math.PI / 180);
};

// Player movement and camera control variables
var playerSpeed = 0.5;
var sensitivityX = 0.15; // Mouse sensitivity X axis
var sensitivityY = 0.15; // Mouse sensitivity Y axis
var mx = 0, my = 0; // Mouse movement deltas
var keys = []; // Array to track key states
var cam; // Camera object
var yAng = 0; // Vertical angle for camera

// Texture variables
var floorTexture, wallTexture, roofTex, deskTex, cabTex, doorTex;

// Listen for mouse movement to update mx and my (mouse deltas)
document.body.addEventListener("mousemove", function(e) {
    mx = e.movementX;
    my = e.movementY;
});

// D object: Stores camera and player position/rotation data
var D = {
    cx: 0, // Camera horizontal angle change (not used in a standard way)
    cy: 0, // Camera vertical angle change (not used in a standard way)
    x: 0,  // Player X position
    y: 0,  // Player Y position (height)
    z: 200, // Player Z position (depth)
    r: 0,  // Player rotation angle (horizontal)
    r2: 0  // Unused in this code
};

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
}

// Setup function: Runs once at the start
function setup() {
    // Create a 3D canvas that fills the window
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);

    // Create and configure the camera (perspective mode)
    cam = createCamera();
    cam.perspective(PI / 3.0, width / height, 0.01, 10000);

    // Set fullscreen mode (if supported)
    fullscreen();

    // Start audio and play the background sound
    userStartAudio();
    narrator.play();
}

// Draw function: Main animation loop, runs every frame
function draw() {
    // Set the target frame rate
    frameRate(60);

    // Clear the canvas with a white background
    background(255);

    // Disable outlines on shapes
    noStroke();

    // Enable smooth rendering
    smooth();

    // Apply camera pan and tilt based on mouse movement
    cam.pan(ang(-D.cx));
    cam.tilt(ang(D.cy));

    // Update rotation angles based on mouse movement
    D.r -= (mx * sensitivityX);
    yAng -= (my * sensitivityY);

    // Set camera position to player position
    cam.setPosition(D.x, -D.y, D.z);

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

    // Update camera angles based on mouse movement
    D.cx = mx * sensitivityX;
    D.cy = my * sensitivityY;

    // Decrement timer every second (60 frames = 1 second)
    if (frameCount % 60 == 0 && timer > 0) {
        timer--;
    }

    // Display "You Lose!" when timer reaches 0
    if (timer == 0) {
        text("You Lose!", 1000, -600, 0);
    }

    // Handle WASD key movement
    if (keys[87]) { // W key (forward)
        D.z -= cos(ang(D.r)) * playerSpeed;
        D.x -= sin(ang(D.r)) * playerSpeed;
    }
    if (keys[83]) { // S key (backward)
        D.z += cos(ang(D.r)) * playerSpeed;
        D.x += sin(ang(D.r)) * playerSpeed;
    }
    if (keys[65]) { // A key (left)
        D.z -= cos(ang(D.r + 90)) * playerSpeed;
        D.x -= sin(ang(D.r + 90)) * playerSpeed;
    }
    if (keys[68]) { // D key (right)
        D.z += cos(ang(D.r + 90)) * playerSpeed;
        D.x += sin(ang(D.r + 90)) * playerSpeed;
    }

    // Handle Shift key (sprint/crouch)
    if (keys[16]) { // Shift key
        D.y = -10; // "Crouch" or slow down (lower position)
        playerSpeed = 0.3;
    } else {
        D.y = 0; // Normal height
        playerSpeed = 0.5;
    }

    // Dampen mouse movement (gradually reduce mx/my to zero)
    if (mx > 0) { mx--; }
    if (mx < 0) { mx++; }
    if (my > 0) { my--; }
    if (my < 0) { my++; }

    // Limit vertical camera angle and adjust sensitivity
    if (yAng < -30) {
        if (my > 0) {
            sensitivityY = 0; // Prevent looking down further
        }
        if (my < 0) {
            sensitivityY = 0.15; // Allow looking up
        }
    }
    if (yAng > 30) {
        if (my < 0) {
            sensitivityY = 0; // Prevent looking up further
        }
        if (my > 0) {
            sensitivityY = 0.15; // Allow looking down
        }
    }
}

// Track key presses (set key state to true)
function keyPressed() {
    keys[keyCode] = true;
}

// Track key releases (set key state to false)
function keyReleased() {
    keys[keyCode] = false;
}

// Handle mouse click to lock pointer (for fullscreen FPS controls)
function mouseClicked() {
    if (canvas.requestPointerLock) {
        canvas.requestPointerLock();
    }
}