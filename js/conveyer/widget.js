function Widget(sketch)
{
  this.crate = sketch.loadImage("images/game/conveyerImgs/crate.png");
  this.jet = sketch.loadImage("images/game/conveyerImgs/plane.png")

  this.posX = 0;
  this.posY = sketch.height/2 + sketch.height/5 - 10;

  this.update = function(velocity)
  {
    if(this.posX < sketch.width)
    {
      this.posX = this.posX + velocity;

      if(this.posX < sketch.width/2)
      {
        sketch.image(this.crate, this.posX, this.posY, this.crate.width/20, this.crate.height/20);
      }
      else {
        sketch.image(this.jet, this.posX, this.posY, this.jet.width/20, this.jet.height/20  );
      }
    }
  }
}
