function TextBubble(sketch)
{
  //this.textBubbleImg = sketch.loadImage("images/game/conveyerImgs/speechBalloon.png");
  let maxLengthDefault = 42;
  this.txtBubbleHeightSingleLine = 18;
  this.numLines = 1;
  var roundedCorner = 10;
  this.textAnimIndex = 0;


  this.update = function(posX, posY, text, position)
  {
    sketch.strokeWeight(1);
    sketch.stroke(0,0,0);
    posX += 40;
    posY -= 35;
    let outText = this.spaceOutText(text);
    sketch.textSize(10);

    let boxWidth = maxLengthDefault;

    if(text.length < maxLengthDefault)
      boxWidth = text.length + 5;

    sketch.fill(255);
    sketch.rect(posX, posY, boxWidth * 7, this.txtBubbleHeightSingleLine * this.numLines, roundedCorner);
//  sketch.image(this.textBubbleImg, posX+20, posY-42, maxLengthDefault * 9, this.txtBubbleHeightSingleLine * this.numLines);
    
    sketch.fill(0);
    sketch.text(outText.substring(0, this.textAnimIndex), posX + 8, posY + 15);
    this.textAnimIndex++;

  }

  this.spaceOutText = function(text)
  {
    this.numLines = 1;
    let maxLength = maxLengthDefault;
    let newStr = "";
    let index = 0;
    for(let i = 0; i < text.length; i++)
    {
      if(text.charAt(i) == " ")
      {
        if(newStr.length +  text.substring(index, i).length > maxLength)
        {
          newStr += "\n";
          this.numLines++;
          maxLength = maxLengthDefault * this.numLines;
          index ++; // To remove leading space
        }
        newStr += text.substring(index, i);

        index = i;

      }
    }

    //if(this.numLines > 1)
    //{
    //  newStr += "\n" + text.substring(index, text.length);
    //  this.numLines++;
    //}
    //  else {
        newStr += text.substring(index, text.length);

      //}

    return newStr;
  }
}
