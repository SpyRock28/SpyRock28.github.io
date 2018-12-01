function Fuselage(sketch, posX)
{
  this.posX = -55;
  this.posY = sketch.height/2 + sketch.height/5 - 35;
  this.fuselageText = "Fuselage";
  
  this.hasTail = false;
  this.hasWings = false;
  this.hasCockpit = false;
  
  this.update = function(velocity)
  {
    if(this.posX < sketch.width)
    {
      this.posX = this.posX + velocity;

      sketch.rect(this.posX, this.posY - 10, 60, 55);
      sketch.text(this.fuselageText, this.posX + 5, this.posY);
      
      if(this.hasTail && this.hasWings && this.hasCockpit)
      {
        this.fuselageText = "Plane";
      }
    
    }
  }
}