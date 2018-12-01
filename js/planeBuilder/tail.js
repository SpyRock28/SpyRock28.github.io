function Tail(sketch, posX, posY, tailImg)
{
  this.drag = false;
  this.xPos = posX;
  this.yPos = posY;
  
  this.update = function()
  {
    sketch.image(tailImg, this.xPos - 25, this.yPos - 20, 50, 50);
    sketch.text("Tail", this.xPos, this.yPos - 30);
  }
  
  this.touchStarted = function(tailXpos, tailYpos)
  {
    if(sketch.dist(sketch.mouseX, sketch.mouseY, tailXpos, tailYpos) < 50)
    {
      this.drag = true;
    }
    else {
      this.drag = false;
    }
  }
  
  this.touchEnded = function()
  {
    
    //I dont exactly like this but not sure atm how else to do it
    if(this.drag)
    {
      for(let i = 0; i < fuselageList.length; i++)
      {
        if(sketch.dist(sketch.mouseX, sketch.mouseY, fuselageList[i].posX + 25, fuselageList[i].posY + 25) < 50)
        {
          if(fuselageList[i].hasTail == false)
          {
            fuselageList[i].hasTail = true;
          }
        }
      }
    }
    
    this.drag = false;

    this.popBackToDefault();

  }
  
  this.touchMoved = function(fuselageList)
  {
    if(this.drag)
    {
      this.xPos = sketch.mouseX;
      this.yPos = sketch.mouseY;
    }
  }
  
  this.popBackToDefault = function()
  {
    this.xPos = posX;
    this.yPos = posY;
  }
}