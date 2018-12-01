function Cockpit(sketch, posX, posY)
{
  this.drag = false;
  this.xPos = posX;
  this.yPos = posY;
  
  this.update = function()
  {
    sketch.ellipse(this.xPos, this.yPos, 50, 50);
    sketch.text("Cockpit", this.xPos-22, this.yPos);
  }
  
  this.touchStarted = function(cockpitXpos, cockpitYpos)
  {
    if(sketch.dist(sketch.mouseX, sketch.mouseY, cockpitXpos, cockpitYpos) < 50)
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
        if(sketch.dist(sketch.mouseX, sketch.mouseY, fuselageList[i].posX, fuselageList[i].posY) < 50)
        {
          if(fuselageList[i].hasCockpit == false)
          {
            fuselageList[i].fuselageText = fuselageList[i].fuselageText + "\nCockpit";
            fuselageList[i].hasCockpit = true;
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