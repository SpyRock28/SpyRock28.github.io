var trafficSim = function(sketch) {
var carImgs = [];
var complete = false;
var numberOfLanes = 3;
var nuumberOfOpenLanes = 3;
var frameRate = 30;
var carWidth = 50;
var carHeight = 100;
var velocity = 3;
var intervalTime = 3000;
var ySpawnWindowHeight = velocity*frameRate*(intervalTime/1000)-carHeight;
var carLaneXs = [];
this.carList = [];
  sketch.setup = function() {

    loadImages();

    sketch.frameRate(frameRate);
    can = sketch.createCanvas(360, 640);
    const canvasElt = can.elt;
    canvasElt.style.width = '100%', canvasElt.style.height="100%";
    carLaneXs = calcLanes(numberOfLanes);

    for(let i=1; i<=nuumberOfOpenLanes; i++)
    {
      addCar(i);
    }
  }

  sketch.draw = function() {
    sketch.background(0);
    console.log("Drawing " + carList.length + " cars");

    var deleteIndex = null;
    for (let i=0; i<carList.length; i++)
    {
      if (this.carList[i].update(velocity) == false)
        deleteIndex = i;
    }
    if (deleteIndex)
      carList.splice(deleteIndex, 1);
  }

  function addCar(lane)
  {
    var laneWidth = can.width/3;
    var yStart = Math.random() * ySpawnWindowHeight;
    var carImg = carImgs[Math.floor(Math.random()*(carImgs.length))];
    this.carList.unshift(
      new Car(sketch, carImg, carLaneXs[lane],
      can.height+yStart, carWidth, carHeight));
    console.log("added car @ " + carLaneXs[lane] +
      ", " +can.height+yStart);

    if (!complete)
    {
      crateTimeout = setTimeout(function(){addCar(lane);}, intervalTime);
    }
  }

function calcLanes(numberOfLanes)
{
  xpos = [];
  var laneWidth = can.width/numberOfLanes;
  for(let i=1; i<=numberOfLanes; i++)
  {
    xpos[i] = (i-1)*laneWidth + ((laneWidth-carWidth)/2);
  }
  return xpos;
}

  function loadImages()
  {
      carImgs[0] = sketch.loadImage("images/game/cars/1.png");
      carImgs[1] = sketch.loadImage("images/game/cars/2.png");
      carImgs[2] = sketch.loadImage("images/game/cars/3.png");
      carImgs[3] = sketch.loadImage("images/game/cars/4.png");
      carImgs[4] = sketch.loadImage("images/game/cars/5.png");
      carImgs[5] = sketch.loadImage("images/game/cars/6.png");
      carImgs[6] = sketch.loadImage("images/game/cars/7.png");
      carImgs[7] = sketch.loadImage("images/game/cars/8.png");
      carImgs[8] = sketch.loadImage("images/game/cars/9.png");
      carImgs[9] = sketch.loadImage("images/game/cars/10.png");
      carImgs[10] = sketch.loadImage("images/game/cars/11.png");
      carImgs[11] = sketch.loadImage("images/game/cars/12.png");
  }
}
