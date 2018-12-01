var finishedChart = false;
var barChartInput= {chartTitle:'',
xAxisCategories:[''],
yAxisTitle: '',
remainingDays:[0],
actualDays:[0],
requirement:0,
last5Avg:[0]};


function showGateBarChart(chartObj) {
  //alert('show chart button clicked');
  $("#barchart_status_msg").removeClass("hidden_toggle");
  getBarChartData(chartObj);
  onReady(function() {
    show('barchart_container', true);
    show('barchart_containerData', true);
    show('barchart_loading', false);
  });
  buildBarChartTable();
}


function getBarChartData(chartObj) {
  console.log("inside getBarChartData");
  var gateTitles = [];
  var gateRem = [];
  var gateAct = [];
  var gateAvg = [];
  chartObj.gates.forEach((gate) => {
    gateTitles.push(gate.title);
    gateRem.push(Number(gate.remDays));
    gateAct.push(Number(gate.actDays));
    gateAvg.push(Number(gate.avgDays));
  });


  barChartInput = {
    chartTitle : chartObj.name,
    xAxisCategories : gateTitles,
    yAxisTitle : '',
    remainingDays : gateRem,
    actualDays : gateAct,
    requirement : chartObj.numReq,
    last5Avg : gateAvg
    // chartTitle : chartObj.name,
    // xAxisCategories : [ '62-3507', '63-7982', '61-0309', '60-0322', '60-0316', '58-0057', '62-3514', '60-0351', '62-3566' ],
    // yAxisTitle : '',
    // remainingDays : [ 0, 0, 0, 0, 0, 15, 27, 40, 50 ],
    // actualDays : [ 76, 65, 63, 51, 47, 40, 28, 15, 5 ],
    // requirement : 45,
    // last5Avg : [ 60.8, 64.4, 62.8, 61.8, 60.4, null, null, null, null ]
  };



  if (Array.isArray(barChartInput.requirement) === false) {
    var requirement = barChartInput.requirement;
    var extrapolatedRequirement = [];
    for (let i = 0; i < barChartInput.xAxisCategories.length; i++) {
      extrapolatedRequirement.push(Number(requirement));
    }
    barChartInput.requirement = extrapolatedRequirement;
  }

  var totalDays = [];
  for (let i = 0; i < barChartInput.xAxisCategories.length; i++) {
    totalDays.push(barChartInput.actualDays[i] + barChartInput.remainingDays[i]);
  }
  barChartInput.totalDays = totalDays;

}

function buildBarChartTable() {
  document.createElement('table');
  var rowLegend = [ null, "Remaining Days", "Actual Days", "Total Days", "Last 5 Avg.", "Requirement" ];
  var rowValues = [ barChartInput.xAxisCategories, barChartInput.remainingDays, barChartInput.actualDays, barChartInput.totalDays, barChartInput.last5Avg, barChartInput.requirement ];


  legendTable = document.getElementById("barchart_legendTable");
  legendTable.innerHTML = "";

  for (let r = 0; r < rowLegend.length; r++) {
    let row;
    if (r == 0) {
      row = document.createElement('tr')
      row.style.height = '50px';
    } else {
      row = document.createElement('tr')
      row.style.height = '25px';
    }

    appendBarTds(row, rowLegend[r], rowValues[r], r);

    legendTable.appendChild(row);
  }

  for (let i = 0; i < barChartInput.xAxisCategories.length; i++) {
    document.createElement('td');
  }
}

function appendBarTds(row, rowLabel, rowData, index) {
  /*var style = {
  border : "1px solid black"
};*/

let rowLabelDetail = document.createElement('td');
rowLabelDetail.style.width = "19%"
if (rowLabel) {
  var innerHtmlString;
  if (index === 1) {
    innerHtmlString = "<table><tr><td><div style='vertical-align:center; margin:2px; height:10px; width: 40px; background-color:DarkTurquoise'></div></td><td><div>" + rowLabel + "</div></td></tr></table>"
  } else if (index === 2) {
    innerHtmlString = "<table><tr><td><div style='vertical-align:center; margin:2px; height:10px; width: 40px; background-color:SteelBlue'></div></td><td><div>" + rowLabel + "</div></td></tr></table>"
  } else if (index === 3) {
    innerHtmlString = "<table><tr><td><div style='vertical-align:center; margin:2px; height:5px; width: 40px; background-color:white'></div></td><td><div>" + rowLabel + "</div></td></tr></table>"
  } else if (index === 4) {
    innerHtmlString = "<table><tr><td><div style='vertical-align:center; margin:2px; height:5px; width: 40px; background-color:red'></div></td><td><div>" + rowLabel + "</div></td></tr></table>"
  } else if (index === 5) {
    innerHtmlString = "<table><tr><td><div style='vertical-align:center; margin:2px; height:5px; width: 40px; background-color:green'></div></td><td><div>" + rowLabel + "</div></td></tr></table>"
  }
  rowLabelDetail.innerHTML = innerHtmlString;
  rowLabelDetail.style.border = "1px solid black";
}
row.appendChild(rowLabelDetail);

for (let c = 0; c < barChartInput.xAxisCategories.length; c++) {
  let tempTd = document.createElement('td');
  tempTd.style.border = "1px solid black";
  tempTd.innerHTML = rowData[c];
  row.appendChild(tempTd);
}
}


function onReady(callback) {
  var buildstarted = false;

  var intervalID = window.setInterval(checkReady, 1000);
  function checkReady() {
    if (!buildstarted) {
      buildstarted = true;
      // alert('about to start');
      buildBarCharts(finishedChart);
    }

    window.clearInterval(intervalID);
    callback.call(this);
  }
}

function show(id, value) {
  document.getElementById(id).style.visibility = value ? 'visible' : 'hidden';
}


function buildBarCharts(finishedChart) {

  Highcharts.chart('barchart_containerChart', {
    title : {
      text : barChartInput.chartTitle
    },
    xAxis : {
      tickLength : 0,
      labels : {
        enabled : false
      },
      categories : barChartInput.xAxisCategories
    },
    yAxis : {
      min : 0,
      title : {
        text : barChartInput.yAxisTitle
      }
    },
    legend : {
      enabled : false
    },
    plotOptions : {
      column : {
        stacking : 'normal'
      }
    },
    series : [ {
      type : 'column',
      name : 'Remaining Days',
      data : barChartInput.remainingDays,
      color : 'DarkTurquoise'
    }, {
      type : 'column',
      name : 'Actual Days',
      data : barChartInput.actualDays,
      color : 'SteelBlue'
    }, {
      type : 'line',
      name : 'Requirement',
      data : barChartInput.requirement,
      color : 'Green',
      lineWidth : 3,
      marker : {
        enabled : false
      }
    }, {
      type : 'line',
      name : 'Last 5 Avg.',
      data : barChartInput.last5Avg,
      color : 'Red',
      lineWidth : 3,
      marker : {
        enabled : false
      }
    } ]
  });

  document.getElementById("barchart_tableLegend");
  finishedChart = true;
}
