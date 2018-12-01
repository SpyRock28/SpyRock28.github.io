function Fuselage(sketch, fuselageImg, airplaneCompImg, cockpitImg, fuselageCImg, fuselageTImg, fuselageWImg, fuselageCTImg, fuselageCWImg, fuselageWTImg, wingsImg)
{
  this.posX = -55;
  this.posY = sketch.height/2 - 35;
  
  this.hasTail = false;
  this.hasWings = false;
  this.hasCockpit = false;
  
  this.update = function(velocity)
  {
    if(this.posX < sketch.width)
    {
      //Move the fuselage forward
      this.posX = this.posX + velocity;

      //Tail Only
      if(this.hasTail && !this.hasWings && !this.hasCockpit)
      {
        sketch.image(fuselageTImg, this.posX, this.posY + 20, 100, 30);
      }
      //Wings Only
      else if(!this.hasTail && this.hasWings && !this.hasCockpit)
      {
        sketch.image(fuselageWImg, this.posX, this.posY + 15, 100, 50);
      }
      //Cockpit Only
      else if(!this.hasTail && !this.hasWings && this.hasCockpit)
      {
        sketch.image(fuselageCImg, this.posX, this.posY + 20, 100, 30);
      }
      //Tail and Wings
      else if(this.hasTail && this.hasWings && !this.hasCockpit)
      {
        sketch.image(fuselageWTImg, this.posX, this.posY + 15, 110, 50);
      }
      //Tail and Cockpit
      else if(this.hasTail && !this.hasWings && this.hasCockpit)
      {
        sketch.image(fuselageCTImg, this.posX, this.posY + 20, 110, 30);
      }
      //Wings and Cockpit
      else if(!this.hasTail && this.hasWings && this.hasCockpit)
      {
        sketch.image(fuselageCWImg, this.posX, this.posY + 15, 110, 50);
      }
      //Complete Plane
      else if(this.hasTail && this.hasWings && this.hasCockpit)
      {
        //Plane is completed
        //this.fuselageText = "Plane";
        sketch.image(airplaneCompImg, this.posX, this.posY + 15, 110, 50);
      }
      else {
        sketch.image(fuselageImg, this.posX, this.posY + 30, 90, 20);

      }
  
    }
  }
}