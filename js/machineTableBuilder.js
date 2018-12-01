//Global chart properties boolean values
var tableChartNameFilled = false;
var numTableGatesFilled = false
var tableAvailDaysFilled = false;
var tableReqOutputFilled = false;
var tableWIPFilled = false;
var tableFlowFilled = false;

//Global gate boolean values
var tableGateTitleFilled = false;
var tableGateWIPFilled = false;
var tableGateFlowFilled = false;

var isTableEventListenerOn = false;
var globalTakt;
var tableChartProperties = [];
var tableGates = [];
var currTableGateNum = 1;
var numOfTableGates;

var builtExampleTableChart = false;


const tablechartIndexes = ["name", "availDays", "reqOutput", "takt", "wip", "flowdays"];

/**
* Resets global values used for each session of creating a table chart
*/
function resetTableGlobalValues(){
  currGateNum = 1;
  tableChartProperties = [];
  tableGates = [];
}

function helpTableSwitch(){
  $("#table_chart_choice").addClass("hidden_toggle");
  $("#tablechart_help_start").removeClass("hidden_toggle");
}

/**
* Closes the window that displays the list of charts and displays a list of
* chart properties to input for the user
*/
function defineTableChart() {
  resetTableGlobalValues();
  $("#tablechart_help_start").addClass("hidden_toggle");
  $("#table_chart_define").removeClass("hidden_toggle");
  resetTableInputBooleanValues();
  setupTableKeyEvents();
}

/**
* Closes the chart window that is displayed in defineChart() and opens a hidden window
* that takes in gate properties
*/
function tableGateValues() {
  numOfGates = parseInt($("#table_num_gates_id").val());
  tableChartProperties = [$("#tablechart_name_id").val(),
                          $("#table_avail_days_id").val(),
                          $("#table_req_output_id").val(),
                          $("#table_takt_id").val(),
                          $("#table_wip_goal").val(),
                          $("#table_flowdays_goal").val()];
  globalTakt = $("#table_takt_id").val();
  $("#table_chart_define").addClass("hidden_toggle");
  $("#tablechart_gate_values").removeClass("hidden_toggle");
}

/*
* Closes the gate properties window called in gateValues() and builds a window to displays
* the chart the user has just built or pulled from the database.
*/
function showTableChart() {
  var chartObj = buildTableChartObject();
  sendTableChartToDB(chartObj);
  $("#tablechart_gate_values").addClass("hidden_toggle");
  $("#gate_chart").removeClass("hidden_toggle");
  showGateTableChart(chartObj);
}

/*
* Creates a gate with the given properties from the gateValues window, checking if the gate limit
* has been reached and clears each input and handles disabling/enabling buttons.
*/
function addTableChartGate() {
  //Builds a new gate object
  let oneGateObj = {
    "title" : $("#table_gate_title_id").val(),
    "wip" : $("#gate_wip_goal").val(),
    "flowdays" : $("#gate_flowdays_goal").val()
  }
  tableGates.push(oneGateObj);
  //Checks if we've built the requested amount of gates, enabling the create button if true
  if(numOfGates === currGateNum){
    document.getElementById("tablechart_next_gate_btn").style.display = 'none';
    document.getElementById("tablechart_create_chart_btn").style.display = 'inline-block';
  }
  else{
    currGateNum++;
    clearAllTableInputTextFields();
  }
  resetTableInputBooleanValues();
  checkForAllTableChartInputs();
}

/*
* Sets up key events for each text input box, forcing the user to input text into each
* input before being allowed to continue.
*/
function setupTableKeyEvents(){

  /*******************************************
  ***Table Properties Input Event Listeners***
  ********************************************/

  document.getElementById('tablechart_name_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableChartNameFilled = false;
    }
    else{
      tableChartNameFilled = true;
    }
    checkForAllTableChartInputs();
  }

  document.getElementById('table_avail_days_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableAvailDaysFilled = false;
    }
    else{
      tableAvailDaysFilled = true;
    }
    checkForAllTableChartInputs();
    updateTablePropertyCalc();
  }

  document.getElementById('table_req_output_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableReqOutputFilled = false;
    }
    else{
      tableReqOutputFilled = true;
    }
    checkForAllTableChartInputs();
    updateTablePropertyCalc();
  }

  document.getElementById('table_num_gates_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      numTableGatesFilled = false;
    }
    else{
      numTableGatesFilled = true;
    }
    checkForAllTableChartInputs();
  }

  document.getElementById('table_wip_goal').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableWIPFilled = false;
      $('#table_flowdays_goal').val("");
    }
    else{
      tableWIPFilled = true;
      updateTablePropertyCalc();
    }
    checkForAllTableChartInputs();
  }

  document.getElementById('table_flowdays_goal').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableFlowFilled = false;
      $('#table_wip_goal').val("");
    }
    else{
      tableFlowFilled = true;
      updateTablePropertyCalc();
    }
    checkForAllTableChartInputs();
  }

  /**********************************
  *****Gate Input Event Listeners****
  **********************************/

  document.getElementById('table_gate_title_id').onkeyup = function(event) {
    if (this.value.length === 0) {
      tableGateTitleFilled = false;
    }
    else{
      tableGateTitleFilled = true;
    }
    checkForAllTableGateChartInputs();
  }

  document.getElementById('gate_wip_goal').onkeyup = function(event) {
    if (this.value.length === 0) {
       tableGateWIPFilled= false;
       tableGateFlowFilled = false;
       $("#gate_flowdays_goal").val("");
    }
    else{
      tableGateWIPFilled = true;
      updateGatePropertyCalc();
    }
    checkForAllTableGateChartInputs();
  }

  document.getElementById('gate_flowdays_goal').onkeyup = function(event) {
    if (this.value.length === 0) {
       tableGateFlowFilled = false;
       tableGateWIPFilled = false;
       $("#gate_wip_goal").val("");
    }
    else{
      tableGateFlowFilled = true;
      updateGatePropertyCalc();
    }
    checkForAllTableGateChartInputs();
  }
}

/*
* Determines what input boxes can display text and what those values are by calculating them
*/
function updateTablePropertyCalc(){
  //If both input boxes Available Days and Required Output are Filled
  if(tableAvailDaysFilled && tableReqOutputFilled){
    //Calculate the takt property by Available Days / Required Output
    var takt = parseInt($("#table_avail_days_id").val()) / parseInt($("#table_req_output_id").val());
    $('#table_takt_id').val(takt);
    //If WIP input is filled, calculate Flowdays property by WIP * Takt
    if(tableWIPFilled){
      var calcFD = parseInt($('#table_wip_goal').val()) * parseFloat($('#table_takt_id').val());
      $('#table_flowdays_goal').val(calcFD);
    }
    //If Flowdays input is filled, calculate WIP property by Flowdays / Takt
    else if(tableFlowFilled){
      var calcFD = parseFloat($('#table_flowdays_goal').val()) / parseFloat($('#table_takt_id').val());
      $('#table_wip_goal').val(calcFD);
    }
    //If neither WIP or Flowdays are filled, then clear both WIP and Flowdays
    else{
      $('#table_wip_goal').val("");
      $('#table_flowdays_goal').val("");
      tableWIPFilled = false;
      tableFlowFilled = false;
    }
  }
  //If neither Available Days or Required Output are filled, clear Takt, WIP and Flowdays input
  else {
        $('#table_takt_id').val("");
        $('#table_wip_goal').val("");
        $('#table_flowdays_goal').val("");
        tableWIPFilled = false;
        tableFlowFilled = false;
  }
}

/*
* If the WIP or Flowdays input are changed, this will recalculate the rowValues
* to reflect the correct calculations
*/
function updateGatePropertyCalc(){
  if(tableGateWIPFilled){
    var calcFD = parseInt($('#gate_wip_goal').val()) * globalTakt;
    $('#gate_flowdays_goal').val(calcFD);
  }
  else if(tableGateFlowFilled){
    var calcFD = parseFloat($('#gate_flowdays_goal').val()) / globalTakt;
    $('#gate_wip_goal').val(calcFD);
  }
  else{
    $('#gate_flowdays_goal').val("");
    $('#gate_wip_goal').val("");
  }
}

/**
* Resets global variables that define if an text input has received text from the user.
*/
function resetTableInputBooleanValues(){
  tableChartNameFilled = false;
  numTableGatesFilled = false
  tableAvailDaysFilled = false;
  tableReqOutputFilled = false;
  tableWIPFilled = false;
  tableFlowFilled = false;
  tableGateTitleFilled = false;
  tableGateWIPFilled = false;
  tableGateFlowFilled = false;
  $('#tablechart_next_gate_btn').attr('disabled', 'disabled');
}

/*
* Clears all gate and chart property window text inputs
*/
function clearAllTableInputTextFields(){
  $("#tablechart_name_id").val("");
  $("#table_avail_days_id").val("");
  $("#table_req_output_id").val("");
  $("#table_num_gates_id").val("");
  $("#table_takt_id").val("");
  $("#table_wip_goal").val("");
  $("#table_flowdays_goal").val("");

  $("#table_gate_title_id").val("");
  $("#gate_wip_goal").val("");
  $("#gate_flowdays_goal").val("");

}

/*
* Checks if ALL inputs have received text, enabling the button if true and disabling if false
* Specific to the barchart properties window.
*/
function checkForAllTableChartInputs(){
  if(tableChartNameFilled && numTableGatesFilled && tableAvailDaysFilled
    && tableReqOutputFilled && (tableWIPFilled || tableFlowFilled)){
    $('#save_table_chart_properties_btn').removeAttr('disabled');
  }
  else{
    $('#save_table_chart_properties_btn').attr('disabled', 'disabled');
  }
}

/*
* Checks if ALL inputs have received text, enabling the button if true and disabling if false
* Specific to the gate properties window.
*/
function checkForAllTableGateChartInputs(){
  if(tableGateTitleFilled && (tableGateFlowFilled || tableGateWIPFilled)){
    $('#tablechart_next_gate_btn').removeAttr('disabled');
  }
  else{
    $('#tablechart_next_gate_btn').attr('disabled', 'disabled');
  }
}

/*
* Creates an object of the charts to be stored in the database
*/
function buildTableChartObject(){
  let chartDBObject = {
    "name" : tableChartProperties[0],
    "availDays" : tableChartProperties[1],
    "reqOutput" : tableChartProperties[2],
    "takt" : tableChartProperties[3],
    "wip" : tableChartProperties[4],
    "flowdays" : tableChartProperties[5],
    "gates" : tableGates
  };
  return chartDBObject;
}

/*
* Controller function for retrieving all saved charts from the database and passing them
* to be displayed in the charts window for selection
*/
function displaySavedTableCharts(){
  var chartsObj = getAllTableChartObjects();
  displayListOfTableCharts(chartsObj);
}

/*
* Retrieves all saved charts from the database.
*/
function getAllTableChartObjects(){
  itemDB.open("TableChartDatabase", 1, "tablechartDatastore", "", tablechartIndexes, true, function(){
    itemDB.fetchAll("tablechartDatastore", function(results){
      displayListOfTableCharts(results);
    });
  });
}

/*
* Sends a chart object to the database to be saved.
* Parameters:
* chartDBObject - object containing all the relevant properties of the chart to be saved
*/
function sendTableChartToDB(chartDBObject){
  itemDB.open("TableChartDatabase", 1, "tablechartDatastore", "", tablechartIndexes, true, function(){
    itemDB.createItem("tablechartDatastore", chartDBObject, function(){});
  });
}

/*
* Gets a chart from the database with the given id and sends it to machineTable.js to be
* generated and displayed.
* Parameters:
* id - the id of the chart stored in the database
*/
function buildTableChartFromDatabase(id){
  itemDB.open("TableChartDatabase", 1, "tablechartDatastore", "", tablechartIndexes, true, function(){
    itemDB.fetchOneByKey("tablechartDatastore", id, function(result){
      $("#table_chart_choice").addClass("hidden_toggle");
      $("#table_chart_define").addClass("hidden_toggle");
      $("#tablechart_gate_values").addClass("hidden_toggle");
      $("#gate_chart").removeClass("hidden_toggle");
      showGateTableChart(result);
    });
  });
}

/*
* Called with the back button when displaying a chart, refreshes the chart list and
* displays the list.
*/
function returnToTableChartList(){
  $("#gate_chart").addClass("hidden_toggle");
  $("#table_chart_choice").removeClass("hidden_toggle");
  document.getElementById("saved_table_charts").innerHTML = "";
  clearAllTableInputTextFields();
  getAllTableChartObjects();
}

/*
* Deletes a chart from the database when the delete button is pressed on the list.
* Parameters:
* id - the id of the chart stored in the database
*/
function deleteTableChartFromDatabase(id){
  itemDB.deleteItem("tablechartDatastore", id, function(){
    document.getElementById("saved_table_charts").innerHTML = "";
    itemDB.fetchAll("tablechartDatastore", function(results){
      displayListOfTableCharts(results);
    });
  });
}

/*
* Displays the list of charts received in the first window of the charts page
* Parameters:
* charts - collection of chart objects to be displayed in a list
*/
function displayListOfTableCharts(charts){
  console.log(JSON.stringify(charts));

  charts.forEach((chart) =>{
    $('<div>', {
      class: "row collapseGroup",
      style: "background-color:#eeeeee;"
    }).append( $('<div>', {
      class: "tableChartItem col s11 collapsible-header",
      text: chart.name,
      id: chart.id
    })).append( $('<div>', {
      class: "tableDeleteButton col s1 headerCollapsible",
      style: "padding:0",
    }).append( $('<img>', {
      src: "css/svg/trash.svg",
      id: chart.id,
      style: "vertical-align:middle; width: 20px; height: 20px;"
    }))).appendTo('#saved_table_charts');
  });
}

/**
* Builds the event listener for the list items. Makes them clickable
*/
function createTableChartsListEventListener(){

  var el = document.getElementById("saved_table_charts");
  if(el){
    el.addEventListener("click", function(e) {
      console.log(e.path[0]);
      if(e.target && e.target.classList[0] == "tableChartItem") {
        var strId = e.target.id;
        var numId = parseInt(strId);
        buildTableChartFromDatabase(numId);
      }
      else if(e.target && e.target.nodeName == "IMG"){
        var strId = e.target.id;
        var numId = parseInt(strId);
        deleteTableChartFromDatabase(numId);
      }
    });
  }
}

function buildExampleTableChart(){
  if(!builtExampleTableChart){
  exampleGates = [{
    title : "Init Inv",
    wip : "1.3",
    flowdays: "1"
  },{
    title : "Classify",
    wip : "7.9",
    flowdays: "6"
  },{
    title : "Inv",
    wip : "6.6",
    flowdays: "5"
  },{
    title : "Report",
    wip : "6.6",
    flowdays: "5"
  },{
    title : "Rel of Rep",
    wip : "6.6",
    flowdays: "5"
  }];

  let chartDBObject = {
    "name" : "Gated Machine Example #2",
    "wip" : "29",
    "availDays": "365",
    "flowdays" : "22",
    "reqOutput" : "480",
    "takt" : ".76",
    "gates" : exampleGates
  }

  builtExampleTableChart = true;
  sendTableChartToDB(chartDBObject);
}
}
