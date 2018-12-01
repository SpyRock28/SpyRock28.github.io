var convSim = function(sketch) {

  let sliderMax = 7;
  var tSlider, fSlider;
  let defaultTPTimeSec = 0.4;
  let can;
  this.widgetList = [];
  var conveyer1;
  var conveyer2;
  var conveyer3;
  var conveyer4;

  this.bgImg = sketch.loadImage("images/game/conveyerImgs/gameBackground.png");
  this.buildingBack = sketch.loadImage("images/game/conveyerImgs/hangar2.png");
  this.building = sketch.loadImage("images/game/conveyerImgs/hangar.png");
  this.touchAppImg = sketch.loadImage("images/game/conveyerImgs/touch_app.png");

  let proFontWindows = sketch.loadFont("../font/ProFontWindows.ttf");
  let crateTimeout = setTimeout(addWidget, defaultTPTimeSec * 1000);

  let sliderPosX;
  let sliderPosY;

  let sliderSize;

  let xFactor;
  let yFactor;

  let spacing;
  let textSpacing;

  let pointer;
  
  let rotateMessage = "Please Rotate Screen \nto Portrait Mode"

  let headerOffset = $("#topNav").outerHeight();

  let mouseSlower = false;//This is to prevent mouse bounces since we cant use mouse clicked
  let mouseSlowerCtr = 0;
  
  let portraitMode = true;

  sketch.setup = function() {
    sketch.frameRate(30);
    sketch.pixelDensity(1);
    can = sketch.createCanvas(400, 500);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";

    xFactor = canvasElt.clientWidth/sketch.width;
    yFactor = canvasElt.clientHeight/sketch.height;

    sliderPosX  = ((sketch.width/4) + 25) * xFactor;
    sliderPosY = (sketch.height/2) * yFactor - 25;

    sliderSize = (sketch.width/8) * xFactor * 3;
    spacing = (sketch.height/18) * yFactor;

    tSlider = sketch.createSlider(0.1, 1, defaultTPTimeSec, 0.1);
    tSlider.position(sliderPosX, sliderPosY);
    tSlider.size(sliderSize);
    tSlider.style.disabled = true;

    fSlider = sketch.createSlider(3, sliderMax, 5, 0.1);
    fSlider.position(((sketch.width/4) + 25) * xFactor, (425 * yFactor) + headerOffset);
    fSlider.size(sliderSize);

    
    let pointerList = [];
    pointerList.push({posX : 15, posY : 40, text : "        To advance tap the screen                                                                                                                                                                                                                                                                                                                                                 ", pointerPos: "left"}); //Littles Law Intro
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "Welcome to the Littles Law Simulator. This demonstration is intended to explain the basic concepts of Littles Law", pointerPos: "left"}); //Littles Law Intro
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "Little’s law is an equation showing that the average number of items in a queueing system is equal to their average throughput multiplied by the average amount of time they spend in the system", pointerPos: "left"}); //Littles Law Intro
    pointerList.push({posX : (sketch.width/12), posY : 40, text : "To begin using Littles Law lets first identify our process machine...", pointerPos: "left"}); //Littles Law Intro
    pointerList.push({posX : 40, posY : 245, text : "We can assume that our process machine is this hangar right here...", pointerPos: "center", pointerRotation:"down"}); //Littles Law Intro
    pointerList.push({posX : (sketch.width/12), posY : 290, text : "Its input is boxes of parts  ", pointerPos: "left", pointerRotation:"down", pointerXOffset: 25}); //Littles Law Intro
    pointerList.push({posX : 70, posY : 290, text : "Its output is airplanes", pointerPos: "right", pointerRotation:"down"}); //Littles Law Intro

    pointerList.push({posX : 65, posY : 350, text : "The time that it takes for our machine (hangar) to turn a box of parts into an airplane is our Flowtime", pointerPos: "center", pointerXOffset: 8,pointerYOffset: 32, pointerRotation:"left"}); //Flowtime
    pointerList.push({posX : 65, posY : 275, text : "The rate at which airplaines come out of our machine (hangar) is known as Throughput", pointerPos: "right", pointerRotation: "down"}); //Throughput
    pointerList.push({posX : 0, posY : 275, text : "The number of units being worked on (boxes being turned into airplanes) that are inside our machine (hangar) is known as our Work in Process (WIP)", pointerPos: "center", pointerXOffset: -20, pointerYOffset: 60, pointerRotation: "right"}); //WIP

    pointerList.push({posX : 50, posY : 80, text : "How do we improve the speed of our process?"}); //Speed
    pointerList.push({posX : 50, posY : 80, text : "There are two ways to do this"});
    pointerList.push({posX : 50, posY : 80, text : "One way is to reduce the WIP"});

    pointerList.push({posX : 40, posY : 395, text : "To do this we can reduce our Flowtime"});
    pointerList.push({posX : 40, posY : 395, text : "Try reducing the Flowtime to 3.4 or below", pointerXOffset: 90, pointerYOffset: -10, pointerPos: "left", pointerRotation: "down", onCheckStep: true, checkFor: "flowtime"}); //Reduce Flowtime
    //add Flowtime check
    pointerList.push({posX : 50, posY : 360, text : "Notice that the WIP is reduced", pointerRotation: "right", pointerXOffset: -65, pointerYOffset: -7, pointerPos: "center"}); //Reduce Flowtime

    pointerList.push({posX : 50, posY : 80, text : "The other way is to increase our throughput"});
    pointerList.push({posX : 30, posY : 130, text : "Try increasing the throughput to 0.7 ", onCheckStep: true, checkFor: "throughput", pointerXOffset: -40, pointerYOffset: -10, pointerPos: "right", pointerRotation: "down"});
    //add Throughput check
    pointerList.push({posX : 50, posY : 80, text : "Notice that the rate at which the machine is producing airplanes has increased"}); //Increase throughput
    pointerList.push({posX : 50, posY : 80, text : "Play with the sliders and see how changing the Throughput and Flowtime affect WIP"}); //Increase throughput
    pointerList.push({endText : true}); //Increase throughput

    
    pointer = new Pointer(sketch, pointerList, tSlider, fSlider);

    conveyer1  = new ConveyerBelt(sketch, 0);
    conveyer2  = new ConveyerBelt(sketch, (sketch.width/4) * 1);
    conveyer3  = new ConveyerBelt(sketch, (sketch.width/4) * 2);
    conveyer4  = new ConveyerBelt(sketch, (sketch.width/4) * 3);
  }

  sketch.draw = function() {
    sketch.background(this.bgImg);


    
    sketch.textFont(proFontWindows);
    sketch.textSize(12);


    sketch.text("Throughput(T): " + tSlider.value() + " per sec", sliderPosX / xFactor, (sliderPosY / yFactor) - (spacing/yFactor) - 5);

    sketch.textSize(18);

    sketch.text("Littles Law: T * F = WIP", (sketch.width/10), 100 );
    sketch.text(tSlider.value() + " * " + fSlider.value() + " = " + (tSlider.value() * fSlider.value()).toFixed(2), (sketch.width/8) + 112, 120);

    let buildingShift = this.buildingBack.width - this.buildingBack.width * (1/5 * fSlider.value())
    sketch.image(this.buildingBack, sketch.width/2 - this.buildingBack.width/2 + (buildingShift/2), sketch.height/2 + sketch.height/5 - this.building.height + 30, this.buildingBack.width * (1/5 * fSlider.value()), this.buildingBack.height);


    if(typeof this.widgetList != 'undefined' && typeof conveyer1 != 'undefined')
    {

      conveyer1.update();
      conveyer2.update();
      conveyer3.update();
      conveyer4.update();


      for(let i = 0; i < this.widgetList.length; i ++)
      {

        let velocity = 1;

        this.widgetList[i].update(velocity);
      }
      
      //remove non rendered widgets
      if(typeof this.widgetList[this.widgetList.length-1] != 'undefined' && this.widgetList[0].posX >= sketch.width)
      {
        this.widgetList.shift();
      }
      
    }

    buildingShift = this.building.width - this.building.width * (1/5 * fSlider.value())
    sketch.image(this.building, sketch.width/2 - this.building.width/2 + (buildingShift/2), sketch.height/2 + sketch.height/5 - this.building.height + 30, this.building.width * (1/5 * fSlider.value()), this.building.height);
    sketch.textSize(20);
    sketch.text("WIP: ", sketch.width/2 - 25, sketch.height/2 + sketch.height/5+10)
    sketch.text((tSlider.value() * fSlider.value()).toFixed(2), sketch.width/2 - 25, sketch.height/2 + sketch.height/5 + 28)

    sketch.textSize(12);
    sketch.text(fSlider.value() + " sec", sketch.width/2 - 20, (conveyer2.posY + 50));
    //sketch.text(tSlider.value() + " sec", sketch.width/2 - this.buildingBack.width/2 + (buildingShift/2) + this.buildingBack.width * (1/5 * fSlider.value())+15, sketch.height/2 + sketch.height/5 - this.building.height + 100);

    sketch.text("Flowtime(F)", sketch.width/2 - 35, (conveyer2.posY + 70));
    var flowLineY = sketch.height/2 + sketch.height/5 - this.building.height + 230;
    sketch.line(sketch.width/2 - this.building.width/2 + (buildingShift/2), flowLineY, sketch.width/2 - this.building.width/2 + (buildingShift/2), flowLineY-15);
    sketch.line(this.building.width + 105 * (1/5 * fSlider.value()), flowLineY, this.building.width + 105 * (1/5 * fSlider.value()), flowLineY-15);
    sketch.line(sketch.width/2 - this.building.width/2 + (buildingShift/2), flowLineY, this.building.width + 105 * (1/5 * fSlider.value()), flowLineY);

    if(typeof pointer != 'undefined')
    {
      pointer.update();

      if(pointer.ctr == 0)
      {
        sketch.image(this.touchAppImg, 155, 75, 75, 75);
      }
    }
    if(mouseSlower == true)
    {
      mouseSlowerCtr++;
      if(mouseSlowerCtr > 30)
      {
        mouseSlower = false;
        mouseSlowerCtr = 0;
      }
    }
    
    if(window.outerWidth > window.outerHeight)
    {
      portraitMode = false;
      sketch.textSize(20);
      sketch.rect(20, 20, 300, 70, 10);
      sketch.text(rotateMessage, 30, 40);
      
    }
    else {
      portraitMode = true;
    }

  }

  function addWidget()
  {
    this.widgetList.push(new Widget(sketch));

    crateTimeout = setTimeout(addWidget, 1000/tSlider.value() );
  }

  sketch.mousePressed = function()
  {
    if(mouseSlower == false && portraitMode == true)
    {
      mouseSlower = true;
      if(!pointer.onCheckStep)
        pointer.advance();
    }
  }

}
