let DEBUG = false;

let frameBuffer;
let fbCam;

let introVid;

//Modeling DEBUG
let xInt = 0;
let yInt = 0;
let zInt = 0;

var keys = [];

let playerController;
// Global variables for loaded 3D models and textures
let millisecond;
let timer = 172800; // Timer variable, in seconds (172800 sec = 48 hours)

let fontNormal; // Font for text rendering

var aud0Narrator, aud1Unfinished, aud2BGMusic; // Audio object for background sound

// Variables for 3D models (room parts)
let walls;
let floor;
let roof;
let desks;
let cabnets;
let doors;

//Colliders
var collider1, collider2;

//Bounds
var bound1;

let bounds;

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
var floorTexture, wallTexture, roofTex, deskTex, cabTex, reflection1, debug;

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
  aud0Narrator = loadSound('Audio/WaitingSimAudio.mp3');
  aud1Unfinished = loadSound('Audio/AudUnfinished.mp3');
  aud2BGMusic = loadSound('Audio/IntroducingStanly.mp3');

  // Load image textures for 3D models
  floorTexture = loadImage('Textures/New/FloorBake.png');
  wallTexture = loadImage('Textures/New/WallBake2.png');
  roofTex = loadImage('Textures/New/CeilingBake.png');
  deskTex = loadImage('Textures/BakeTabel.png');
  cabTex = loadImage('Textures/FilingCabnets1K.png');
  reflection1 = loadImage('Textures/Reflections/HDRI1.jpg');
  debug = loadImage('Textures/Wall.png')
  //doorTex = loadImage('Textures/DoorBake.png');

  //Load Reflection 360s


  // Load 3D models (.obj files)
  walls = loadModel('Models/New/Wall1.obj');
  floor = loadModel('Models/New/Floor.obj');
  roof = loadModel('Models/New/Ceiling.obj');
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
  frameBuffer = createFramebuffer();
  cam = frameBuffer.createCamera();
  fbCam = createCamera();
  cam.perspective(PI / 3.0, width / height, 0.01, 10000);
  fullscreen();
  let millisecond = millis();
  userStartAudio();

  //Create Input for modeling Debug
  //X
  if (debug) 
    {
        xIntField = createInput('');
        xIntField.attribute('placeholder', 'X Int');
        xIntField.position(100, 100);
        xIntField.size(100);

        yIntField = createInput('');
        yIntField.attribute('placeholder', 'Y Int');
        yIntField.position(100, 200);
        yIntField.size(100);

        zIntField = createInput('');
        zIntField.attribute('placeholder', 'Z Int');
        zIntField.position(100, 300);
        zIntField.size(100);
    }

  //Load Colliders
  collider1 = new collider(50, 0, 200, 'blue', 10, 20, 10, false, true, false, aud0Narrator);
  collider2 = new collider(20, 0, 210, 'blue', 20, 20, 3, false, false, false);
  //LENGTH HEIGHT WIDTH
  collider3 = new collider(90, 0, 210, 'blue', 80, 20, 3, false, false, false);

  collider4 = new collider(90, 0, 150, 'green', 80, 20, 3, false, false, false);

  collider5 = new collider(0, 0, 190, 'green', 100, 20, 3, false, false, false);

  audioUnfinishedTrig = new collider(140, 0, 230, 'green', 20, 20, 10, false, true, true, aud1Unfinished);

  //200, 100,19
  bounds1 = new collider(100, 0, 200, 'red', 200, 100, 100, false);
  
  //bounds2 = new collider(0, 0, 300, 'red', 10, 100, 19, false);
  //let collider3 = new collider(0, 0, 400, 'green', 10, 100, 200, false);

  //collider1.display();

  colliders = [collider1, collider2, collider3, collider4, collider5, audioUnfinishedTrig];

  bounds = [bounds1];

  // Initialize the player controller and assign the camera
  playerController = new PlayerController(0, 0, 200, 1);
  playerController.cam = cam;

    introVid = createVideo("Videos/Intro.mp4");
  introVid.size(windowWidth, windowHeight);
  introVid.volume(1);
  introVid.hide();
  introVid.play();
   //aud2BGMusic.play();
}

// Draw function: Main animation loop, runs every frame
function draw() {
  let introVidTex = introVid.get();
  frameBuffer.begin();
  let xInt = xIntField.value();
  let yInt = yIntField.value();
  let zInt = zIntField.value();

  // Set the camera for the framebuffer.
  setCamera(cam);


  // Set the target frame rate
  frameRate(250);

  // Clear the canvas with a white background
  background(255);
  //panorama(reflection1);

  // Disable outlines on shapes

  // Enable smooth rendering
  smooth();

  // Update and apply player camera
  playerController.handleMouseMovement(mx, my);
  playerController.updateCamera();
  mx = 0;
  my = 0;

  // 1. Collect input
  let moveX = 0;
  let moveZ = 0;

  if (keys[87]) { // W
    moveX += 1;
  }
  if (keys[83]) { // S
    moveZ -= 1;
  }
  if (keys[65]) { // A
    moveX -= 2;
  }
  if (keys[68]) { // D
    moveZ += 2;
  }

  // 2. Only move if there's input
  if (moveX !== 0 || moveZ !== 0) {
    // Optionally, check collision here for the intended direction
    //if (!checkCollision()) {
    playerController.handleMovement(deltaTime);
    checkCollision();
    checkBoundingCollision();
    //}
  }
  //DEBUG COLLIDERS
  //push();
  //collider1.translate(xInt, yInt, zInt);
  //pop();
  //for (let i = 0; i < colliders.length; i++) {
  //colliders[i].display();
  //}

  // Rotate the view to match 3D world orientation
  rotateX(ang(90));

  push();
  translate(30, 230, -11);
  scale(8, -8, 8)

  noStroke();
  texture(floorTexture);
  model(floor);
  //textureWrap(REPEAT);
  //let c = color(100, 100, 100);
  //directionalLight(c, 0, 20, 30);
  //ambientLight(80);
  texture(wallTexture);
  model(walls);

  texture(roofTex);
  model(roof);

  pop();

  push();

  imageLight(reflection1);
  translate(-80, -1, 7);
  scale(0.16);
  specularMaterial(100);
  shininess(100);
  metalness(100);
  texture(cabTex);
  model(cabnets);
  pop();

  frameBuffer.end();
  setCamera(fbCam);
  // Reset all transformations.
  resetMatrix();

  if(introVidTex.onended()) 
    {
      image(frameBuffer, -width / 2, -height / 2);
     frameBuffer.pixelDensity(0.6);
    }

    //TODO RENDER IMAGE CORRECTLY
  image(introVidTex, -width / 2,-height / 2);

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
  //Loop through colliders
  let isColliding = false;
  let lastCollided;
  for (let i = 0; i < colliders.length; i++) {
    if (DEBUG) {
      colliders[i].display();
    }
    //Check if player is colliding
    if (playerController.isColliding(colliders[i])) {
      isColliding = true;
      lastCollided = i;
    }
  }
  if (isColliding) {
    if (colliders[lastCollided].getAudioTrigger()) {
      colliders[lastCollided].playAudio();
      colliders[lastCollided].setActive(false);
      print("Collided with audio trigger")
      return true;
    }
    else {
      playerController.resetLocation();
      return true;
    }
  }
  else {
    return false;
  }
}

function checkBoundingCollision() {
  //Loop through colliders
  let isColliding = true;
  for (let i = 0; i < bounds.length; i++) {
    if (DEBUG) {
      bounds[i].display();
    }
    //Check if player is colliding
    if (!playerController.isColliding(bounds[i])) {
      isColliding = false;
    }
  }
  if (!isColliding) {
    playerController.resetLocation();
    return true;
  }
  else {
    return false;
  }
}
