class item 
{
  constructor(x, y, z, clr, sizeX, sizeY, sizeZ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.clr = clr;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.sizeZ = sizeZ;
  }

  display() {
    push();
    fill(this.clr);
    translate(this.x, this.y, this.z);
    box(this.sizeX, this.sizeY, this.sizeZ);
    pop();
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
}