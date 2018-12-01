const databaseName = "Calculations";
const datastoreName = "calculations";
const version = 1;
const properties = ["name", "cType", "wip", "throughput", "flowtime", "takt", "thrTimeType", "flowTimeType", "taktTimeType", "group"];
const groupPropertyName = "group";

/**
* Calls the database that stores all of the calculations saved by the client
* and creates a list of records.
*/
function notesFetchAllCalcGroups(){
  itemDB.open(databaseName, version, datastoreName, "", properties, true, function() {
    itemDB.fetchAll(datastoreName, function(myRecords){
      buildCalcGroups(myRecords, groupPropertyName);
    });
  });
}

/**
* Sorts the collection using the given property.
* This builds a 2d array sorted by the property.
* Parameters:
* collection - group of records from the database.
* property - the property we wish to categorize by.
*/
function buildCalcGroups(collection, property){
  var i = 0, val, index,
  values = [], result = [];
  for (; i < collection.length; i++) {
    val = collection[i][property];
    index = values.indexOf(val);
    if (index > -1)
    result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }
  displayCalcGroups(result);
}

/**
* Creates a string containing the formula built using the given record
* Parameters:
* record - a single record we use to create the formula with using its properties.
*/
function buildCalcFormula(record){
  var str = "";
  switch(record.cType){
    case("wip_w_thruput"):
    str = record.wip + " (W) = " + record.throughput + " (Thr) X " + record.flowtime + " (Flow)";
    break;
    case("wip_w_takt"):
    str = record.wip + " (W) = " + record.takt + " (Takt) X " + record.flowtime + " (Flow)";
    break;
    case("throughput"):
    str = record.flowtime + " (Flow) = " + record.wip + " (W) / " + record.throughput + " (Thr)";
    break;
    case("flowtime_w_thruput"):
    str = record.flowtime + " (Flow) = " + record.wip + " (W) / " + record.throughput + " (Thr)";
    break;
    case("flowtime_w_takt"):
    str = record.flowtime + " (Flow) = " + record.wip + " (W) X " + record.takt + " (Takt)";
    break;
    case("takt"):
    str = record.takt + " (Takt) = " + record.flowtime + " (Flow) / " + record.wip + " (W)";
    break;
  }
  return str;
}

/**
* Runs through a list of records and displays the calculations
* on the html page using Jquery
* Parameters:
* records - collection of categorized records to display
*/
function displayCalcGroups(records){
  document.getElementById("savedCalculations").innerHTML = "";
  if(records[0] != null){
    document.getElementById("calculationsBlurb").style.display = "none";
  }
  else{
    document.getElementById("calculationsBlurb").style.display = "block";
  }
  console.log(JSON.stringify(records));
  var rowCount = 0;
  var colCount = 0;
  var groupID = "";
  for(var i = 0; i < records.length; i++){
    if(records[i][0].group === ""){
      groupID = "No Group"
    }
    else{
      groupID = records[i][0].group;
    }

    $('<div>', {							//<div class="row collapseGroup">
    class: "row collapseGroup"
  }).append( $('<ul>', {				//<ul class="collapsible " style="background-color:#eeeeee;">
  class: "collapsible ",
  style: "background-color:#eeeeee;"
}).append( $('<li>', {        //<li>
  id: i
}).append( $('<div>', {				//<div id="groupA" class="col s10 collapsible-header"><b>All</b></div>
id: "group" + i,
class: "col s10 collapsible-header",
text: groupID
})).append( $('<div>', {			//<div class="col s1 headerCollapsible" style="padding:0">				</div>
class: "col s1 headerCollapsible",
style: "padding:0"
}).append( $('<img>', {				//<img src="css/svg/mail.svg" height="20px" width="20px" style="vertical-align:middle;">
src: "css/svg/mail.svg",
id: "mailImg",
style: "vertical-align:middle; width: 20px; height: 20px;",
onclick: "createCalculationsEmail();"
}))).append( $('<div>', {			//<div class="col s1 headerCollapsible" style="padding:0">			</div>
class: "col s1 headerCollapsible",
style: "padding:0"
}).append( $('<img>', {				//<img src="css/svg/trash.svg" height="20px" width="20px" style="vertical-align:middle;">
src: "css/svg/trash.svg",
id: "trashImg",
style: "vertical-align:middle; width: 20px; height: 20px;",
onclick: "removeGroup(" + i + ")"
}))).append( $('<div>', {			//<div class="col 12 collapsible-body collapseBody">
class: "col 12 collapsible-body collapseBody"
}).append( $('<ul>', {				//<ul id="groupName"></ul>
id: groupID
}))))).appendTo('#savedCalculations');
$('.collapsible').collapsible();
for(var j = 0; j < records[i].length; j++){
  createCalcListElement(records[i][j], groupID);
}
}

}

function createCalculationsEmail(groupId) {
  let mailString = "mailto:";

  getUserInfo( (info) => {
    if (info != null && (info.primaryEmail != null && info.secondaryEmail != null)) {
      setP2ToS2To( (emails) => {
        mailString += emails;

        console.log(mailString);

        itemDB.fetchAllByQuery(datastoreName, groupPropertyName, groupId, (results) => {
          mailString += setSubjectCalc(results[0]);
          mailString += "&body=" + results[0].group + " Calculations: %0D%0A";
          results.forEach( (result) => {
            mailString += buildCalcFormula(result) + '%0D%0A';
          });

          window.open(mailString);
        });
      });
    }
  });

}

function removeGroup(groupID){
  var groupStringId = "#group" + groupID;
  var groupText = $(groupStringId).text();
  var groupProperty = ""
  if(groupText != "No Group"){
    groupProperty = groupText;
  }
  itemDB.deleteWithoutKey(databaseName, datastoreName, "group", groupProperty, function(){
    notesFetchAllCalcGroups();
  })
}

/**
* Creates a single list element containing the calculation for a specific
* calculation group.
* Parameters:
* record - a single record we wish to put into a list item
* ulID - identifies which group we want to append the list item to
*/
function createCalcListElement(record, ulID){
  var ul = document.getElementById(ulID);
  //var candidate = document.getElementById("candidate");
  var li = document.createElement("li");
  //li.setAttribute('id',candidate.value);
  var formula = buildCalcFormula(record);
  li.appendChild(document.createTextNode(record.name+ "     " + formula));
  ul.appendChild(li);
}

/**
* Builds the event listener for the list items. Makes them clickable
*/
function createCalcResultsEventListener(){
  var el = document.getElementById("calculations");
  if(el){
    el.addEventListener("click", function(e) {
      //console.log(e.path[0]);
      if(e.target && e.target.nodeName == "LI") {
        console.log(e.target.id + " was clicked");
      }
      else if(e.target && e.target.nodeName == "IMG"){
        console.log("image was clicked");
      }
    });
  }
}

function displayAlert(groupID){
  alert(groupID + " has clickoff!");
}
