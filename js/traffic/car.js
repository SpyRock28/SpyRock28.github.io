function Car(sketch, carImg, startX, startY, carWidth, carHeight)
{
  this.carImg = carImg;
  this.posX = startX;
  this.posY = startY;
  this.carWidth = carWidth;
  this.carHeight = carHeight;


  this.update = function(velocity)
  {
    if(this.posY <= (-1*this.carHeight))
    {
      return false;
    }
    else
    {
      this.posY = this.posY - velocity;
      sketch.image(this.carImg, this.posX, this.posY, this.carWidth, this.carHeight);
      return true;
    }
  }
}
