var barchartNameFilled = false;
var numGatesFilled = false
var numReqsFilled = false;
var gateTitleFilled = false;
var gateRemainingFilled = false;
var gateActualFilled = false;
var gateAvgDaysFilled = false;

var numOfGates;
var currGateNum = 1;

var chartProperties = [];
var gates = [];

const barchartIndexes = ["name", "numGates", "numReq"];

function resetGlobalValues(){
  currGateNum = 1;
  chartProperties = [];
  gates = [];
}

/**
* Closes the window that displays the list of charts and displays a list of
* chart properties to input for the user
*/
function defineChart() {
  resetGlobalValues();
  //displaySavedCharts();
  $("#chart_choice").addClass("hidden_toggle");
  $("#chart_define").removeClass("hidden_toggle");
  resetInputBooleanValues();
  setupKeyEvents();
}

/**
* Closes the chart window that is displayed in defineChart() and opens a hidden window
* that takes in gate properties
*/
function gateValues() {
  numOfGates = parseInt($("#num_gates_id").val());
  chartProperties = [$("#barchart_name_id").val(), $("#num_gates_id").val(), $("#num_req_id").val()];
  $("#chart_define").addClass("hidden_toggle");
  $("#gate_values").removeClass("hidden_toggle");
}

/*
* Closes the gate properties window called in gateValues() and builds a window to displays
* the chart the user has just built or pulled from the database.
*/
function showBarChart() {
  var chartObj = buildChartObject();
  sendChartToDB(chartObj);
  $("#gate_values").addClass("hidden_toggle");
  $("#gate_chart").removeClass("hidden_toggle");
  showGateBarChart(chartObj);
}

/*
* Creates a gate with the given properties from the gateValues window, checking if the gate limit
* has been reached and clears each input and handles disabling/enabling buttons.
*/
function addChartGate() {
  let oneGateObj = {
    "title" : $("#gate_title_id").val(),
    "remDays" : $("#gate_remaining_id").val(),
    "actDays" : $("#gate_actual_id").val(),
    "avgDays" : $("#gate_avg_days_id").val()
  }
  gates.push(oneGateObj);
  if(numOfGates === currGateNum){
    document.getElementById("next_gate_btn").style.display = 'none';
    document.getElementById("create_chart_btn").style.display = 'inline-block';
  }
  else{
    currGateNum++;
  }
  clearAllInputTextFields();
  resetInputBooleanValues();
  checkForAllGateChartInputs();
}

/*
* Sets up key events for each text input box, forcing the user to input text into each
* input before being allowed to continue.
*/
function setupKeyEvents(){
  document.getElementById('barchart_name_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      barchartNameFilled = false;
    }
    else{
      barchartNameFilled = true;
    }
    checkForAllBarChartInputs();
  }

  document.getElementById('num_gates_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      numGatesFilled = false;
    }
    else{
      numGatesFilled = true;
    }
    checkForAllBarChartInputs();
  }

  document.getElementById('num_req_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      numReqsFilled = false;
    }
    else{
      numReqsFilled = true;
    }
    checkForAllBarChartInputs();
  }

  document.getElementById('gate_title_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      gateTitleFilled = false;
    }
    else{
      gateTitleFilled = true;
    }
    checkForAllGateChartInputs();
  }

  document.getElementById('gate_remaining_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      gateRemainingFilled = false;
    }
    else{
      gateRemainingFilled = true;
    }
    checkForAllGateChartInputs();
  }

  document.getElementById('gate_actual_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      gateActualFilled = false;
    }
    else{
      gateActualFilled = true;
    }
    checkForAllGateChartInputs();
  }

  document.getElementById('gate_avg_days_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      gateAvgDaysFilled = false;
    }
    else{
      gateAvgDaysFilled = true;
    }
    checkForAllGateChartInputs();
  }
}

/**
* Resets global variables that define if an text input has received text from the user.
*/
function resetInputBooleanValues(){
  barchartNameFilled = false;
  numGatesFilled = false
  numReqsFilled = false;
  gateTitleFilled = false;
  gateRemainingFilled = false;
  gateActualFilled = false;
  gateAvgDaysFilled = false;
  $('#next_gate_btn').attr('disabled', 'disabled');
}

/*
* Clears all gate window text inputs
*/
function clearAllInputTextFields(){
  $("#gate_title_id").val("");
  $("#gate_remaining_id").val("");
  $("#gate_actual_id").val("");
  $("#gate_avg_days_id").val("");
}

/*
* Checks if ALL inputs have received text, enabling the button if true and disabling if false
* Specific to the barchart properties window.
*/
function checkForAllBarChartInputs(){
  if(barchartNameFilled && numGatesFilled && numReqsFilled){
    $('#save_chart_properties_btn').removeAttr('disabled');
    //$('#save_chart_properties_btn').addClass('col s6 m6 mouse_point waves-effect waves-light btn');
  }
  else{
    $('#save_chart_properties_btn').attr('disabled', 'disabled');
    //$('#save_chart_properties_btn').removeClass('col s6 m6 mouse_point waves-effect waves-light btn');
  }
}

/*
* Checks if ALL inputs have received text, enabling the button if true and disabling if false
* Specific to the gate properties window.
*/
function checkForAllGateChartInputs(){
  if(gateTitleFilled && gateRemainingFilled && gateActualFilled && gateAvgDaysFilled){
    $('#next_gate_btn').removeAttr('disabled');
    //$('#save_chart_properties_btn').addClass('col s6 m6 mouse_point waves-effect waves-light btn');
  }
  else{
    $('#next_gate_btn').attr('disabled', 'disabled');
    //$('#save_chart_properties_btn').removeClass('col s6 m6 mouse_point waves-effect waves-light btn');
  }
}

/*
* Creates an object of the charts to be stored in the database
*/
function buildChartObject(){
  let chartDBObject = {
    "name" : chartProperties[0],
    "numGates" : chartProperties[1],
    "numReq" : chartProperties[2],
    "gates" : gates
  };
  return chartDBObject;
}

/*
* Controller function for retrieving all saved charts from the database and passing them
* to be displayed in the charts window for selection
*/
function displaySavedCharts(){
  var chartsObj = getAllChartObjects();
  displayListOfCharts(chartsObj);
}

/*
* Retrieves all saved charts from the database.
*/
function getAllChartObjects(){
  itemDB.open("BarChartDatabase", 1, "barchartDatastore", "", barchartIndexes, true, function(){
    itemDB.fetchAll("barchartDatastore", function(results){
      displayListOfCharts(results);
    });
  });
}

/*
* Sends a chart object to the database to be saved.
* Parameters:
* chartDBObject - object containing all the relevant properties of the chart to be saved
*/
function sendChartToDB(chartDBObject){

  itemDB.open("BarChartDatabase", 1, "barchartDatastore", "", barchartIndexes, true, function(){
    itemDB.createItem("barchartDatastore", chartDBObject, function(){});
  });
}

/*
* Displays the list of charts received in the first window of the charts page
* Parameters:
* charts - collection of chart objects to be displayed in a list
*/
function displayListOfCharts(charts){
  console.log(JSON.stringify(charts));

  charts.forEach((chart) =>{
    $('<div>', {
      class: "row collapseGroup"
    }).append( $('<ul>', {
      style: "background-color:#eeeeee;",
      id: "chartList"
    }).append( $('<div>', {
      class: "col s10 collapsible-header",
      text: chart.name,
      id: chart.id
    })).append( $('<li>', {
    }).append( $('<div>', {
      class: "col s1 headerCollapsible",
      style: "padding:0"
    }).append( $('<img>', {
      src: "css/svg/mail.svg",
      id: "mailImg",
      style: "vertical-align:middle; width: 20px; height: 20px;"
    }))).append( $('<div>', {
      class: "col s1 headerCollapsible",
      style: "padding:0"
    }).append( $('<img>', {
      src: "css/svg/trash.svg",
      id: "trashImg",
      style: "vertical-align:middle; width: 20px; height: 20px;"
    }))))).appendTo('#saved_charts');
  });
  createChartsListEventListener();
}

/**
* Builds the event listener for the list items. Makes them clickable
*/
function createChartsListEventListener(){
  var el = document.getElementById("saved_charts");
  if(el){
    el.addEventListener("click", function(e) {
      console.log(e.path[0]);
      if(e.target && e.target.nodeName == "LI") {
        console.log(e.target.id + " was clicked");
      }
      else if(e.target && e.target.nodeName == "IMG"){
        console.log("image was clicked");
      }
    });
  }
}
