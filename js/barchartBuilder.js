//Global chart properties boolean values
var barchartNameFilled = false;
var numBarGatesFilled = false
var numBarReqsFilled = false;

//Global gate boolean values
var gateBarTitleFilled = false;
var gateBarRemainingFilled = false;
var gateBarActualFilled = false;
var gateBarAvgDaysFilled = false;

var numOfBarGates;
var currBarGateNum = 1;
var barChartProperties = [];
var barGates = [];

var builtExampleBarChart = false;

const barchartIndexes = ["name", "numGates", "numReq"];

function resetBarGlobalValues(){
  currBarGateNum = 1;
  barChartProperties = [];
  barGates = [];
}

function helpBarSwitch(){
  $("#bar_chart_choice").addClass("hidden_toggle");
  $("#barchart_help_start").removeClass("hidden_toggle");
}

/**
* Closes the window that displays the list of charts and displays a list of
* chart properties to input for the user
*/
function defineBarChart() {
  resetBarGlobalValues();
  //displaySavedCharts();
  $("#barchart_help_start").addClass("hidden_toggle");
  $("#bar_chart_define").removeClass("hidden_toggle");
  resetBarInputBooleanvalues();
  setupBarKeyEvents();
}

/**
* Closes the chart window that is displayed in defineChart() and opens a hidden window
* that takes in gate properties
*/
function barGateValues() {
  numOfBarGates = parseInt($("#barchart_num_gates_id").val());
  barChartProperties = [$("#barchart_name_id").val(),
                        $("#barchart_num_gates_id").val(),
                        $("#barchart_num_req_id").val()];
  $("#bar_chart_define").addClass("hidden_toggle");
  $("#barchart_gate_values").removeClass("hidden_toggle");
}

/*
* Closes the gate properties window called in gateValues() and builds a window to displays
* the chart the user has just built or pulled from the database.
*/
function showBarChart() {
  var chartObj = buildBarChartObject();
  sendBarChartToDB(chartObj);
  $("#barchart_gate_values").addClass("hidden_toggle");
  $("#barchart_gate_chart").removeClass("hidden_toggle");
  showGateBarChart(chartObj);
}

/*
* Creates a gate with the given properties from the gateValues window, checking if the gate limit
* has been reached and clears each input and handles disabling/enabling buttons.
*/
function addBarChartGate() {
  let oneGateObj = {
    "title" : $("#barchart_gate_title_id").val(),
    "remDays" : $("#barchart_gate_remaining_id").val(),
    "actDays" : $("#barchart_gate_actual_id").val(),
    "avgDays" : $("#barchart_gate_avg_days_id").val()
  }
  barGates.push(oneGateObj);
  if(numOfBarGates === currBarGateNum){
    document.getElementById("barchart_next_gate_btn").style.display = 'none';
    document.getElementById("barchart_create_chart_btn").style.display = 'inline-block';
  }
  else{
    currBarGateNum++;
    clearAllBarInputTextFields();
  }

  resetBarInputBooleanvalues();
  checkForAllBarGateChartInputs();
}

/*
* Sets up key events for each text input box, forcing the user to input text into each
* input before being allowed to continue.
*/
function setupBarKeyEvents(){

  /********************************************
  **BarChart Properties Input Event Listeners**
  ********************************************/
  document.getElementById('barchart_name_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      barchartNameFilled = false;
    }
    else{
      barchartNameFilled = true;
    }
    checkForAllBarChartInputs();
  }

  document.getElementById('barchart_num_gates_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      numBarGatesFilled = false;
    }
    else{
      numBarGatesFilled = true;
    }
    checkForAllBarChartInputs();
  }

  document.getElementById('barchart_num_req_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      numBarReqsFilled = false;
    }
    else{
      numBarReqsFilled = true;
    }
    checkForAllBarChartInputs();
  }

  /**********************************
  *****Gate Input Event Listeners****
  **********************************/

  document.getElementById('barchart_gate_title_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      gateBarTitleFilled = false;
    }
    else{
      gateBarTitleFilled = true;
    }
    checkForAllBarGateChartInputs();
  }

  document.getElementById('barchart_gate_remaining_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      gateBarRemainingFilled = false;
    }
    else{
      gateBarRemainingFilled = true;
    }
    checkForAllBarGateChartInputs();
  }

  document.getElementById('barchart_gate_actual_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      gateBarActualFilled = false;
    }
    else{
      gateBarActualFilled = true;
    }
    checkForAllBarGateChartInputs();
  }

  document.getElementById('barchart_gate_avg_days_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      gateBarAvgDaysFilled = false;
    }
    else{
      gateBarAvgDaysFilled = true;
    }
    checkForAllBarGateChartInputs();
  }
}

/**
* Resets global variables that define if an text input has received text from the user.
*/
function resetBarInputBooleanvalues(){
  barchartNameFilled = false;
  numBarGatesFilled = false
  numBarReqsFilled = false;
  gateBarTitleFilled = false;
  gateBarRemainingFilled = false;
  gateBarActualFilled = false;
  gateBarAvgDaysFilled = false;
  $('#barchart_next_gate_btn').attr('disabled', 'disabled');
}

/*
* Clears all gate window text inputs
*/
function clearAllBarInputTextFields(){
  $("#barchart_gate_title_id").val("");
  $("#barchart_gate_remaining_id").val("");
  $("#barchart_gate_actual_id").val("");
  $("#barchart_gate_avg_days_id").val("");

  $("#barchart_name_id").val("");
  $("#barchart_num_gates_id").val("");
  $("#barchart_num_req_id").val("");
}

/*
* Checks if ALL inputs have received text, enabling the button if true and disabling if false
* Specific to the barchart properties window.
*/
function checkForAllBarChartInputs(){
  if(barchartNameFilled && numBarGatesFilled && numBarReqsFilled){
    $('#barchart_save_chart_properties_btn').removeAttr('disabled');
  }
  else{
    $('#barchart_save_chart_properties_btn').attr('disabled', 'disabled');
  }
}

/*
* Checks if ALL inputs have received text, enabling the button if true and disabling if false
* Specific to the gate properties window.
*/
function checkForAllBarGateChartInputs(){
  if(gateBarTitleFilled && gateBarRemainingFilled && gateBarActualFilled && gateBarAvgDaysFilled){
    $('#barchart_next_gate_btn').removeAttr('disabled');
  }
  else{
    $('#barchart_next_gate_btn').attr('disabled', 'disabled');
  }
}

/*
* Creates an object of the charts to be stored in the database
*/
function buildBarChartObject(){
  let chartDBObject = {
    "name" : barChartProperties[0],
    "numGates" : barChartProperties[1],
    "numReq" : barChartProperties[2],
    "gates" : barGates
  };
  return chartDBObject;
}

/*
* Controller function for retrieving all saved charts from the database and passing them
* to be displayed in the charts window for selection
*/
function displaySavedBarCharts(){
  var chartsObj = getAllBarChartObjects();
  displayListOfCharts(chartsObj);
}

/*
* Retrieves all saved charts from the database.
*/
function getAllBarChartObjects(){
  itemDB.open("BarChartDatabase", 1, "barchartDatastore", "", barchartIndexes, true, function(){
    itemDB.fetchAll("barchartDatastore", function(results){
      displayListOfBarCharts(results);
    });
  });
}

/*
* Sends a chart object to the database to be saved.
* Parameters:
* chartDBObject - object containing all the relevant properties of the chart to be saved
*/
function sendBarChartToDB(chartDBObject){
  itemDB.open("BarChartDatabase", 1, "barchartDatastore", "", barchartIndexes, true, function(){
    itemDB.createItem("barchartDatastore", chartDBObject, function(){});
  });
}

/*
* Gets a chart from the database with the given id and sends it to machineTable.js to be
* generated and displayed.
* Parameters:
* id - the id of the chart stored in the database
*/
function buildBarChartFromDatabase(id){
  itemDB.open("BarChartDatabase", 1, "barchartDatastore", "", barchartIndexes, true, function(){
    itemDB.fetchOneByKey("barchartDatastore", id, function(result){
      $("#bar_chart_choice").addClass("hidden_toggle");
      $("#barchart_gate_chart").removeClass("hidden_toggle");
      showGateBarChart(result);
    });
  });
}

/*
* Called with the back button when displaying a chart, refreshes the chart list and
* displays the list.
*/
function returnToBarChartList(){
  $("#barchart_gate_chart").addClass("hidden_toggle");
  $("#bar_chart_choice").removeClass("hidden_toggle");
  document.getElementById("bar_saved_charts").innerHTML = "";
  clearAllBarInputTextFields();
  getAllBarChartObjects();
}

/*
* Deletes a chart from the database when the delete button is pressed on the list.
* Parameters:
* id - the id of the chart stored in the database
*/
function deleteBarChartFromDatabase(id){
  itemDB.deleteItem("barchartDatastore", id, function(){
    document.getElementById("bar_saved_charts").innerHTML = "";
    itemDB.fetchAll("barchartDatastore", function(results){
      displayListOfBarCharts(results);
    });
  });
}
/*
* Displays the list of charts received in the first window of the charts page
* Parameters:
* charts - collection of chart objects to be displayed in a list
*/
function displayListOfBarCharts(charts){
  console.log(JSON.stringify(charts));

  charts.forEach((chart) =>{
    $('<div>', {
      class: "row collapseGroup"
    }).append( $('<ul>', {
      style: "background-color:#eeeeee;",
      id: "chartList"
    }).append( $('<div>', {
      class: "barChartItem col s11 collapsible-header",
      text: chart.name,
      id: chart.id
    })).append( $('<li>', {
    }).append( $('<div>', {
      class: "col s1 headerCollapsible",
      style: "padding:0"
    }).append( $('<img>', {
      src: "css/svg/trash.svg",
      id: chart.id,
      style: "vertical-align:middle; width: 20px; height: 20px;"
    }))))).appendTo('#bar_saved_charts');
  });
}

/**
* Builds the event listener for the list items. Makes them clickable
*/
function createBarChartsListEventListener(){
  var el = document.getElementById("bar_saved_charts");
  if(el){
    el.addEventListener("click", function(e) {
      console.log(e.path[0]);
      if(e.target && e.target.classList[0] == "barChartItem") {
        var strId = e.target.id;
        var numId = parseInt(strId);
        buildBarChartFromDatabase(numId);
      }
      else if(e.target && e.target.nodeName == "IMG"){
        var strId = e.target.id;
        var numId = parseInt(strId);
        deleteBarChartFromDatabase(numId);
      }
    });
  }
}

function buildExampleBarChart(){
  if(!builtExampleBarChart){
  exampleGates = [{
    title : "62-3507",
    remDays : 0,
    actDays: 76,
    avgDays: 60.8
  },{
    title : "63-7982",
    remDays : 0,
    actDays: 65,
    avgDays: 64.4
  },{
    title : "61-0309",
    remDays : 0,
    actDays: 63,
    avgDays: 62.8
  },{
    title : "60-0322",
    remDays : 0,
    actDays: 51,
    avgDays: 61.8
  },{
    title : "60-0316",
    remDays : 0,
    actDays: 47,
    avgDays: 60.4
  },{
    title : "58-057",
    remDays : 15,
    actDays: 40,
    avgDays: "null"
  },{
    title : "62-3514",
    remDays : 27,
    actDays: 28,
    avgDays: "null"
  },{
    title : "60-0351",
    remDays : 40,
    actDays: 15,
    avgDays: "null"
  },{
    title : "62-3566",
    remDays : 50,
    actDays: 5,
    avgDays: "null"
  }];

  let chartDBObject = {
    "name" : "KC-135 Block 45 Mod Last 5 Produced & A/C In-Work",
    "numGates" : 9,
    "numReq" : 45,
    "gates" : exampleGates
    //["62-3507", 0, 76, 60.8], ["63-7982", 0, 65, 64.4], ["61-0309", 0, 63, 62.8], ["60-0322", 0, 51, 61.8],
    //["60-0316", 0, 47, 60.4], ["58-0057", 15, 40, null], ["62-3514", 27, 28, null], ["60-0351", 40, 15, null], ["62-3566", 50, 5, null]]
  };
  builtExampleBarChart = true;
  sendBarChartToDB(chartDBObject);
}
}
