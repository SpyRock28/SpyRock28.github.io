function Divider(sketch)
{
  this.yLoc = sketch.height/2 - 125;
  this.dividerSprite = sketch.createSprite( sketch.width/2, this.yLoc, sketch.width, 10);
  this.dividerSprite.shapeColor = "red";

}
