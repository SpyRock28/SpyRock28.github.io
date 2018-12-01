function Lane(sketch, xLoc, divider)
{
  this.xLoc = xLoc;
  this.carQueue = [];
  this.carsInLane = 0;
  this.tollBothSprite;

  this.tollBoothSprite = sketch.createSprite(this.xLoc-35, divider.yLoc);
  this.tollBoothSprite.addAnimation("open", "images/game/gate_open.png");
  this.tollBoothSprite.addAnimation("closed", "images/game/gate closed.png");
  this.tollBoothSprite.changeAnimation("closed");
  this.tollBoothSprite.scale = .18;

  this.gateAnimationCtr = 1;
  this.gateOpen = false;

  this.closeGate = function()
  {
    this.tollBoothSprite.changeAnimation("closed");
    this.gateAnimationCtr = 1;
    this.gateOpen = false;
  }

  this.openCloseGate = function()
  {
    if(this.gateAnimationCtr % 2 == 0)
    {
      this.tollBoothSprite.changeAnimation("closed");
      this.gateOpen = false;
    }
    else
    {
      this.tollBoothSprite.changeAnimation("open");
      this.gateOpen = true;
    }

    this.gateAnimationCtr++;
  }

  this.addCarToLane = function(car)
  {
    let angle;

    if(typeof car!= 'undefined')
    {
      this.carQueue.push(car);
      this.carsInLane = this.carQueue.length;
      car.carSprite.rotateToDirection = true;

      if(car.carSprite.position.x <= this.xLoc)
        angle=320;

      else
        angle=225;

      car.carSprite.setSpeed(8, angle);
    }

    return angle;
  }



  this.removeCarFromLane = function()
  {
    //this.shiftCarsUp();
    this.carsInLane = this.carQueue.length;
  }
}
