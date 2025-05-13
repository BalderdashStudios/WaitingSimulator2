//Model Loaders
let modelLoaderWalls;
let modelFloor;


//Other
let xRotText;
let fontNormal;

//Model Move Variables
let scaleSlider;
let xRotSlider;
let XPos;
let YPos;
let ZPos;
let RotX;
let scaleS;

//Models
let Floor;
let wallbake;
//Textures
let FloorTex;
let wallbakeTex;



//let UI;

function preload(){
  //soundFormats('mp3', 'ogg');
  //Load Wall Assets
  wallbakeTex = loadImage('WallBake.png');
  wallbake = loadModel('Walls.obj', true);

  //Load Floor Assets
  FloorTex = loadImage('FloorBake.png');
  Floor = loadModel('Floor.obj', true);



  
  fontNormal = loadFont('Inconsolata.otf');
}

function setup(){
  createCanvas(window.innerWidth,window.innerHeight,WEBGL);
 // UI = createGraphics(window.innerWidth,window.innerHeight, P2D, HTMLCanvasElement);
  //fullscreen();
  userStartAudio();
  cam = createCamera();

  




  push();
    xRotSlider = createSlider(0, 360, 90);
    xRotSlider.position(10, 10);
    xRotSlider.style('width', '80px');

    scaleSlider = createSlider(0, 255, 100);
    scaleSlider.position(10, 30);
    scaleSlider.style('width', '80px');

    XPosSlider = createSlider(0, 100, 100);
    XPosSlider.position(10, 50);
    xRotSlider.style('width', '80px');

    YPosSlider = createSlider(0, 100, 100);
    YPosSlider.position(10, 70);
    YPosSlider.style('width', '80px');

    ZPosSlider = createSlider(0, 100, 100);
    ZPosSlider.position(10, 90);
    ZPosSlider.style('width', '80px');
  pop();

  //modelLoaderWalls.ModelloadDraw();


}
function draw() {
  frameRate(60);
  background(255);
  debugMode();
  orbitControl();
  smooth();
  //Sliders
  let RotX = xRotSlider.value();
  let scaleS = scaleSlider.value();

  let XPos = XPosSlider.value();
  let YPos = YPosSlider.value();
  let ZPos = ZPosSlider.value();

  print(ZPos);

  

  // Set
  modelLoaderWalls = new modelLoader(wallbake, wallbakeTex, 1, 12, 12, 10, 90);

  modelFloor = new modelLoader(Floor, FloorTex, XPos, YPos,ZPos, 10, RotX);



  push();
   modelLoaderWalls.ModelloadDraw();
  pop();

  push();
  modelFloor.ModelloadDraw();
  pop();




 // noStroke();
  //directionalLight(250, 250, 250, 0, 5, 10);
 // pointLight(255, 131, 15, 0, 0, 0);
  //let RotXStr = str(RotX);


}


      