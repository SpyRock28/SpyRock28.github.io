var planeBuilderSim = function(sketch) {
  
  /*document.ontouchmove = function(event)
  {
    event.preventDefault();
  }*/
  var fuselageImg;
  var tailImg;
  var wingsImg;
  var cockpitImg;
  var fuselageCImg;
  var fuselageTImg;
  var fuselageWImg;
  var fuselageCTImg;
  var fuselageCWImg;
  var fuselageWTImg;
  var airplaneCompImg;
  
  var wings;
  var tail;
  var cockpit;
  var converyerBelt;
  var fuselage;
  var velocity = 2;
  this.fuselageList = [];
  
  this.bgImg = sketch.loadImage("images/game/conveyerImgs/gameBackground.png");

  
  let fuselageTimeout = setTimeout(addFuselage, 1000);

  
  sketch.setup = function() {
    
    loadImages();

    
    sketch.frameRate(30);
    can = sketch.createCanvas(700, 350);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";
    
    
    let defaultToolsLocationX = sketch.width/2;
    let defaultToolsLocationY = sketch.height - sketch.height/4;
    
    wings = new Wings(sketch, defaultToolsLocationX, defaultToolsLocationY, wingsImg);
    tail = new Tail(sketch, defaultToolsLocationX - 100, defaultToolsLocationY, tailImg);
    cockpit = new Cockpit(sketch, defaultToolsLocationX + 100, defaultToolsLocationY, cockpitImg );
    conveyerBelt = new ConveyerBelt(sketch, 50);
    
    
  }

  sketch.draw = function() {
    
    sketch.background(this.bgImg);
    
    conveyerBelt.update();

    for(let i = 0; i < fuselageList.length; i++)
    {
      this.fuselageList[i].update(velocity);
    }
    
    wings.update();
    tail.update();
    cockpit.update();
    
    //Remove non displayed fuselages
    if(fuselageList[0] != null && this.fuselageList[0].posX >= sketch.width)
    {
      this.fuselageList.shift(); 
    }
    
  }
  sketch.touchStarted = function()
  {
    wings.touchStarted(wings.xPos, wings.yPos);
    tail.touchStarted(tail.xPos, tail.yPos);
    cockpit.touchStarted(cockpit.xPos, cockpit.yPos);

  }
  
  sketch.touchEnded = function()
  {
    wings.touchEnded(fuselageList);
    tail.touchEnded(fuselageList);
    cockpit.touchEnded(fuselageList);
  }
  
  sketch.touchMoved = function()
  {
    wings.touchMoved();
    tail.touchMoved();
    cockpit.touchMoved();
  }
  
  function addFuselage()
  {
    this.fuselageList.push(new Fuselage(sketch, fuselageImg, 
      airplaneCompImg, cockpitImg, fuselageCImg, fuselageTImg, 
      fuselageWImg, fuselageCTImg, fuselageCWImg, fuselageWTImg, wingsImg));

    crateTimeout = setTimeout(addFuselage, 3000);
  }
  
  function loadImages()
  {
    fuselageImg = sketch.loadImage("images/game/planeBuilder/fuselage.png");
    tailImg = sketch.loadImage("images/game/planeBuilder/tail.png");
    wingsImg = sketch.loadImage("images/game/planeBuilder/wings.png");
    cockpitImg = sketch.loadImage("images/game/planeBuilder/cockpit.png");
    fuselageCImg = sketch.loadImage("images/game/planeBuilder/fuselageC.png");
    fuselageTImg = sketch.loadImage("images/game/planeBuilder/fuselageT.png");
    fuselageWImg = sketch.loadImage("images/game/planeBuilder/fuselageW.png");
    fuselageCTImg = sketch.loadImage("images/game/planeBuilder/fuselageCT.png");
    fuselageCWImg = sketch.loadImage("images/game/planeBuilder/fuselageCW.png");
    fuselageWTImg = sketch.loadImage("images/game/planeBuilder/fuselageWT.png");
    airplaneCompImg = sketch.loadImage("images/game/planeBuilder/airplaneComp.png");
  }
}
