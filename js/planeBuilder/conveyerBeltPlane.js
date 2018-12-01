function ConveyerBelt(sketch, inPosX)
{

  this.posX = inPosX;
  this.posY = sketch.height/2;

  this.shrinkFactor = 2;

  this.conveyer1 = sketch.loadImage("images/game/conveyerImgs/conveyer1.png");
  this.conveyer2 = sketch.loadImage("images/game/conveyerImgs/conveyer2.png");
  this.conveyer3 = sketch.loadImage("images/game/conveyerImgs/conveyer3.png");

  this.converyerList = [];
  this.converyerList.push(this.conveyer1);
  this.converyerList.push(this.conveyer2);
  this.converyerList.push(this.conveyer3);

  this.ctr = 0;

  this.update = function()
  {
    if(sketch.frameCount % 10 == 0)
    {
      this.ctr++;
      if(this.ctr > 2)
      {
        this.ctr = 0;
      }
    }

    if(typeof this.converyerList != 'undefined')
    {
      if(this.ctr == 0)
        sketch.image(this.conveyer3, this.posX, this.posY, this.conveyer1.width/this.shrinkFactor, this.conveyer1.height/this.shrinkFactor);
      if(this.ctr == 1)
        sketch.image(this.conveyer2, this.posX, this.posY, this.conveyer2.width/this.shrinkFactor, this.conveyer2.height/this.shrinkFactor);
      if(this.ctr == 2)
        sketch.image(this.conveyer1, this.posX, this.posY, this.conveyer3.width/this.shrinkFactor, this.conveyer3.height/this.shrinkFactor);
    }

  }

}
