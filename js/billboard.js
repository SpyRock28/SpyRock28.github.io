function Billboard(sketch, font)
{
  this.xLoc =  200;
  this.yLoc =  50;
  this.billboardSprite = sketch.createSprite(this.xLoc, this.yLoc);
  this.billboardSprite.addImage(sketch.loadImage("images/game/billboard.png"));
  this.billboardSprite.depth = 100;

  this.timer;

  this.showLittlesLaw = function(carCt, time)
  {
    sketch.textFont(font);
    sketch.textSize(10);
    sketch.fill(255, 255, 0);

    if(typeof carCt != 'undefined')
      sketch.text("Total Cars Through: " + carCt, this.xLoc/4 + 10 , this.yLoc);

    if(typeof time != 'undefined')
      sketch.text("Remaining Time: " + time, this.xLoc + 10, this.yLoc);

  }
}
