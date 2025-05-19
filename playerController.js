class PlayerController {
  constructor(XPos, YPos, ZPos) {
    
    // Player movement and camera control variables
    this.x = XPos;
    this.y = YPos;
    this.z = ZPos; //SET TO 200
    this.size = 10;

    this.lastx = XPos;
    this.lasty = YPos;
    this.lastz = ZPos;
    
    this.r = 0; // Horizontal rotation (yaw)
    this.yAng = 0; // Vertical angle (pitch)
    this.playerSpeed = 0.03;
    this.sensitivityX = 0.15;
    this.sensitivityY = 0.15;
    this.mx = 0;
    this.my = 0;
    this.keys = [];
    this.cam = null;
    this.cx = 0; // Camera pan (not standard)
    this.cy = 0; // Camera tilt (not standard)
    this.deltaSpeed = 0;
  }

  // Update camera with player position and rotation
  updateCamera() {
    this.cam.pan(ang(-this.cx));
    this.cam.tilt(ang(this.cy));
    this.cam.setPosition(this.x, -this.y, this.z);
  }

  // Handle mouse movement to update rotation
  handleMouseMovement(mx, my) {
    this.r -= (mx * this.sensitivityX);
    this.yAng -= (my * this.sensitivityY);

    // Dampen mouse movement
    if (mx > 0) { this.mx--; }
    if (mx < 0) { this.mx++; }
    if (my > 0) { this.my--; }
    if (my < 0) { this.my++; }

    // Limit vertical camera angle and adjust sensitivity
    if (this.yAng < -30) {
      if (my > 0) { this.sensitivityY = 0; }
      if (my < 0) { this.sensitivityY = 0.15; }
    }
    if (this.yAng > 30) {
      if (my < 0) { this.sensitivityY = 0; }
      if (my > 0) { this.sensitivityY = 0.15; }
    }

    this.cx = mx * this.sensitivityX;
    this.cy = my * this.sensitivityY;
  }

  // Handle keyboard input for movement
  handleMovement(deltaFTime) {
    this.deltaSpeed = this.playerSpeed * deltaFTime;
    this.lastx = this.x;
    this.lasty = this.y;
    this.lastz = this.z;
    if (this.keys[87]) { // W (forward)
      this.z -= cos(ang(this.r)) * this.deltaSpeed;
      this.x -= sin(ang(this.r)) * this.deltaSpeed;
    }
    if (this.keys[83]) { // S (backward)
      this.z += cos(ang(this.r)) * this.deltaSpeed;
      this.x += sin(ang(this.r)) * this.deltaSpeed;
    }
    if (this.keys[65]) { // A (left)
      this.z -= cos(ang(this.r + 90)) * this.deltaSpeed;
      this.x -= sin(ang(this.r + 90)) * this.deltaSpeed;
    }
    if (this.keys[68]) { // D (right)
      this.z += cos(ang(this.r + 90)) * this.deltaSpeed;
      this.x += sin(ang(this.r + 90)) * this.deltaSpeed;
    }
    if (this.keys[16]) { // Shift (crouch/sprint)
      this.y = -10;
      this.deltaSpeed = 0.3;
    } else {
      this.y = 0;
      this.deltaSpeed = 0.5;
    }
    print(deltaFTime);

  }

  resetLocation() {
    this.x = this.lastx;
    this.y = this.lasty;
    this.z = this.lastz;
  }

  // move(dx, dy, dz) {

  //   this.lastx = this.x;
  //   this.lasty = this.y;
  //   this.lastz = this.z;
    
  //   this.x += dx;
  //   this.y += dy;
  //   this.z += dz;
  // }

  isColliding(collider) {
    let obX = collider.getX();
    let obY = collider.getY();
    let obZ = collider.getZ();

    let obSizeX = collider.getSizeX();
    let obSizeY = collider.getSizeY();
    let obSizeZ = collider.getSizeZ();

    let colX = (
      this.x + this.size / 2 < obX - obSizeX / 2 
      || this.x - this.size / 2 > obX + obSizeX / 2 
      
      || this.y + this.size / 2 < obY - obSizeY / 2 
      || this.y - this.size / 2 > obY + obSizeY / 2 
      
      || this.z - this.size / 2 > obZ + obSizeZ / 2 
      || this.z + this.size / 2 < obZ - obSizeZ / 2);
    
      return !(colX);
  }
}