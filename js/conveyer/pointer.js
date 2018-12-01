//this file holds the logic and draws the pointer handDown
function Pointer(sketch, positionList, tSlider, fSlider)
{
  this.successCriticalPath = false;
  
  this.ctr = 0;
  this.posX = positionList[this.ctr].posX;
  this.posY = positionList[this.ctr].posY;
  this.pointerPosition = positionList[this.ctr].pointerPos;
  this.text = positionList[this.ctr].text;
  this.textVisible = positionList[this.ctr].textVisible;
  this.pointerRotation = positionList[this.ctr].pointerRotation;
  this.onCheckStep = false;

  this.handDownImg = sketch.loadImage("images/game/conveyerImgs/handDown.png");
  this.handUpImg = sketch.loadImage("images/game/conveyerImgs/handUp.png");
  this.handLeftImg = sketch.loadImage("images/game/conveyerImgs/handLeft.png");
  this.handRightImg = sketch.loadImage("images/game/conveyerImgs/handRight.png");

  this.textBubble = new TextBubble(sketch);
  this.bounceCtr = 1;
  
  this.bounceUp = true;
  this.endAnim = false;
  
  this.update = function()
  {
    if(typeof this.endAnim == "undefined")
      this.endAnim = false;
      
    if(typeof positionList != "undefined" && this.endAnim == false)
    {
      let handPosX = this.posX;
      let handPosY = this.posY;
      
      if(this.bounceCtr == 10)
        this.bounceUp = false;
      else if(this.bounceCtr == 0)
        this.bounceUp = true;
        
      if(this.bounceUp)
        this.bounceCtr++;
      else
        this.bounceCtr--;
                
      if(this.pointerPosition == "left")
      {
        handPosX = this.posX;
      }
      else if(this.pointerPosition === "center")
      {
        handPosX += 147;
      }
      else if(this.pointerPosition === "right")
      {
        handPosX += 220;
      }

      if(typeof this.pointerYOffset === "undefined")
        this.pointerYOffset = 0;
      if(typeof this.pointerXOffset === "undefined")
        this.pointerXOffset = 0;

      if(this.pointerRotation === "down")
        sketch.image(this.handDownImg, handPosX + this.pointerXOffset, this.posY + this.pointerYOffset - this.bounceCtr, 30, 37);
      else if(this.pointerRotation === "up")
        sketch.image(this.handUpImg, handPosX + this.pointerXOffset, this.posY + this.pointerYOffset + this.bounceCtr, 30, 37);
      else if(this.pointerRotation === "left")
        sketch.image(this.handLeftImg, handPosX + this.pointerXOffset + this.bounceCtr, this.posY + this.pointerYOffset, 37, 30);
      else if(this.pointerRotation === "right")
        sketch.image(this.handRightImg, handPosX + this.pointerXOffset - this.bounceCtr, this.posY + this.pointerYOffset, 37, 30);

      if(this.onCheckStep == true)
      {
        if(this.checkFor === "flowtime")
        {
          this.isFlowBelow();
        }
        if(this.checkFor === "throughput")
        {
          this.isThroughputAbove();
        }
        if(this.checkFor === "correctCriticalPath")
        {
          this.checkCriticalPath();
        }
      }

      if(typeof this.text != 'undefined')
      {
        this.textBubble.update(this.posX, this.posY, this.text, this.pointerPosition);
      }
    }
  }

  this.isFlowBelow = function()
  {
    if(fSlider.value() <= 3.4)
    {
      this.onCheckStep = false;
      this.advance();
    }
  }

  this.isThroughputAbove = function()
  {
    if(tSlider.value() >= 0.7)
    {
      this.onCheckStep = false;
      this.advance();
    }
  }
  
  this.checkCriticalPath = function()
  {
    if(this.successCriticalPath)
    {
      this.ctr++;
      this.advance();
    }
  }

  this.advance = function()
  {
    this.ctr++;
    this.textBubble.textAnimIndex = 0;
    if(this.ctr < positionList.length)
    {
      this.endAnim = positionList[this.ctr].endAnim;
      this.posX = positionList[this.ctr].posX;
      this.posY = positionList[this.ctr].posY;
      this.pointerPosition = positionList[this.ctr].pointerPos;
      this.text = positionList[this.ctr].text;
      this.pointerRotation = positionList[this.ctr].pointerRotation;
      this.pointerYOffset = positionList[this.ctr].pointerYOffset;
      this.pointerXOffset = positionList[this.ctr].pointerXOffset;
      this.onCheckStep = positionList[this.ctr].onCheckStep;
      this.checkFor = positionList[this.ctr].checkFor;
    }
  }
  
  this.backup = function()
  {
    this.ctr--;
    this.textBubble.textAnimIndex = 0;
    if(this.ctr < positionList.length)
    {
      this.endAnim = positionList[this.ctr].endAnim;
      this.posX = positionList[this.ctr].posX;
      this.posY = positionList[this.ctr].posY;
      this.pointerPosition = positionList[this.ctr].pointerPos;
      this.text = positionList[this.ctr].text;
      this.pointerRotation = positionList[this.ctr].pointerRotation;
      this.pointerYOffset = positionList[this.ctr].pointerYOffset;
      this.pointerXOffset = positionList[this.ctr].pointerXOffset;
      this.onCheckStep = positionList[this.ctr].onCheckStep;
      this.checkFor = positionList[this.ctr].checkFor;
    }
  }


}
