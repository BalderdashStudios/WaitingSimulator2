
class modelLoader {
  constructor(loadmodel, loadtexture, MX, MY, MZ, MS, MRX, MRY, MRZ) {
    this.model = loadmodel; //Model To Load
    this.texture = loadtexture;//Texture To Load & Assign
    //Model Position
    this.MX = MX;
    this.MY = MY;
    this.MZ = MZ;
    //Model Scale
    this.MS = MS;
    //Model Rotation
    this.MRX = MRX;
    this.MRY = MRY;
    this.MRZ = MRZ;
    
  }
  
  ModelloadDraw() {

    //push();
   // for(let i=0; i< this.model.uvs.length; i++) {
    //  this.model.uvs[i][1] = 1.-this.model.uvs[i][1];
   // }
    //rotateX(ang(90));
    angleMode(DEGREES);
    rotateX(this.MRX);
    scale(this.MS);
    translate(this.MX, this.MY, this.MZ);
    texture(this.texture);
    model(this.model);
    //pop();
    
  }
}