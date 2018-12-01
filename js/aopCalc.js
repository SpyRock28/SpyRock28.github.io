 const time_units = ["Second","Minute","Hour","Day","Week","Month","Quarter","Year"];

 const unitSecondsMap = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
  days: 86400,
  weeks: 604800,
  months: 2628000,
  quarters: 7884000,
  years: 31536000
};

selected_time_1 = "";
selected_time_2 = "";

/* Calculation DB Structure
* databaseName - string name of the database
* datastoreName - string name of the datastores
* version - version of the database, must be integer value
* properties - all attributes for a Calculation DB objectStore
* [  name - User generated name of the calculations
*    cType - Type of calculation (WIP, Thruput, Flow, Takt)
*    wip - WIP calculated number
*    throughput - throughput calculated number
*    flowtime - flowtime calculated number
*    takt - takt calculated positionNumber
*    thrTimeType - throughput time type selected
*    flowTimeType - flowtime time type selected
*    taktTimeType - takt time type selected
*    group - Group type for the calculation ]
*/
databaseName = "Calculations";
databaseStore = "calculations"
version = 1;
properties = ["name", "cType", "wip", "throughput", "flowtime", "takt", "thrTimeType", "flowTimeType", "taktTimeType", "group"];


 const wip_txt = "WIP";
 const flowtime_txt = "Flowtime";
 const thruput_txt = "Throughput";
 const takt_txt = "Takt Time";

 const wip_tip = "Amount of units in the process machine.";
 const flowtime_tip = "Time from start to finish\nfor unit to exit process machine.";
 const thruput_tip = "Amount of units per time interval.\n\nClick THROUGHPUT OR TAKT TIME GUIDE\nfor calculation assistance.";
 const takt_tip = "Time for single unit to exit process machine.";



 const opr1 = " X ";
 const opr2 = " / ";
 const units_type = "units";
 const empty_str = "";

 wip_w_thruput = {"lbl0":wip_txt,"lbl1":flowtime_txt,"lbl2":thruput_txt,"opr":opr1,"val1tip":flowtime_tip,"val2tip":thruput_tip,"res_typ":units_type};
 wip_w_takt = {"lbl0":wip_txt,"lbl1":flowtime_txt,"lbl2":takt_txt,"opr":opr1,"val1tip":flowtime_tip,"val2tip":takt_tip,"res_typ":units_type};
 flowtime_w_thruput = {"lbl0":flowtime_txt,"lbl1":wip_txt,"lbl2":thruput_txt,"opr":opr2,"val1tip":wip_tip,"val2tip":thruput_tip,"res_typ":empty_str};
 flowtime_w_takt = {"lbl0":flowtime_txt,"lbl1":wip_txt,"lbl2":takt_txt,"opr":opr1,"val1tip":wip_tip,"val2tip":takt_tip,"res_typ":empty_str};
 thruput = {"lbl0":thruput_txt,"lbl1":wip_txt,"lbl2":flowtime_txt,"opr":opr2,"val1tip":wip_tip,"val2tip":flowtime_tip,"res_typ":units_type};
 takt = {"lbl0":takt_txt,"lbl1":flowtime_txt,"lbl2":wip_txt,"opr":opr2,"val1tip":flowtime_tip,"val2tip":wip_tip,"res_typ":empty_str};


 const calc1 = function (v1,v2) {return v1 * v2};
 const calc2 = function (v1,v2) {if(v2==0) {return 0} else {return v1 / v2}};

 const wipCalc = function (value, time) {
  let valueUnits = time_type2_val;
  let timeUnit = time_type1_val;
  let timeSeconds = calc1(unitSecondsMap[timeUnit],time);//unitSecondsMap[timeUnit] * time;
  let rateInSeconds;
  //alert(calcObj.lbl2);
  /*if (calcObj.lbl2 === takt_txt) {
    rateInSeconds = calc2(unitSecondsMap[valueUnits],value);
    alert(takt_txt + ' rateinsecs ' + rateInSeconds);
  } else {
    // Throughput
    rateInSeconds = calc2(value,unitSecondsMap[valueUnits]);
  } */
  rateInSeconds = calc2(value,unitSecondsMap[valueUnits]);
  let wip = calc1(rateInSeconds,timeSeconds);//rateInSeconds * timeSeconds;
  return round(wip);
}

 wip_w_thruput.calculate = wipCalc;
 wip_w_takt.calculate = wipCalc;
 thruput.calculate = calc2;
 flowtime_w_thruput.calculate = calc2;
 flowtime_w_takt.calculate = calc1;
 takt.calculate = calc2;

 calcObj = wip_w_thruput;

 var takt_time_val = 0;
 var thruput_val = 0;
 var time_type1_val;
 var time_type2_val;
 var isRounded = false;
 var enableCalc = false;

 let precision = 1000;

 function setPrecision() {
   getUserInfo( (info) => {
     if (info != null) {
       switch (info.decimalPrecision) {
         case "precision0":
         precision = 1;
         break;
         case "precision1":
         precision = 10;
         break;
         case "precision2":
         precision = 100;
         break;
         case "precision3":
         default:
         precision = 1000;
         break;
       }
     } else {
       precision = 1000;
     }
     console.log("Rounding Precision set to: " + precision);
   });
 }

 function roundScientific(value) {
  let numArray = value.toString().split("e");

  let numberToRound = Number(numArray[0]);

  let numberToReturn = Math.round(numberToRound * precision) / precision;

  return numberToReturn + "e" + numArray[1];
}

 function round(value) {
  if (value === 0) {
    isRounded = true;
  return 0;
  }
  if (value.toString().includes("e")) {
    // raw scientific  value rounding
    isRounded = true;
    return roundScientific(value);
  } else if (value.toString().length > 10) {
    if (value.toString().split(".")[0].length > 7) {
      //pre decimal rounding
      isRounded = true;
    return roundScientific(value.toExponential());
    } else {
      //post decimal rounding
      isRounded = true;
    return Math.round(value * precision) / precision;
    }
  } else {
    // Small (non scientific) values under total length 10
    isRounded = true;
  return value;
  }
}


function onTabToggle(tab) {
  if(tab == "c" && $("#tab_tt").hasClass("active")) {
    $("#tab_tt").removeClass("active");
    $("#tab_calc").addClass("active");
  $("#calc_sect").removeClass("hidden_toggle");
  $("#takt_sect").addClass("hidden_toggle");
  //alert("calculate " + tab);
  } else
  if(tab == "t" && $("#tab_calc").hasClass("active")) {
    $("#tab_calc").removeClass("active");
    $("#tab_tt").addClass("active");
  $("#takt_sect").removeClass("hidden_toggle");
  $("#calc_sect").addClass("hidden_toggle");
    //alert("thru-takt" + tab);
  }
}

/*  function valInputted() {
   this.onkeydown = null;
   //var inVal = event.target.id;
   //alert($("#" + event.target.id).text());
   alert('hi');
  //event.preventDefault();
 } */

 function setFocus() {
  $("#inpt_val1").focus();
  // $("#inpt_val1").select();
 }

 /* function setFocusTab2() {
  $("#inpt_ttk").focus();
   $("#inpt_ttk").select();
 } */

 function setTimeTypeFromWiz(val,isT,isToggle){
   if(!$("#timetype2").hasClass("hidden_toggle")) {
     $("#inpt_val2").val(val);
     if(isT) {
       //calcObj = calcObj.lbl0 == wip_txt ? wip_w_thruput : flowtime_w_thruput;
       if(calcObj.lbl0 == wip_txt) {
          calcObj = wip_w_thruput;
       } else {
          calcObj = flowtime_w_thruput;
          calcObj.res_typ = $("#seltime2").val();
       }
       setTimeOptions("seltime2","Units Per ","");
     } else {
       //calcObj = calcObj.lbl0 == wip_txt ? wip_w_takt : flowtime_w_takt;
       if(calcObj.lbl0 == wip_txt) {
          calcObj = wip_w_takt;
       } else {
          calcObj = flowtime_w_takt;
          calcObj.res_typ = $("#seltime2").val();
       }
       setTimeOptions("seltime2","","s");
     }
  // $('#seltime1 option')[$("#sel_tt_time option:selected").index()].selected = true;
    if(isToggle) {
      time_type2_val = $("#seltime2").val();
    }
    else {
      time_type2_val = $("#sel_tt_time").val();
     $('#seltime2').val(time_type2_val);
    }
   } /* else {
     $("#inpt_val1").val(val);
     if(isT) {
       calcObj = flowtime_w_thruput;
       setTimeOptions("seltime1","Units Per ","");
     } else {
       calcObj = flowtime_w_takt;
       setTimeOptions("seltime1","","s");
     }
   //$('#seltime2 option')[$("#sel_tt_time option:selected").index()].selected = true;
     time_type2_val = $("#sel_tt_time").val();
     $('#seltime1').val(time_type1_val);
   } */
 }

 function toggleReciprocal() {
    recipVal = round(calc2(1,$("#inpt_val2").val()));
    if(calcObj.lbl2 == thruput_txt) {
      takt_time_val = recipVal;
      taktClicked(true);
    } else {
      thruput_val = recipVal;
      thruputClicked(true);
    }
  }

 function thruputClicked(isToggle) {
   if(thruput_val != 0 || isToggle) {
      setTimeTypeFromWiz(thruput_val,true,isToggle);
    setTTCalcHTML();
    //alert('about to use thruput and switch');
    $("#calc_sect").removeClass("hidden_toggle");
      $("#takt_sect").addClass("hidden_toggle");
    $("#tab_tt").removeClass("active");
      $("#tab_calc").addClass("active");
   }
 }

 function taktClicked(isToggle) {
   //alert('takt clicked');
   if(takt_time_val != 0 || isToggle) {
   setTimeTypeFromWiz(takt_time_val,false,isToggle);
   setTTCalcHTML();
   // alert('about to use takt and switch');
   $("#tab_tt").removeClass("active");
     $("#tab_calc").addClass("active");
   $("#calc_sect").removeClass("hidden_toggle");
     $("#takt_sect").addClass("hidden_toggle");
   }
 }

 function refreshTHelp() {
   let tt_type = $("#sel_tt_time option:selected" ).val();
   let tt_type_txt = $("#sel_tt_time option:selected" ).text();
   let tt_time = $("#inpt_time").val();
   let tt_val = $("#inpt_ttk").val();

   $(".tt_unit_val").text(tt_val);
   $(".tt_time").text(tt_time);

   if(tt_type_txt != "Select") {
     $(".tt_time_typ").text(tt_type);
   $("#tp_time_typ").text(tt_type.slice(0,tt_type.length - 1));
   }
   thruput_val = round(calc2(tt_val,tt_time));
   takt_time_val = round(calc2(tt_time,tt_val));
   $("#tp_result").text(thruput_val + " unit(s) per ");
   $("#tt_result").text(takt_time_val );
 }

 function toggleCalcBtnColor() {
   alert('calling button toggle color');
   $('#btn_calc').prop('disabled', true).addClass('disabled');
   /*if(enableCalc) {
     //$("#btn_calc").removeClass("disabled");
   //$("#btn_calc").addClass("blue darken-1");
   alert('disable button');
   $('#btn_calc').prop('disabled', false).removeClass('disabled');

   } else {
  // $("#btn_calc").removeClass("blue darken-1");
   //$("#btn_calc").addClass("disabled");
    alert('enable button');
   $('#btn_calc').prop('disabled', true).addClass('disabled');
   } */
 }

 function checkTimeTypes() {
   if(($("#seltime1 option:selected").hasClass("hidden_toggle") && $("#seltime1 option:selected").index() != 0) || (!$("#seltime1 option:selected").hasClass("hidden_toggle")) &&
      ($("#seltime2 option:selected").hasClass("hidden_toggle") && $("#seltime2 option:selected").index() != 0) || (!$("#seltime2 option:selected").hasClass("hidden_toggle"))) {
    enableCalc = true;
   // $("btn_calc").css("background-color", "#BCBCBC");
   } else {
      enableCalc = false;
   // $("btn_calc").css("background-color", "#008EFF");
   }
   //toggleCalcBtnColor();
 }

 function timeType1Change() {
   time_type1_val = $("#seltime1 option:selected" ).val();
   if(calcObj.res_typ != units_type) {calcObj.res_typ = time_type1_val}
   checkTimeTypes();
 }

 function timeType2Change() {
   time_type2_val = $("#seltime2 option:selected" ).val();
   if(calcObj.res_typ != units_type) {calcObj.res_typ = time_type2_val}
   checkTimeTypes();
 }

 function clearVals() {
  $("#inpt_val1").val(0);
  $("#inpt_val2").val(0);
  $("#val1").text("0");
  $("#val2").text("0");
  $("#result").text("0");
  $("#result2").text("0");

  $("#sel_tt_time option:selected" ).val();
  $("#inpt_time").val(0);
  $("#inpt_ttk").val(0);
  $(".tt_unit_val").text("0");
  $(".tt_time").text("0");
  $(".tt_time_typ").text(empty_str);
  $("#tp_time_typ").text(empty_str);
  $("#tp_result").text("0");
  $("#tt_result").text("0");
  $("#result2units").text(empty_str);
  $('#seltime1 option')[0].selected = true;
  $('#seltime2 option')[0].selected = true;
  $('#sel_tt_time option')[0].selected = true;
  enableCalc = false;
  isRounded = false;
 // toggleCalcBtnColor();

  setFocus();
}

function resetChoice() {
 // toggleCalcBtnColor();
  clearVals();
  $("#value_choice").removeClass("hidden_toggle");
  $("#tab_sect").addClass("hidden_toggle");
  $("#calc_sect").addClass("hidden_toggle");
  $("#calc_ttl").addClass("hidden_toggle");
}

function setTimeOptions(selCtrl, preTxt, postText) {
  $("#" + selCtrl + " option").text(function(i,str){
    if(i>0) {
    return preTxt + time_units[i-1] + postText;
  } else {
    return "Select";
  }
  });

}

function setTTCalcHTML() {
  $("#lbl_val1").text(calcObj.lbl1);
  $("#lbl_val2").text(calcObj.lbl2);
  $("#eq_val1").text(calcObj.lbl1);
  $("#eq_result").text(calcObj.lbl0);
  if(calcObj.lbl2 == takt_txt) {
    $("#eq_recipr").removeClass("hidden_toggle");
    $("#eq_val2").text(thruput_txt);
  }
  else {
   $("#eq_recipr").addClass("hidden_toggle");
   $("#eq_val2").text(calcObj.lbl2);
  }
  $("#eq_opr").text(calcObj.opr);
  $("#opr_val").text(calcObj.opr);


  let anchorElementOne = $('#ttpone');
  anchorElementOne.attr('data-tooltip', calcObj.val1tip);
  anchorElementOne.tooltip();

  let anchorElementTwo = $('#ttptwo');
  anchorElementTwo.attr('data-tooltip', calcObj.val2tip);
  anchorElementTwo.tooltip();
}

function setCalcHTML() {
 clearVals();
 setTTCalcHTML();

 $("#lbl_ttl").text(calcObj.lbl0);

 if(calcObj.lbl1 == wip_txt) {
   $("#timetype1").addClass("hidden_toggle");
 } else
 if(calcObj.lbl1 == thruput_txt) {
   setTimeOptions("seltime1","Units Per ","");
 } else {
   setTimeOptions("seltime1","","s");
 }

 if(calcObj.lbl2 == wip_txt) {
   $("#timetype2").addClass("hidden_toggle");
 } else
 if(calcObj.lbl2 == thruput_txt) {
   setTimeOptions("seltime2","Units Per ","");
 } else {
   setTimeOptions("seltime2","","s");
 }

 $("#app_cont").css('background-color', '#e0e0e0');
 $("#app_cont").css('height','100%');
}

function calcResult() {
  if(enableCalc) {
    let val1 = $("#inpt_val1").val();
    let val2 = $("#inpt_val2").val();
    $("#val1").text(val1);
    $("#val2").text(val2);
    let calcResultVal = calcObj.calculate($("#inpt_val1").val(),$("#inpt_val2").val());
    if(!isRounded) {
      calcResultVal = round(calcResultVal);
    }
    $("#result").text(calcResultVal);
    $("#result2").text(calcResultVal);
    if(calcObj.lbl0 == thruput_txt) {
      $("#result2units").text(calcObj.res_typ + " per " + $("#seltime2").val());
    } else {
      $("#result2units").text(calcObj.res_typ);
    }
    
  }
  isRounded = false;
}

function buildCalcObj(name, group, calcObj){
  let calcDBObject = {
    "name" : name,
    "cType" : "",
    "wip" : "",
    "throughput" : "",
    "flowtime" : "",
    "takt" : "",
    "thrTimeType" : "",
    "flowTimeType" : "",
    "taktTimeType" : "",
    "group" : group
  };
  switch (calcObj) {
    case wip_w_thruput:
    calcDBObject.cType = "wip_w_thruput";
    calcDBObject.wip = $("#result").text();
    calcDBObject.throughput = $("#val1").text();
    calcDBObject.flowtime = $("#val2").text();
    calcDBObject.thrTimeType = time_type1_val;
    calcDBObject.flowTimeType = time_type2_val;
    break;
    case wip_w_takt:
    calcDBObject.cType = "wip_w_takt";
    calcDBObject.wip = $("#result").text();
    calcDBObject.takt = $("#val1").text();
    calcDBObject.flowtime = $("#val2").text();
    calcDBObject.thrTimeType = time_type1_val;
    calcDBObject.flowTimeType = time_type2_val;
    break;
    case thruput:
    calcDBObject.cType = "throughput";
    calcDBObject.throughput = $("#result").text();
    calcDBObject.flowtime = $("#val2").text();
    calcDBObject.wip = $("#val1").text();
    calcDBObject.flowTimeType = time_type2_val;
    break;
    case flowtime_w_thruput:
    calcDBObject.cType = "flowtime_w_thruput";
    calcDBObject.throughput = $("#val2").text();
    calcDBObject.flowtime = $("#result").text();
    calcDBObject.wip = $("#val1").text();
    calcDBObject.thrTimeType = time_type2_val;
    break;
    case flowtime_w_takt:
    calcDBObject.cType = "flowtime_w_takt";
    calcDBObject.takt = $("#val2").text();
    calcDBObject.flowtime = $("#result").text();
    calcDBObject.wip = $("#val1").text();
    calcDBObject.taktTimeType = time_type2_val;
    break;
    case takt:
    calcDBObject.cType = "takt";
    calcDBObject.takt = $("#result").text();
    calcDBObject.flowtime = $("#val1").text();
    calcDBObject.wip = $("#val2").text();
    calcDBObject.flowTimeType = time_type1_val;
    break;
  }
  return calcDBObject;
}

function openCalculationsDB(){
  itemDB.open(databaseName, version, databaseStore, "", properties, true, function() {});
}

function saveResults(){
  if(enableCalc && $("#fld_save_name").val()){
    var myName = $("#fld_save_name").val();
    var myGroup = $("#fld_save_group").val();
    myCalcDBObject = buildCalcObj(myName, myGroup, calcObj);
    itemDB.createItem(databaseStore, myCalcDBObject, function() {
      //console.log(myName + " calculation saved...");
    });
    //document.getElementById('btn_display_results').style.display="block";
  }
  $("#saveCalcButton").addClass("hidden_toggle");
  $("#save_sect").addClass("hidden_toggle");
  $("#openSaveButton").removeClass("hidden_toggle");
  
}

function openSave() {
  if(enableCalc) {
    $("#openSaveButton").addClass("hidden_toggle");
    $("#save_sect").removeClass("hidden_toggle");
    $("#saveCalcButton").removeClass("hidden_toggle");
  }
}

function setCalcType(cType) {
  $("#calc_sect").removeClass("hidden_toggle");
  $("#tab_sect").removeClass("hidden_toggle");
  $("#value_choice").addClass("hidden_toggle");
  $("#calc_ttl").removeClass("hidden_toggle");
  $("#timetype1").removeClass("hidden_toggle");
  $("#timetype2").removeClass("hidden_toggle");
  switch (cType) {
   case 1:
   calcObj = thruput;
   $("#tab_sect").addClass("hidden_toggle");
   break;
   case 2:
   calcObj = takt;
    $("#tab_sect").addClass("hidden_toggle");
   break;
   case 3:
   calcObj = flowtime_w_thruput;
   break;
   case 0:
   calcObj = wip_w_thruput;
 }
 openCalculationsDB();
 setCalcHTML();
}

/* $('.numb_input').on('change keyup', function() {
  // Remove invalid characters
  var sanitized = $(this).val().replace(/[^-.0-9]/g, '');
  // Remove non-leading minus signs
  sanitized = sanitized.replace(/(.)-+/g, '$1');
  // Remove the first point if there is more than one
  sanitized = sanitized.replace(/\.(?=.*\.)/g, '');
  // Update value
  $(this).val(sanitized);
}); */
