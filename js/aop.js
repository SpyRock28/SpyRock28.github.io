var slideIndex = 1;
var total = 50;
let currentQuiz;

function initalLoad(){

  $(".drag-target").on("swipeleft", function () {
    $("#sidenav-overlay").trigger("click");
  });

  $("#backButton").hide();
  $("#menuButton").hide();
  $("#backActivityButton").hide();
  $("#backChartsButton").hide();
  $("#backQuizButton").hide();


  loadSidenav();
}

function loadActivityPage()
{
  clearColor();
  closeGame();
  closeSidenav();
  $("#app_cont").load("content/activity.html");
  $("#pageTitle").text("Activities");
  $("#menuButton").show();
  $("#backActivityButton").hide();
}

function loadSettings()
{
  clearColor();
  closeGame();
  closeSidenav();
  $("#app_cont").load("content/settings.html");
  $("#pageTitle").text("Settings");
}

function loadSidenav()
{
  /*var sideNavButton = document.getElementById("menuButton");
  sideNavButton.setAttribute('data-activates', 'mobile-demo');
  sideNavButton.setAttribute('class', 'button-collapse');*/

  $('.button-collapse').sideNav({
    draggable:true,
    edge:'left'
  });
}

function closeSidenav()
{
  $('.button-collapse').sideNav('hide');
  $('.button-collapse').sideNav({
    closeOnClick: true
  });
}

function loadHome(){
  clearColor();
  closeGame();
  closeSidenav();
  //loadSidenav();
  $("#menuButton").show();
  //  $("#backButton").css('display', 'none');
  $("#app_cont").load("content/home.html");
  $("#pageTitle").text('AoP');
  $("#app_cont").css('background-color', '#e0e0e0');
  $("#app_cont").css('height','100%');
  $('body').css('background-color', '#e0e0e0');
}

function clickNextSlide(){
  $('.slider').slider('next');
}

function clickPrevSlide(){
  $('.slider').slider('prev');
}

function loadSlide(n){
  clearColor();
  closeSidenav();
  $("#pageTitle").text('AOP Slides');
  $("#app_cont").addClass("slideScreenHide");

  animateArrow();
  $("#app_cont").load("content/slideScreen.html", function()
  {
    var numberList = document.getElementById("numberList");

    for(var i = slideIndex; i <= total; i++)
    {
      //create new li element
      var newNumberListItem = document.createElement("li");
      var numberListValue = document.createElement("div");
      var pageNumber = document.createElement("div");

      var progressBar = document.createElement("div");
      var myBar = document.createElement("div");
      progressBar.setAttribute("class", "row myProgress");
      myBar.setAttribute("class", "myBar");
      myBar.style.width = ((100/total) * i)  + '%';

      progressBar.appendChild(myBar);
      numberListValue.setAttribute("id", "slide" + i);
      numberListValue.setAttribute("class","imageStyle" );
      numberListValue.setAttribute("style", "background-image: url(images/IntermediateLevelAoP/Slide"+i+".jpg)");
      pageNumber.setAttribute("id", "pageNumber");
      pageNumber.innerHTML = i + ' of ' + total;
      pageNumber.setAttribute("class", "positionNumber");
      newNumberListItem.appendChild(numberListValue);
      newNumberListItem.appendChild(progressBar);
      numberList.appendChild(newNumberListItem);

    }
    $('.slider').slider({interval:1000000000, indicator:true, });
  });
}

function loadCalculator(){
  clearColor();

  closeSidenav();
  $("#app_cont").load("content/calculator.html");
  $("#pageTitle").text("Little's Law Calculator");
  $("#calcLabel").css('color','#0EABDA');
  $("#app_cont").css('background-color', '#e0e0e0');
  $("#app_cont").css('height','100%');
  $('body').css('background-color', '#e0e0e0');
  //$("#calcsvg").css({ fill: "#ff0000" });

}

function loadCalculatorModal(){
  var defaultColor= "#424242";
  var pageTitle = $("#pageTitle").text();
  if(pageTitle !== "Little's Law Calculator"){
    $("#modal_content").load("content/calculator.html");
    $("#calcContainer").css('padding-top','0px');
    $("#calcLabel").css('color','#0EABDA');
    //$("#calcsvg").attr("fill","#0EABDA");
    $(".calculator").css("fill", "#0EABDA");
    //$("#calcsvg").css({fill: #0eABDA});
    //$("#calcsvg").css('color','#0EABDA');
    //$("#calcsvg").css({ fill: "#ff0000" });
    //$('#calcsvg').css({fill: defaultColor});
    $("#app_cont").css('filter', 'blur(5px) grayscale(50%)');


    $(document).ready(function(){
      $('#modal1').modal();
    });

    $('#modal1').modal({
      dismissible:false
    });
    $('#modal1').modal('open');

  }


}

function loadSearchModal(){

  $("#modal_content").load("content/search.html");
  $("#searchContainer").css('padding-top','0px');
    //$("#calcLabel").css('color','#0EABDA');
    $("#app_cont").css('filter', 'blur(5px) grayscale(50%)');


    $(document).ready(function(){
      $('#modal1').modal();
    });

    $('#modal1').modal({
      dismissible:false
    });
    $('#modal1').modal('open');


  }

  function loadEmailModal(){

    $("#modal_content").load("content/email.html");
    $("#app_cont").css('filter', 'blur(5px) grayscale(50%)');
    $(".mailIcon").css("fill", "#0EABDA");
    $("#mailLabel").css('color','#0EABDA');

    $(document).ready(function(){
      $('#modal1').modal();
    });

    $('#modal1').modal({
      dismissible:false
    });
    $('#modal1').modal('open');


  }

  function loadNotesModal(){

    $("#modal_content").load("content/notes.html");
    $("#app_cont").css('filter', 'blur(5px) grayscale(50%)');
    $(".eventNote").css("fill", "#0EABDA");
    $("#notesLabel").css('color','#0EABDA');
    $(document).ready(function(){
      $('#modal1').modal();
    });

    $('#modal1').modal({
      dismissible:false
    });
    $('#modal1').modal('open');


  }

  // function loadQuizModal() {

  //   $("#quiz_content").load("content/quiz.html");
  //   $("#app_cont").css('filter', 'blur(5px) grayscale(50%)');
  //   $("#quiz_content").css('padding-top','0px');

  //   $(document).ready(function(){
  //     $('#quizModal').modal();
  //   });

  //   $('#quizModal').modal({
  //     dismissible:false
  //   });
  //   $('#quizModal').modal('open');
  // }

  function loadResources(){
    clearColor();
    closeGame();

    closeSidenav();
    $("#app_cont").load("content/resources.html");
    $("#pageTitle").text("Resources");
    $("#menuButton").show();
    $("#backButton").hide();
  //add a transform for the lines.
}




function loadGettingStarted(){
  clearColor();
  closeGame();

  closeSidenav();
  $("#app_cont").load("content/gettingStarted.html");
  $("#pageTitle").text("Getting Started");
}

function loadNewsletter(){
  clearColor();
  closeGame();

  closeSidenav();
  $("#app_cont").load("content/newsletter.html");
  $("#pageTitle").text("Archived Newsletters");
  animateArrow();
}

function loadAboutUs(){
  clearColor();
  closeGame();

  closeSidenav();
  $("#app_cont").load("content/aboutUs.html");
  $("#pageTitle").text("About Us");
}

function clearColor(){
  var defaultColor= "#424242"
  $("#calcLabel").css('color',defaultColor);
  $('#calcsvg').css({fill: defaultColor});
  $(".calculator").css({fill: defaultColor});
  $(".eventNote").css({fill: defaultColor});
  $("#notesLabel").css('color',defaultColor);
  $(".mailIcon").css({fill: defaultColor});
  $("#mailLabel").css('color',defaultColor);
  $("#app_cont").css('background-color', '#e0e0e0');
  $("#app_cont").css('height','');
  $('body').css('background-color', '#e0e0e0');
  $("#app_cont").css('filter', '');

}

function closeGame() {
  if(typeof car_S != 'undefined' && car_S !== null) {
    gameCleanup(car_S,'app_cont');
  }

  if(typeof conv_Sim != 'undefined' && conv_Sim !== null) {
    gameCleanup(conv_Sim,'app_cont');
  }

  if(typeof c_PathSim != 'undefined' && c_PathSim !== null) {
    gameCleanup(c_PathSim,'app_cont');
  }

  if(typeof exportRoot != 'undefined' && exportRoot !== null) {
    gameCleanupCar(exportRoot,'app_cont');
  }
}

function loadGame(){
  closeGame();
  closeSidenav();
  animateActivityArrow();
  $(function(){
    $("#app_cont").empty();
    car_S = new p5(carSim,'app_cont');
  });
  $("#pageTitle").text("Activity");
}

function loadGame2(){
  closeGame();
  closeSidenav();
  animateActivityArrow();
  $(function(){
    $("#app_cont").empty();
    $("html").css('background-color', '#39b54a');
    $("#app_cont").css('background-color', '#39b54a');
    $("#app_cont").css('background-image', 'linear-gradient(180deg, #00e5ff 50%, #39b54a 50%)');
    conv_Sim = new p5(convSim,'app_cont');
  });
  $("#pageTitle").text("Activity");
}

function loadGame3(){
  closeGame();
  closeSidenav();
  animateActivityArrow();
  $(function(){
    $("#app_cont").empty();
    $("html").css('background-color', '#B2DFDA');
    $("#app_cont").css('background-color', '#B2DFDA');
    c_PathSim = new p5(cPathSim,'app_cont');
  });
  $("#pageTitle").text("Activity");
}

function loadLandscapeModal(){
  if(window.innerHeight > window.innerWidth){
    $("#modal_content_landscape").load("content/landscape.html");
    $("#app_cont").css('filter', 'blur(5px) grayscale(50%)');

    /*var landscapeModal= document.getElementById("modal1");
    landscapeModal.style="top:30% !important"; */

    $(document).ready(function(){
      $('#landscapeModal').modal();
    });

    $('#landscapeModal').modal({
      dismissible: false
    });
    $('#landscapeModal').modal('open'); 
    
  }

}


function loadCharts()
{
  clearColor();
  closeGame();
  closeSidenav();
  $("#app_cont").load("content/charts.html");
  $("#pageTitle").text("Charts");
  $("#menuButton").show();
  $("#backChartsButton").hide();
}

function loadBarChart() {
  animateChartArrow();
  $("#app_cont").load("content/gatebar.html");
  $("#pageTitle").text("Process Machine Chart");
}

function loadTableChart() {
  animateChartArrow();
  $("#app_cont").load("content/machinetable.html");
  $("#pageTitle").text("Gate Performance Chart");
}

function loadTemplate(){
  clearColor();
  closeGame();

  $("#app_cont").load("content/template.html");
  $("#pageTitle").text("Templates");
  animateArrow();
}

function loadGuidance(){
  clearColor();
  closeGame();

  $("#app_cont").load("content/guidance.html");
  $("#pageTitle").text("Guidance");
  animateArrow();
}

function loadHandbook(page = 1){
  clearColor();
  closeGame();

  $("#app_cont").load("pdf/aop-handbook.pdf#page=" + page);
  $("#pageTitle").text("Handbook");
}

function loadAcronyms(){
  $('#modal1').modal('close');
  clearColor();
  closeGame();

  $("#app_cont").load("content/acronyms.html");
  $("#pageTitle").text("Acronyms");

  animateArrow();
}

function loadWallWalks(){
  clearColor();
  closeGame();

  $("#app_cont").load("content/wallWalks.html");
  $("#pageTitle").text("Wall Walks");

  animateArrow();
}

function animateArrow()
{
  $("#menuButton").hide();
  $("#backButton").show();

  var topPatty = document.getElementById("pat1");
  var bottomPatty = document.getElementById("pat3");
  topPatty.style="height:4px; width:24px; position:absolute; top:45%; left:15%";

  topPatty.style="transform:rotate(-45deg);width:15px; top:28%; left:14%;";
  bottomPatty.style="transform:rotate(45deg);width:15px; top:63%;";
}

//activity page back arrow
function animateActivityArrow()
{
  $("#menuButton").hide();
  $("#backActivityButton").show();

  var topPatty = document.getElementById("patAct1");
  var bottomPatty = document.getElementById("patAct3");
  topPatty.style="height:4px; width:24px; position:absolute; top:45%; left:15%";

  topPatty.style="transform:rotate(-45deg);width:15px; top:28%; left:14%;";
  bottomPatty.style="transform:rotate(45deg);width:15px; top:63%;";
}

function animateChartArrow()
{
  $("#menuButton").hide();
  $("#backChartsButton").show();

  var topPatty = document.getElementById("patChart1");
  var bottomPatty = document.getElementById("patChart3");
  topPatty.style="height:4px; width:24px; position:absolute; top:45%; left:15%";

  topPatty.style="transform:rotate(-45deg);width:15px; top:28%; left:14%;";
  bottomPatty.style="transform:rotate(45deg);width:15px; top:63%;";
}


function animateQuizArrow()
{
  $("#menuButton").hide();
  $("#backQuizButton").show();

  var topPatty = document.getElementById("patQuiz1");
  var bottomPatty = document.getElementById("patQuiz3");
  topPatty.style="height:4px; width:24px; position:absolute; top:45%; left:15%";

  topPatty.style="transform:rotate(-45deg);width:15px; top:28%; left:14%;";
  bottomPatty.style="transform:rotate(45deg);width:15px; top:63%;";
}


function clickBackToActivity()
{
  var burger1 = document.getElementById("bur1");
  var burger3 = document.getElementById("bur3");
  burger1.style="transform:rotate(-45deg);width:15px; top:28%; left:14%;"
  burger3.style="transform:rotate(45deg);width:15px; top:63%;";
  loadActivityPage();
  resetActivityArrow();
  burger1.style="tranform:rotate(45deg); width:24px; top:20%; left:15%;";
  burger3.style="tranform:rotate(-45deg); width:24px; top:70%; left:15%;";

  $("html").css('background-color', 'unset');
  $("#app_cont").css('background-color', 'none');
  $("#app_cont").css('background-image', 'none');

}

function clickBackToResources()
{
  var burger1 = document.getElementById("bur1");
  var burger3 = document.getElementById("bur3");
  burger1.style="transform:rotate(-45deg);width:15px; top:28%; left:14%;"
  burger3.style="transform:rotate(45deg);width:15px; top:63%;";
  loadResources();
  resetArrow();
  burger1.style="tranform:rotate(45deg); width:24px; top:20%; left:15%;";
  burger3.style="tranform:rotate(-45deg); width:24px; top:70%; left:15%;";
  portraitStyle();
}

function clickBackToCharts()
{
  var burger1 = document.getElementById("patChart1");
  var burger3 = document.getElementById("patChart3");
  burger1.style="transform:rotate(-45deg);width:15px; top:28%; left:14%;"
  burger3.style="transform:rotate(45deg);width:15px; top:63%;";
  loadCharts();
  resetChartArrow();
  burger1.style="tranform:rotate(45deg); width:24px; top:20%; left:15%;";
  burger3.style="tranform:rotate(-45deg); width:24px; top:70%; left:15%;";
}

function clickBackToQuiz()
{
  console.log("clickBackToQuiz");
  var burger1 = document.getElementById("patQuiz1");
  var burger3 = document.getElementById("patQuiz3");
  burger1.style="transform:rotate(-45deg);width:15px; top:28%; left:14%;"
  burger3.style="transform:rotate(45deg);width:15px; top:63%;";
  saveAndCloseQuiz();
  resetQuizArrow();
  burger1.style="tranform:rotate(45deg); width:24px; top:20%; left:15%;";
  burger3.style="tranform:rotate(-45deg); width:24px; top:70%; left:15%;";
}

function portraitStyle()
{
    $("#mobileFooter").css('display', 'unset');
      $("#sliderScreen").css('margin-top', '0px');
      $(".footerIcons").css('display', 'unset');
      $(".page-footer").css('display', 'unset');
      $("nav").css('height', '56px');
      $("nav").css('transition', 'none');
      $(".imageStyle").css('background-size', 'contain');
      $(".myProgress").css('bottom', '65px');
       $('nav').hover(function() {
      $(this).stop().css('height','56px')
      })
}

function resetActivityArrow()
{
  var topPatty = document.getElementById("patAct1");
  var bottomPatty = document.getElementById("patAct3");
  topPatty.style="transform:rotate(45deg);width:24px; top:45%; left:15%;";
  bottomPatty.style="tranform:rotate(-45deg); width:24px; top:70%; left:15%";
}

function resetArrow()
{
  var topPatty = document.getElementById("pat1");
  var bottomPatty = document.getElementById("pat3");
  topPatty.style="transform:rotate(45deg);width:24px; top:45%; left:15%;";
  bottomPatty.style="tranform:rotate(-45deg); width:24px; top:70%; left:15%";
}

function resetChartArrow()
{
  var topPatty = document.getElementById("patChart1");
  var bottomPatty = document.getElementById("patChart3");
  topPatty.style="transform:rotate(45deg);width:24px; top:45%; left:15%;";
  bottomPatty.style="tranform:rotate(-45deg); width:24px; top:70%; left:15%";
}

function resetQuizArrow()
{
  var topPatty = document.getElementById("patQuiz1");
  var bottomPatty = document.getElementById("patQuiz3");
  topPatty.style="transform:rotate(45deg);width:24px; top:45%; left:15%;";
  bottomPatty.style="tranform:rotate(-45deg); width:24px; top:70%; left:15%";
}

function clickBackToQuiz()
{
  var burger1 = document.getElementById("patQuiz1");
  var burger3 = document.getElementById("patQuiz3");
  burger1.style="transform:rotate(-45deg);width:15px; top:28%; left:14%;"
  burger3.style="transform:rotate(45deg);width:15px; top:63%;";
  loadQuizList();
  resetQuizArrow();
  burger1.style="tranform:rotate(45deg); width:24px; top:20%; left:15%;";
  burger3.style="tranform:rotate(-45deg); width:24px; top:70%; left:15%;";
}


function loadQuizList(){
  console.log("loadquizlist");
  clearColor();
  closeGame();

  closeSidenav();
  $("#app_cont").load("content/quizList.html");
  $("#pageTitle").text("Quizzes");
  $("#menuButton").show();
  $("#backQuizButton").hide();

  openQuestionsNScores();
}
 
function loadQuiz(name, datastoreName){
  clearColor();
  closeGame();
  currentQuiz = datastoreName;

  $("#app_cont").load("content/quizPage.html");
  $("#pageTitle").text(name + " Quiz");
   $("#menuButton").hide();
  $("#backQuizButton").show();
  animateQuizArrow();
}


function loadTraining(){
  clearColor();
  closeSidenav();
  closeGame();

  $(function(){
    $("#app_cont").empty();

    var anim_container = document.createElement("div");
    anim_container.id = "animation_container";
    anim_container.style = "display: none; background-color:rgba(255, 255, 255, 1.00);";

    var canvas = document.createElement('canvas');
    canvas.id = "canvas";
    canvas.style = "position: absolute; display: block; background-color:rgba(255, 255, 255, 1.00);";

    var dom_overlay_container = document.createElement("div");
    dom_overlay_container.id = "dom_overlay_container";
    dom_overlay_container.style = "pointer-events:none; overflow:hidden; position: absolute; left: 0px; top: 0px; display: block;";

    anim_container.appendChild(canvas);
    anim_container.appendChild(dom_overlay_container);

    document.getElementById("app_cont").appendChild(anim_container);

    document.getElementById("animation_container").style.display = "block";

    init();

    var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
    function init() {
      canvas = document.getElementById("canvas");
      anim_container = document.getElementById("animation_container");
      dom_overlay_container = document.getElementById("dom_overlay_container");
      var comp=AdobeAn.getComposition("D8119AD668E9D44193ADA1BB18D6EFBE");
      var lib=comp.getLibrary();
      var loader = new createjs.LoadQueue(false);
      loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
      loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
      var lib=comp.getLibrary();
      loader.loadManifest(lib.properties.manifest);
    }
    function handleFileLoad(evt, comp) {
      var images=comp.getImages();
      if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
    }
    function handleComplete(evt,comp) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib=comp.getLibrary();
    var ss=comp.getSpriteSheet();
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for(i=0; i<ssMetadata.length; i++) {
      ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
    }
    exportRoot = new lib.LittlesLawAnimationWholeSeq();
    stage = new lib.Stage(canvas);
    stage.enableMouseOver();
    //Registers the "tick" event listener.
    fnStartAnimation = function() {
      stage.addChild(exportRoot);
      createjs.Ticker.setFPS(lib.properties.fps);
      createjs.Ticker.addEventListener("tick", stage);
    }
    //Code to support hidpi screens and responsive scaling.
    function makeResponsive(isResp, respDim, isScale, scaleType) {
      var lastW, lastH, lastS=1;
      window.addEventListener('resize', resizeCanvas);
      resizeCanvas();
      function resizeCanvas() {
        var w = lib.properties.width, h = lib.properties.height;
        var iw = window.innerWidth, ih=window.innerHeight;
        var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;
        if(isResp) {
          if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {
            sRatio = lastS;
          }
          else if(!isScale) {
            if(iw<w || ih<h)
              sRatio = Math.min(xRatio, yRatio);
          }
          else if(scaleType==1) {
            sRatio = Math.min(xRatio, yRatio);
          }
          else if(scaleType==2) {
            sRatio = Math.max(xRatio, yRatio);
          }
        }
        canvas.width = w*pRatio*sRatio;
        canvas.height = h*pRatio*sRatio;
        canvas.style.width = dom_overlay_container.style.width = anim_container.style.width =  w*sRatio+'px';
        canvas.style.height = anim_container.style.height = dom_overlay_container.style.height = h*sRatio+'px';
        stage.scaleX = pRatio*sRatio;
        stage.scaleY = pRatio*sRatio;
        lastW = iw; lastH = ih; lastS = sRatio;
        stage.tickOnUpdate = false;
        stage.update();
        stage.tickOnUpdate = true;
      }
    }
    makeResponsive(true,'both',true,1);
    AdobeAn.compositionLoaded(lib.properties.id);
    fnStartAnimation();
  }
});
$("#pageTitle").text("Training");
}