let DEBUG = true;
let gameManagerMain;

let frameBuffer;
let fbCam;

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

var aud0Narrator, aud1Unfinished, aud2BGMusic, tempVL; // Audio object for background sound

// Variables for 3D models (room parts)
let walls;
let floor;
let roof;
let desks;
let cabnets;
let doors;
let trim;
let wall2;
let cubicle;

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
var floorTexture, wallTexture, roofTex, deskTex, cabTex, reflection1, debug, wall2Tex, cubicleTex;

var mx = 0, my = 0; // Mouse movement deltas
// Listen for mouse movement to update mx and my (mouse deltas)


// Preload function: Loads all assets before setup()
function preload() {
  gameManagerMain = new gameManager;
  // Load sound files (mp3, ogg)
  soundFormats('mp3', 'ogg');
  aud0Narrator = loadSound('Audio/WaitingSimAudio.mp3');
  aud1Unfinished = loadSound('Audio/AudUnfinished.mp3');
  aud2BGMusic = loadSound('Audio/IntroducingStanly.mp3');
  tempVL = loadSound('Audio/TempVL.mp3');

  // Load image textures for 3D models
  floorTexture = loadImage('Textures/New/FloorBake.png');
  wallTexture = loadImage('Textures/New/WallBake2.png');
  roofTex = loadImage('Textures/New/CeilingBake.png');
  deskTex = loadImage('Textures/BakeTabel.png');
  cabTex = loadImage('Textures/FilingCabnets1K.png');
  reflection1 = loadImage('Textures/Reflections/HDRI1.jpg');
  debug = loadImage('Textures/Wall.png');
  trimTex = loadImage('Textures/New/TrimBake.png');
  wall2Tex = loadImage('Textures/New/Wall2Bake.png');
  cubicleTex = loadImage('Textures/New/CubicleBake.png');
  //doorTex = loadImage('Textures/DoorBake.png');

  //Load Reflection 360s


  // Load 3D models (.obj files)
  walls = loadModel('Models/New/Wall1.obj');
  trim = loadModel('Models/New/Trim.obj')
  floor = loadModel('Models/New/Floor.obj');
  roof = loadModel('Models/New/Ceiling.obj');
  desks = loadModel('Models/Desk.obj', true);
  cabnets = loadModel('Models/Cabnets.obj', true);
  doors = loadModel('Models/Doors.obj', true);
  wall2 = loadModel('Models/New/Wall2.obj');
  cubicle = loadModel('Models/New/Cubicle.obj');


  // Load font for text rendering
  fontNormal = loadFont('Fonts/JMH Typewriter-Bold.ttf');

  //playerController = new playerController.js;
}

// Setup function: Runs once at the start
let theCanvas;

function setup() {

  document.body.addEventListener("mousemove", function(e) {
    mx = e.movementX;
    my = e.movementY;
  });
  theCanvas = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  theCanvas.hide();
  frameBuffer = createFramebuffer();
  cam = frameBuffer.createCamera();
  fbCam = createCamera();
  cam.perspective(PI / 3.0, width / height, 0.01, 10000);
  fullscreen();
  let millisecond = millis();
  userStartAudio();

  //Create Input for modeling Debug
  //X

colliders = [

  new collider(50, 0, 200, 'blue', 10, 20, 10, false, true, true, tempVL),
  new collider(20, 0, 210, 'green', 25, 20, 3, false, false, false),//small, first on the right
  //LENGTH HEIGHT WIDTH
   new collider(86, 0, 210, 'green', 86, 20, 3, false, false, false),//big second on the right

new collider(90, 0, 150, 'green', 80, 20, 3, false, false, false),
 new collider(0, 0, 190, 'green', 100, 20, 3, false, false, false),
new collider(3, 0, 217, 'green', 20, 20, 3, false, false, false),//first room right

new collider(10, 0, 211, 'green', 1, 20, 11, false, false, false),//first doorway
new collider(50, 0, 166, 'green', 1, 20, 44, false, false, false),
new collider(108, 0, 164, 'green', 1, 20, 60, false, false, false),

new collider(130, 0, 190, 'green', 40, 20, 1, false, false, false),
new collider(148, 0, 210, 'green', 1, 20, 40, false, false, false),

new collider(164, 0, 229, 'green', 45, 20, 1, false, false, false),

new collider(108, 0, 210, 'green', 1, 20, 10, false, false, false),
new collider(127, 0, 237, 'green', 1, 20, 50, false, false, false),
new collider(122, 0, 229, 'green', 20, 20, 1, false, false, false),
new collider(187, 0, 245, 'green', 1, 20, 66, false, false, false),
new collider(127, 0, 320, 'green', 1, 20, 98, false, false, false),//big one on the left in the second room
new collider(187, 0, 298, 'green', 1, 20, 19, false, false, false),
new collider(127, 0, 308, 'green', 10, 20, 1, false, false, false),
new collider(157, 0, 308, 'green', 28, 20, 1, false, false, false),
new collider(148, 0, 312, 'green', 1, 20, 5, false, false, false),
new collider(148, 0, 336, 'green', 1, 20, 25, false, false, false),
new collider(73, 0, 186, 'green', 8, 20, 1, false, false, false),
new collider(58, 0, 166, 'green', 11, 20, 1, false, false, false),
new collider(100, 0, 180, 'green', 11, 20, 1, false, false, false),
new collider(83, 0, 158, 'green', 1, 20, 12, false, false, false),
new collider(117, 0, 299, 'green', 18, 20, 1, false, false, false),
new collider(106, 0, 286, 'green', 1, 20, 28, false, false, false),
new collider(117, 0, 261, 'green', 18, 20, 1, false, false, false),
new collider(168, 0, 329, 'green', 1, 20, 38, false, false, false),
new collider(157, 0, 349, 'green', 28, 20, 1, false, false, false),
new collider(129, 0, 349, 'green', 5, 20, 1, false, false, false),
new collider(197, 0, 308, 'green', 29.6, 20, 1, false, false, false),
new collider(134, 0, 369, 'green', 15, 20, 1, false, false, false),
new collider(176, 0, 369, 'green', 47, 20, 1, false, false, false),
new collider(203, 0, 349, 'green', 43, 20, 1, false, false, false),
new collider(218, 0, 369, 'green', 15, 20, 1, false, false, false),
new collider(225, 0, 367, 'green', 1, 20, 5, false, false, false),
new collider(225, 0, 351, 'green', 1, 20, 5, false, false, false),
new collider(195, 0, 230, 'green', 13, 20, 1, false, false, false),
new collider(229, 0, 230, 'green', 34, 20, 1, false, false, false),
new collider(246, 0, 237, 'green', 1, 20, 14, false, false, false),
new collider(246, 0, 281, 'green', 1, 20, 52, false, false, false),
new collider(234, 0, 308, 'green', 24, 20, 1, false, false, false),
new collider(226, 0, 328, 'purple', 1, 20, 36, false, false, false),
new collider(107, 0, 200, 'blue', 10, 20, 10, false, true, true, tempVL),
new collider(138, 0, 228, 'blue', 10, 20, 10, false, true, true, tempVL),
new collider(187, 0, 283, 'blue', 10, 20, 10, false, true, true, tempVL),
new collider(126, 0, 267, 'blue', 10, 20, 10, false, true, true, tempVL),
new collider(105, 0, 267, 'blue', 10, 20, 10, false, true, true, tempVL),
new collider(137, 0, 308, 'blue', 10, 20, 10, false, true, true, tempVL),
new collider(127, 0, 358, 'blue', 10, 20, 10, false, true, true, tempVL),
new collider(224, 0, 359, 'blue', 10, 20, 10, false, true, true, tempVL)
    ];

  //audioUnfinishedTrig = new collider(140, 0, 230, 'blue', 20, 20, 10, false, true, true, aud1Unfinished);

  //200, 100,19
  bounds1 = new collider(100, 0, 300, 'red', 300, 100, 300, false);
  
  //bounds2 = new collider(0, 0, 300, 'red', 10, 100, 19, false);
  //let collider3 = new collider(0, 0, 400, 'green', 10, 100, 200, false);

  //collider1.display();

 
  bounds = [bounds1];

  // Initialize the player controller and assign the camera
  playerController = new PlayerController(0, 0, 200, 1);
  playerController.cam = cam;

      if (debug) 
     {


        yIntField = createInput('');
        yIntField.attribute('placeholder', 'Y Int');
        yIntField.position(100, 200);
         yIntField.size(100);

        zIntField = createInput('');
        zIntField.attribute('placeholder', 'Z Int');
        zIntField.position(100, 300);
        zIntField.size(100);
    }
}

let playerLoc;

function startSim() 
{
  aud2BGMusic.play();
}

// Draw function: Main animation loop, runs every frame
function draw() {
  frameBuffer.begin();

          print("DebugTest1");
         xIntField = createInput('');
         xIntField.attribute('placeholder', playerLoc);
         xIntField.position(100, 100);
         xIntField.size(300);

  //let xInt = xIntField.value();
  //let yInt = yIntField.value();
  //let zInt = zIntField.value();

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
    playerLoc = playerController.printLoc();
    //textSize(22);
    //fill('yellow');
    //text("TEST", 6, 20);
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
    //print("Creating Level");
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

    texture(wall2Tex);
    model(wall2);

    texture(trimTex);
    model(trim);
    
    texture(cubicleTex);
    model(cubicle);

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

  // for(i = 0; i > 1; i++) {
  //   playIntroVid();
  //    print('Playing vid');
  //  }
      //print("Loaded map");
      image(frameBuffer, -width / 2, -height / 2);
      frameBuffer.pixelDensity(0.6);
//image(introVidTex, -width / 2,-height / 2);

 // introVid.play();
  //image(frameBuffer, -width / 2, -height / 2);
  //TODO RENDER IMAGE CORRECTLY
  
  // if (gameManagerMain.getList().length == 1) 
  //   {
  //     aud0Narrator.play();
  //   }
  // else 
  // {
  //   print("Less than 1 audio compleated");
  //   print(gameManagerMain.getList().length);
  // }

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
      if(colliders[lastCollided].getActive()) 
      {
        colliders[lastCollided].playAudio();
        colliders[lastCollided].setActive(false);
        print("Collided with audio trigger")

        gameManagerMain.update(colliders[lastCollided].returnAudio());
        gameManagerMain.printList();
        return true;
      }
      else 
      {
        print("Audio Trigger no longer active");
        return false;
      }
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

function handleEnd() {
  isDone = true;
  print("IS DONE");
}

function playIntroVid() 
{
  introVid.play();
}
