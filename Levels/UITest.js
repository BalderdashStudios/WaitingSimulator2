let wallbakeTex;
let wallbake;

let modelLoaderWalls;



function preload() {
  inconsolata = loadFont("Inconsolata.otf")
  wallbakeTex = loadImage('WallBake.png');
  wallbake = loadModel('Walls.obj', true);
}

function setup() {
  createCanvas(800, 500, WEBGL);
  cam = createCamera()
  textFont(inconsolata)
  textSize(26)
  textAlign(CENTER)
}

function draw() {
  background(220);
  orbitControl();
  fill(255, 0, 0);
  box(50)
  modelLoaderWalls = new modelLoader(wallbake, wallbakeTex, 1, 12, 12, 10, 90);


  let pan = atan2(cam.eyeZ - cam.centerZ, cam.eyeX - cam.centerX)
  let tilt = atan2(cam.eyeY - cam.centerY, dist(cam.centerX, cam.centerZ, cam.eyeX, cam.eyeZ))

  modelLoaderWalls.ModelloadDraw();

  translate(cam.eyeX, cam.eyeY, cam.eyeZ)
  rotateY(-pan)
  rotateZ(tilt + PI)
  translate(200, 0, 0)
  rotateY(-PI/2)
  rotateZ(PI)
  fill(0)
  push()
    translate(-125, -65, 0)
    text("HEALTH", 0, 0)
  pop()
  translate(125, -70, 0)
  text("100", 0, 0)



}