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

  getActive() 
  {
    return this.active;
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

  audioOnEnded(deltaT) 
  {
    //let totalTime = this.audio.duration();
    //let startTime = (new Date()).valueOf();
    //let currentTime = startTime();
    print(deltaT);
    let i = this.audio.duration() * 60;
    print(i);
    for(i; i < 0; i - deltaT) 
      {
        print(i);
      }
    
  }

//   getHMS(m /* milliseconds */) {
//   return [1000, 1000 * 60, 1000 * 60 * 60]
//   	.reduce((hms, scl) => {
//       let gimmeTime = Math.floor((m / scl) % 60);
//       hms.push(gimmeTime);
//       return hms;
//     }, []);
// }

  // timer(deltaTime)
  // {

  // }

  returnAudio() 
  {
    return this.audio;
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