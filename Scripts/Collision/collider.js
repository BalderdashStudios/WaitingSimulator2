class collider 
{
  constructor(x, y, z, clr, sizeX, sizeY, sizeZ, isItem, isAudioTrigger, isActive, audio) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.clr = clr;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.sizeZ = sizeZ;
    this.item = isItem;
    this.active = isActive;
    this.isAudioTrigger = isAudioTrigger;
    this.audio = audio;
  }

  //Audio System

  setActive(isActive) 
  {
    this.active = isActive;
  }

  //Checks if it should play audio
  getAudioTrigger() 
  {
    return this.isAudioTrigger;
  }

  //Requires sound for param
  playAudio() 
  {
    if (this.active) 
      {
        this.audio.play();
      }
  }




  display() {
    push();
    fill(this.clr);
    translate(this.x, this.y, this.z);
    box(this.sizeX, this.sizeY, this.sizeZ);
    pop();
  }

  setZ() {
    this.z = -100;
  }

  getItem() {
    return this.item;
  }

  getX()
  {
    return this.x;
  }

  getY()
  {
    return this.y;
  }

  getZ()
  {
    return this.z;
  }

  getSizeX()
  {
    return this.sizeX;
  }

  getSizeY()
  {
    return this.sizeY;
  }

  getSizeZ()
  {
    return this.sizeZ;
  }

  translate(x, y, z) 
  {
    this.x = x;
    this.y = y;
    this.z = z;
    translate(this.x, this.y, this.z);
  }
}