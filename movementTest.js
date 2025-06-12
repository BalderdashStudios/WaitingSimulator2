let DEBUG = false;
let gameManagerMain;

let ending;
let doorClose = 20;
let elevatorTranslate = 0;

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

var aud0Narrator, aud1Unfinished, aud2BGMusic, tempVL, aud1, aud3Doors, leftHallwayVL, aud4MeetingRoom; // Audio object for background sound

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
let yellowDivider;
let section2;
//Boss Office Models
let bossWall;
//
let s2Floor;
let s2Walls;
let s2Trim;
let s2Roof;

let meetingRoomFloor;

var
meetingRoomWalls,
meetingRoomTrim,
meetingRoomTrim2,
section2Padding,
chairs,
section1Padding,
computers1,
deskCabinents;

//Colliders
var collider1, collider2, elevatorDoor;

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
var floorTexture, wallTexture, roofTex, deskTex, cabTex, reflection1, debug, wall2Tex, cubicleTex, yellowDividerTex,
s2FloorTex, s2WallsTex, s2TrimTex, s2RoofTex, chairSwivel, cubicleDrawers, computers1Tex,
//Boss Office
bossWallTex;
;

//LightMapBlending

let baseTex, lightMap1, combinedLM;

var mx = 0, my = 0; // Mouse movement deltas
// Listen for mouse movement to update mx and my (mouse deltas)


// Preload function: Loads all assets before setup()
function preload() {
  gameManagerMain = new gameManager;
  // Load sound files (mp3, ogg)
  soundFormats('mp3', 'ogg');
  aud0Narrator = loadSound('Audio/WaitingSimAudio.mp3');
  aud1Unfinished = loadSound('Audio/AudUnfinished.mp3');
  aud2BGMusic = loadSound('Audio/ExploringStanley.mp3');
  aud3Doors = loadSound('Audio/Aud3OpenDoors.mp3');
  tempVL = loadSound('Audio/TempVL.mp3');
  aud1 = loadSound('Audio/Aud1.mp3');
  leftHallwayVL = tempVL;
  aud4MeetingRoom = loadSound('Audio/MeetingRoomVO.mp3');

  // Load image textures for 3D models
  floorTexture = loadImage('Textures/New/FloorBake.png');
  wallTexture = loadImage('Textures/New/WallBake2.png');
  roofTex = loadImage('Textures/New/CeilingBake.png');
  deskTex = loadImage('Textures/New/office_desk_1980.png');
  cabTex = loadImage('Textures/New/filecabinet_lobby.png');
  //HDRI
  reflection1 = loadImage('Textures/Reflections/HDRI2.png');
  debugTex = loadImage('Textures/Wall.png');
  trimTex = loadImage('Textures/New/TrimBake.png');
  wall2Tex = loadImage('Textures/New/Wall2Bake.png');
  cubicleTex = loadImage('Textures/New/CubicleBake.png');
  yellowDividerTex = loadImage('Textures/New/YellowDividerBake.png');
  bossWallTex = loadImage('Textures/New/BossWall.png');
  s2FloorTex = loadImage('Textures/New/FloorBake2.png');
  s2WallsTex = loadImage('Textures/New/S2WallBake.png');
  s2TrimTex = loadImage('Textures/New/TrimBake.png');
  s2RoofTex = loadImage('Textures/New/CeilingBake.png');
  chairSwivel = loadImage('Textures/New/chair_swivel.png');
  cubicleDrawers = loadImage('Textures/New/cubicle_desk_drawers.png');
  computers1Tex = loadImage('Textures/New/computer_monitor01.png');
  phonesTex = loadImage('Textures/New/keyboard_and_phone.png');
  plasticWallTex = loadImage('Textures/New/plasticwall001b.png');
  meetingRoomFloorTex = loadImage('Textures/New/MeetingRoomFloorBake.png');
  meetingRoomWallTex = loadImage('Textures/New/MeetingRoomWallBake.png');

  bossFloorTex = loadImage('Textures/New/BossFloor.png');
  bossRoofTex = loadImage('Textures/New/BossRoof.png');
  vertigoDrywallTex = loadImage('Textures/New/VertigoDryWall.png');

   concreateFloorTex = loadImage('Textures/New/ConcreateFloorTex.png');
  stairWellWallsTex = loadImage('Textures/New/StairWellWalls.png');

  //Light Map Blend (For props)
  baseTex = debugTex;
  lightMap1 = loadImage('Textures/New/Test/png3.png');
  //Load Reflection 360s

  // Load 3D models (.obj files)
  walls = loadModel('Models/New/Wall1.obj');
  trim = loadModel('Models/New/Trim.obj')
  floor = loadModel('Models/New/Floor.obj');
  roof = loadModel('Models/New/Ceiling.obj');
  desks = loadModel('Models/New/Desks.obj');
  cabnets = loadModel('Models/New/Cabinents.obj');
  doors = loadModel('Models/Doors.obj', true);
  wall2 = loadModel('Models/New/Wall2.obj');
  cubicle = loadModel('Models/New/Cubicle.obj');
  yellowDivider = loadModel('Models/New/YellowTrim.obj');
  section2 = loadModel('Models/New/Section2.obj');
  bossWall = loadModel('Models/New/BossOffice/BossOfficeWallPaper.obj');
  bossFloor = loadModel('Models/New/BossOfficeFloor.obj');
  bossRoof = loadModel('Models/New/BossOfficeRoof.obj')
  bossTempWalls = loadModel('Models/New/BossOfficeTempWalls.obj');
  vertigoDrywall = loadModel('Models/New/VertigoDryWall.obj');

  stairWellWalls = loadModel('Models/New/StairWellWalls.obj');

  concreateFloor = loadModel('Models/New/ConcreateFloor.obj');

  s2Floor = loadModel('Models/New/Section2Floor.obj');
  s2Walls = loadModel('Models/New/Section2Walls.obj');
  s2Trim = loadModel('Models/New/Section2Trim.obj');
  s2Roof = loadModel('Models/New/Section2Roof.obj');

  meetingRoomFloor = loadModel('Models/New/meetingRoomFloor.obj');
  meetingRoomWalls = loadModel('Models/New/MeetingRoomWall.obj');
  meetingRoomTrim = loadModel('Models/New/MeetingRoomTrim.obj');
  meetingRoomTrim2 = loadModel('Models/New/MeetingRoomTrim2.obj');
  section2Padding = loadModel('Models/New/Section2Padding.obj');
  cubicleTrim = loadModel('Models/New/CubicleTrim.obj');


  chairs = loadModel('Models/New/Chairs.obj');
  section1Padding = loadModel('Models/New/Section1Padding.obj');
  deskCabinents = loadModel('Models/New/DeskCabinents.obj');
  computers1 = loadModel('Models/New/Computers1.obj');
  phones = loadModel('Models/New/Phones.obj');


  // Load font for text rendering
  fontNormal = loadFont('Fonts/JMH Typewriter-Bold.ttf');
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
  
  userStartAudio();

    combinedLM = createGraphics(128, 128);
    combinedLM.image(baseTex, 0,0, 128, 128);
    combinedLM.image(lightMap1, 0 ,0, 128,128);

elevatorDoor = new collider(241, 0, -125, 'green', 1, 20, 30, false, false, false);//elevator

colliders = [

  //LENGTH HEIGHT WIDTH
  new collider(50, 0, 200, 'blue', 10, 20, 10, false, true, true, aud1),
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
new collider(73, 0, 186, 'green', 8, 20, 1, false, false, false),//dividers
new collider(58, 0, 166, 'green', 11, 20, 7, false, false, false),
new collider(100, 0, 180, 'green', 11, 20, 7, false, false, false),
new collider(83, 0, 158, 'green', 7, 20, 13, false, false, false),//dividers
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
new collider(226, 0, 328, 'green', 1, 20, 36, false, false, false),

// new collider(107, 0, 200, 'blue', 10, 20, 10, false, true, false, tempVL),
// new collider(138, 0, 228, 'blue', 10, 20, 10, false, true, false, tempVL),
// new collider(187, 0, 283, 'blue', 10, 20, 10, false, true, false, tempVL),
// new collider(126, 0, 267, 'blue', 10, 20, 10, false, true, false, tempVL),
// new collider(105, 0, 267, 'blue', 10, 20, 10, false, true, false, tempVL),
// new collider(137, 0, 308, 'blue', 10, 20, 10, false, true, false, tempVL),
// new collider(127, 0, 358, 'blue', 10, 20, 10, false, true, false, tempVL),
new collider(224, 0, 359, 'blue', 10, 20, 10, false, true, true, aud3Doors),
new collider(-7, 5, 204, 'orange', 2, 10, 23, false, false, false),
new collider(8, 5, 215, 'orange', 3, 10, 5, false, false, false),
new collider(50, 0, 220, 'green', 1, 20, 20, false, false, false),
new collider(11, 0, 220, 'green', 1, 20, 20, false, false, false),
new collider(29, 0, 230, 'green', 41, 20, 1, false, false, false),


new collider(16, 5, 220, 'orange', 3, 10, 17, false, false, false),
new collider(21, 5, 228, 'orange', 8, 10, 3, false, false, false),
new collider(77, 5, 154, 'orange', 6, 10, 3, false, false, false),
new collider(89, 5, 154, 'orange', 6, 10, 3, false, false, false),
new collider(105, 5, 174, 'orange', 3, 10, 6, false, false, false),
new collider(105, 5, 186, 'orange', 3, 10, 6, false, false, false),
new collider(52, 5, 172, 'orange', 3, 10, 6, false, false, false),
new collider(52, 5, 159, 'orange', 3, 10, 6, false, false, false),
new collider(116, 5, 297, 'orange', 19, 10, 3, false, false, false),
new collider(124, 5, 290, 'orange', 3, 10, 10, false, false, false),
new collider(19, 5, 214, 'orange', 11, 10, 3, false, false, false),
new collider(153, 5, 266, 'orange', 13, 10, 7, false, false, false),
new collider(158, 5, 266, 'orange', 3, 10, 20, false, false, false),
new collider(153, 5, 301, 'orange', 7, 10, 13, false, false, false),
new collider(153, 5, 306, 'orange', 20, 10, 3, false, false, false),
new collider(-2, 5, 214, 'orange', 10, 10, 3, false, false, false),
new collider(-2, 5, 194, 'orange', 10, 10, 3, false, false, false),
new collider(85, 5, 206, 'orange', 11, 10, 3, false, false, false),
new collider(33, 5, 227, 'orange', 12, 10, 3, false, false, false),
//Section2
new collider(235, 0, 382, 'green', 1, 20, 34, false, false, false),
new collider(235, 0, 336, 'green', 1, 20, 35, false, false, false),
new collider(265, 0, 398, 'green', 60, 20, 1, false, false, false),
new collider(265, 0, 320, 'green', 60, 20, 1, false, false, false),
new collider(293, 0, 389, 'green', 1, 20, 19, false, false, false),
new collider(293, 0, 359, 'green', 1, 20, 17, false, false, false),
new collider(293, 0, 329, 'green', 1, 20, 19, false, false, false),
new collider(313, 0, 335, 'green', 35, 20, 1, false, false, false),
new collider(332, 0, 312, 'green', 1, 20, 45, false, false, false),
new collider(323, 0, 354, 'green', 55, 20, 1, false, false, false),
new collider(352, 0, 332, 'green', 1, 20, 42, false, false, false),
new collider(362, 0, 291, 'green', 57, 20, 1, false, false, false),
new collider(391, 0, 262, 'green', 1, 20, 57, false, false, false),
new collider(381, 0, 311, 'green', 58, 20, 1, false, false, false),
new collider(410, 0, 271, 'green', 1, 20, 78, false, false, false),
new collider(413, 0, 232, 'green', 15, 20, 1, false, false, false),
new collider(420, 0, 203, 'green', 1, 20, 60, false, false, false),
new collider(380, 0, 172, 'green', 84, 20, 1, false, false, false),
new collider(359, 0, 232, 'green', 72, 20, 1, false, false, false),
new collider(323, 0, 193, 'green', 1, 20, 80, false, false, false),
new collider(324, 0, 172, 'green', 6, 20, 1, false, false, false),
new collider(325, 0, 364, 'green', 58, 20, 1, false, false, false),
new collider(313, 0, 384, 'green', 38, 20, 1, false, false, false),
new collider(332, 0, 399, 'green', 1, 20, 30, false, false, false),
new collider(352, 0, 389, 'green', 1, 20, 48, false, false, false),
new collider(342, 0, 412, 'green', 20, 20, 1, false, false, false),
new collider(337, 0, 152, 'green', 30, 20, 1, false, false, false),
new collider(371, 0, 152, 'green', 18, 20, 1, false, false, false),
new collider(401, 0, 142, 'green', 1, 20, 60, false, false, false),
new collider(398, 0, 112, 'green', 4, 20, 1, false, false, false),
new collider(384, 0, 112, 'green', 4, 20, 1, false, false, false),
new collider(405, 0, 83, 'green', 1, 20, 60, false, false, false),
new collider(390, 0, 56, 'green', 28, 20, 1, false, false, false),
new collider(376, 0, 49, 'green', 1, 20, 22, false, false, false),
new collider(376, 0, 92, 'green', 1, 20, 47, false, false, false),
new collider(385, 0, 22, 'green', 1, 20, 23, false, false, false),
new collider(406, 0, 22, 'green', 37, 20, 1, false, false, false),
new collider(425, 0, 28, 'green', 1, 20, 10, false, false, false),
new collider(439, 0, 32, 'green', 40, 20, 1, false, false, false),
new collider(455, 0, 5, 'green', 1, 20, 60, false, false, false),
new collider(451, 0, -27, 'green', 10, 20, 1, false, false, false),
new collider(450, 0, -39, 'green', 1, 20, 20, false, false, false),
new collider(440, 0, -49, 'green', 20, 20, 1, false, false, false),
new collider(431, 0, -39, 'green', 1, 20, 20, false, false, false),
new collider(428, 0, -27, 'green', 10, 20, 1, false, false, false),
new collider(424, 0, -22, 'green', 1, 20, 10, false, false, false),
new collider(405, 0, -16, 'green', 40, 20, 1, false, false, false),
new collider(385, 0, -16, 'green', 1, 20, 21, false, false, false),
new collider(342, 0, -27, 'green', 90, 20, 1, false, false, false),
new collider(336, 0, -16, 'green', 1, 20, 21, false, false, false),
new collider(336, 0, 24, 'green', 1, 20, 25, false, false, false),
new collider(346, 0, 38, 'green', 20, 20, 1, false, false, false),
new collider(356, 0, 53, 'green', 1, 20, 27, false, false, false),
new collider(348, 0, 67, 'green', 15, 20, 1, false, false, false),
new collider(345, 0, 77, 'green', 1, 20, 20, false, false, false),
new collider(348, 0, 87, 'green', 15, 20, 1, false, false, false),
new collider(246, 0, -27, 'green', 60, 20, 1, false, false, false),
new collider(274, 0, 31, 'green', 120, 20, 1, false, false, false),
new collider(215, 0, -1, 'green', 1, 20, 62, false, false, false),
new collider(316, 0, -48, 'green', 1, 20, 40, false, false, false),
new collider(307, 0, -69, 'green', 20, 20, 1, false, false, false),
new collider(257, 0, -60, 'green', 1, 20, 57, false, false, false),
new collider(260, 0, -98, 'green', 3, 20, 18, false, false, false),
new collider(292, 0, -98, 'green', 3, 20, 19, false, false, false),
new collider(296, 0, -79, 'green', 1, 20, 18, false, false, false),
new collider(311, 0, -108, 'green', 40, 20, 1, false, false, false),
new collider(240, 0, -108, 'green', 40, 20, 1, false, false, false),
new collider(331, 0, -133, 'green', 1, 20, 50, false, false, false),
new collider(315, 0, -153, 'green', 40, 20, 1, false, false, false),
new collider(296, 0, -146, 'green', 1, 20, 15, false, false, false),
new collider(253, 0, -139, 'green', 85, 20, 1, false, false, false),
new collider(217, 0, -126, 'green', 1, 20, 35, false, false, false),
new collider(356, 0, 101, 'green', 1, 20, 28, false, false, false),
new collider(240, 0, -136, 'green', 1, 20, 4, false, false, false),
new collider(240, 0, -109, 'green', 1, 20, 4, false, false, false),
new collider(366, 0, 116, 'green', 18, 20, 1, false, false, false),

new collider(383, 0, 40, 'purple', 8, 20, 8, false, false, false),

elevatorDoor,

// new collider(294, 0, 345, 'blue', 10, 20, 10, false, true, true, leftHallwayVL),//left hallway
new collider(294, 0, 374, 'blue', 10, 20, 10, false, true, true, tempVL),//right hallway
new collider(400, 0, 234, 'blue', 10, 20, 10, false, true, true, aud4MeetingRoom),//meeting room
// new collider(358, 0, 146, 'blue', 10, 20, 10, false, true, true, tempVL),//closet
// new collider(390, 0, 112, 'blue', 10, 20, 10, false, true, true, tempVL),//boss' room
// new collider(335, 0, 3, 'blue', 8, 20, 15, false, true, true, tempVL),//meeting room
// new collider(286, 0, -27, 'blue', 17, 20, 8, false, true, true, tempVL),//secret room

endingVL = new collider(221, 0, -123, 'blue', 25, 20, 30, false, true, true, aud1Unfinished)//ending

    ];


  //audioUnfinishedTrig = new collider(140, 0, 230, 'blue', 20, 20, 10, false, true, true, aud1Unfinished);

  //200, 100,19
    //bounds1 = new collider(100, 0, 300, 'red', 300, 100, 300, false);
  bounds1 = new collider(100, 0, 300, 'red', 3000, 200, 3000, false);
  bounds = [bounds1];

  ending = [aud1, aud3Doors, aud4MeetingRoom, aud1Unfinished];

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
  aud2BGMusic.loop();
  aud2BGMusic.setVolume(0.1);
}

// Draw function: Main animation loop, runs every frame
function draw() {
  frameBuffer.begin();

  if(DEBUG == true) 
    {
        print("DebugTest1");
         xIntField = createInput('');
         xIntField.attribute('placeholder', playerLoc);
         xIntField.position(100, 100);
         xIntField.size(300);
    }

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
 //noStroke(); 
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
    playerController.handleMovement(deltaTime);
    checkCollision();
    checkBoundingCollision();
    playerLoc = playerController.printLoc();
  }
  //DEBUG COLLIDERS
  push();
  elevatorDoor.translate(241, doorClose, -125);
  pop();
  //for (let i = 0; i < colliders.length; i++) {
  //colliders[i].display();
  //}
  // Rotate the view to match 3D world orientation
    //print("Creating Level");

translate(0,elevatorTranslate,0);

    push();
     rotateX(ang(90));
    translate(30, 230, -11);
    scale(8, -8, 8)
    
    noStroke();
    texture(floorTexture);
    model(floor);

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

    texture(yellowDividerTex);
    model(yellowDivider);

    texture(bossWallTex);
    model(bossWall);

    texture(s2FloorTex);
    model(s2Floor);

    texture(s2WallsTex);
    model(s2Walls);

    texture(s2TrimTex);
    model(s2Trim);

    texture(s2RoofTex);
    model(s2Roof);

    texture(meetingRoomFloorTex);
    model(meetingRoomFloor);

    texture(meetingRoomWallTex);
    model(meetingRoomWalls);

    model(meetingRoomTrim);
    model(meetingRoomTrim2);
    model(section2Padding);
    model(section1Padding);

    texture(bossFloorTex);
    model(bossFloor);

    texture(bossRoofTex);
    model(bossRoof);

      texture(concreateFloorTex);
      model(concreateFloor);

      texture(stairWellWallsTex);
      model(stairWellWalls);

      texture(vertigoDrywallTex);
      model(vertigoDrywall);



    let c = color(100, 100, 100);
    directionalLight(c, 0, 20, 30);
    ambientLight(80);

    //texture(combinedLM);
    push();
      imageLight(reflection1);
      specularMaterial(255);
      shininess(255);
      metalness(0);
      texture(deskTex);
      model(desks); 

      shininess(60);
      metalness(0); 
      textureWrap(REPEAT);
      texture(cabTex);
      model(cabnets);

      texture(debugTex);
      model(bossTempWalls);

      texture(cubicleDrawers);
      model(deskCabinents);

      texture(chairSwivel);
      model(chairs);

      texture(computers1Tex);
      model(computers1);

      texture(phonesTex);
      model(phones);

      texture(plasticWallTex);
      model(cubicleTrim);
    pop();

    //model(section2);//commite this out later
    pop();
    push();
      //scale(1, 1, 1);
      //rotateX(ang(-90));
      noStroke();
      //let a = color(100, 100, 100);
      //directionalLight(a, 0, 20, 30);
      //imageLight(reflection1);
      //ambientLight(50);
      glassMaterial();
      translate(23,0,210);
      box(15,11,1);
    pop();

    if(gameManagerMain.checkEnding(ending)) 
      {
        elevatorTranslate -= 0.01 * deltaTime;
      }

  frameBuffer.end();
  setCamera(fbCam);
  // Reset all transformations.
  resetMatrix();
      image(frameBuffer, -width / 2, -height / 2);
      frameBuffer.pixelDensity(0.6);
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
        colliders[lastCollided].playAudio(deltaTime);
        colliders[lastCollided].setActive(false);
        print("Collided with audio trigger")

        gameManagerMain.update(colliders[lastCollided].returnAudio());
        gameManagerMain.printList();
        print(ending);
        gameManagerMain.checkEnding(ending); 

        if(gameManagerMain.checkEnding(ending)) 
        {
            doorClose = 0;
            print("Closed door");
        }
        
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

//Materials
function glassMaterial() 
{
    let d = color(100,100,110);
    d.setAlpha(20);
    imageLight(reflection1);
    specularMaterial(255);
    shininess(120);
    metalness(255);
    //imageLight(reflection1);
    fill(d);
}