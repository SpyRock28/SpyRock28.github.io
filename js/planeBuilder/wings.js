function Wings(sketch, posX, posY, wingsImg)
{
  this.drag = false;
  this.xPos = posX;
  this.yPos = posY;
  
  this.update = function()
  {
    sketch.image(wingsImg, this.xPos - 15, this.yPos - 20, 50, 50);
    sketch.text("Wings", this.xPos, this.yPos - 30);
  }
  
  this.touchStarted = function(wingXpos, wingYpos)
  {
    if(sketch.dist(sketch.mouseX, sketch.mouseY, wingXpos, wingYpos) < 50)
    {
      this.drag = true;
    }
    else {
      this.drag = false;
    }
  }
  
  this.touchEnded = function(fuselageList)
  {
    
    //I dont exactly like this but not sure atm how else to do it
    if(this.drag)
    {
      for(let i = 0; i < fuselageList.length; i++)
      {
        if(sketch.dist(sketch.mouseX, sketch.mouseY, fuselageList[i].posX + 25, fuselageList[i].posY + 25) < 100)
        {
          if(fuselageList[i].hasWings == false)
          {
            fuselageList[i].fuselageText = fuselageList[i].fuselageText + "\nWings";
            fuselageList[i].hasWings = true;
          }
        }
      }
    }
    this.drag = false;

    this.popBackToDefault();
  }
  
  this.touchMoved = function()
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