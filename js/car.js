
function Car(sketch, laneXVals, id, imageNameList, maxCarsRendered)
{


  let evaluationPoint = 700;


  this.carId = id;
  this.isLookingForSpot = false;
  this.isWaitingInTraffic = false;
  this.waitingAtGate = false;
  this.yLoc =  sketch.height + 10;
  //this.xLoc =  sketch.random(laneXVals);
  this.xLoc = sketch.width / 2;


  this.waitTimer = 7000;
  this.waited = false;
  this.speed = -3.5;
  this.myLaneIndex = -1;

  this.carSprite = sketch.createSprite(this.xLoc, this.yLoc-20, 30, 30);
  this.carSprite.addImage(sketch.loadImage(sketch.random(imageNameList)));
  //this.carSprite.addImage(sketch.loadImage("imgs/truck2.png"));

  this.carSprite.velocity.y = this.speed;
  this.carSprite.rotateToDirection = true;
  this.carSprite.depth = 0;

  this.collisionFinished = false;
  this.annealCollide = 20;

  this.angle = 0;
  this.carWaitInter;

  this.update = function(throughPut, carList, gateList, divider, waitingCars)
  {
    //look for the lane with the least cars
    if(this.carSprite.position.y <= evaluationPoint && !this.waited)
    {
      //Stops Car at gateList
      if(this.carSprite.overlap(divider.dividerSprite))
      {
        if(!this.waited && !this.waitingAtGate)
        {
          this.stopCar();
          _this = this;
          waitingCars.push(_this);

          if(typeof this.carWaitInter == "undefined")
          {
            this.carWaitInter = setTimeout(()=>{_this.startCar(waitingCars.shift(), gateList);
            }, 3000);
          }
        }
      }

      if(this.myLaneIndex == -1)
      {
          this.myLaneIndex = this.findLane(carList, gateList, divider, maxCarsRendered);
          this.angle = gateList[this.myLaneIndex].addCarToLane(this);
      }

      if(!this.carSprite.overlap(divider.dividerSprite))
          this.carSprite.velocity.y  = this.speed;

      if(this.myLaneIndex != -1)
          this.isCollidedWithCars(carList, gateList);

      if(this.angle > 260 && this.carSprite.position.x >= gateList[this.myLaneIndex].xLoc && this.waitingAtGate == false)
          this.carSprite.setSpeed(this.speed, 90);
      else if(this.angle < 260 && this.carSprite.position.x <= gateList[this.myLaneIndex].xLoc && this.waitingAtGate == false)
          this.carSprite.setSpeed(this.speed, 90);

    }


    this.removeCarsNotRenderedFromLane(gateList);

  }

  this.stopCar = function()
  {
    this.carSprite.velocity.y = 0;
    this.carSprite.rotateToDirection = false;
    this.waitingAtGate = true;
  }

  this.startCar = function(_this, gateList)
  {

    _this.waited = true;
    _this.carSprite.velocity.y  = this.speed * 2;
    gateList[_this.myLaneIndex].removeCarFromLane();
    clearTimeout(_this.carWaitInter);

  }

  this.removeCarsNotRenderedFromLane = function(gateList)
  {
    if(typeof gateList[this.myLaneIndex] != 'undefined')
    {
      for(let i = 0; i < gateList[this.myLaneIndex].carQueue.length; i++)
      {
        if(gateList[this.myLaneIndex].carQueue[i].carSprite.position.y <  35)
        {
            gateList[this.myLaneIndex].carQueue[i].carSprite.remove();
            gateList[this.myLaneIndex].carQueue[i] = null;
            gateList[this.myLaneIndex].carQueue.splice(i, 1);
        }
      }


    }
  }

  this.isCollidedWithCars = function(carList, gateList)
  {
    let carQue = gateList[this.myLaneIndex].carQueue;
    let indexInLane  = carQue.indexOf(this);

    if(indexInLane > 0)
    {
      for(let i = 0; i < carQue.length; i++)
      {
        if(typeof carQue[i] != 'undefined')
        {
          if(this.carSprite.position.y < carQue[i].carSprite.position.y)
          {
            this.carSprite.displace(carQue[i].carSprite);
            this.carSprite.velocity.y = 0;
          }
          else {
            carQue[i].carSprite.displace(this.carSprite);
          }
        }
      }

      /*if(typeof carQue[indexInLane - 1] != 'undefined')
      {
        carQue[indexInLane-1].carSprite.displace(this.carSprite);
      }*/
    }
  }

  this.findLane = function(carList, gateList, divider, maxCarsRendered)
  {
    let minIndex = -1;
    let minVal = maxCarsRendered;

    for(let i = 0; i < gateList.length; i++)
    {
      if(minVal >= gateList[i].carsInLane && gateList[i].gateOpen)
      {
        minVal = gateList[i].carsInLane;
        minIndex = i;
      }
    }

    //All gates are closed
    if(minIndex == -1)
      minIndex = sketch.floor(sketch.random(0, gateList.length-1));

    return minIndex;
  }

}
