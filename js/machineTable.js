var finishedChart = false;
var input;
var wipTableTdWidth;
//
// window.onload = function() {
//     getData();
//     buildTable();
// }

function showGateTableChart(chartObj){
  getTableChartData(chartObj);
  document.getElementById("table_chart_title").innerText = chartObj.name;

  buildTableChartTable();
}

function getTableChartData(chartObj) {
  var gateItem = [];
  var gateSet = [];
  chartObj.gates.forEach((gate) => {
    gateItem.push(gate.title);
    var nWip = parseFloat(gate.wip).toFixed(5);
    gateItem.push(parseFloat(nWip));
    var nFlow = parseFloat(gate.flowdays).toFixed(5);
    gateItem.push(parseFloat(nFlow));
    gateSet.push(gateItem);
    gateItem = [];
  });

  input = {
          availableDays : parseFloat(chartObj.availDays),
          requiredOutput: parseFloat(chartObj.reqOutput),
          tact: parseFloat(chartObj.takt),
          gates: gateSet
      };
    // input = {
    //         availableDays : 365,
    //         requiredOutput: 480,
    //         tact: .76,
    //         gates: [['Gate 1 (Init Inv)',1.3,1],
    //         ['Gate 2 (Classify)',7.9,6],
    //         ['Gate 3 (Inv)',6.6,5],
    //         ['Gate 4 (Report)',6.6,5],
    //         ['Gate 5 (Rel of Rep)',6.6,5]]
    //     };

    computeInputChanges();
}
function computeInputChanges() {
    // Find sums for wip and fd
    var totalWip = 0;
    var totalFd = 0;

    // Add first two static columns
    var headderRowValues = ['Available Days', 'Required Output'];
    var wipRowValues = [input.availableDays, input.requiredOutput];
    var fdRowValues = [null, null];

    // build full row data arrays
    for (let i = 0; i < input.gates.length; i++) {
        let columnHeadder = input.gates[i][0];
        let wip = input.gates[i][1];
        let fd = input.gates[i][2];
        totalWip += (wip ? wip : 0);
        totalFd += (fd ? fd : 0);

        headderRowValues.push(columnHeadder);
        wipRowValues.push(wip);
        fdRowValues.push(fd);
    }
    // remove erronious trailing math digits
    totalWip = Math.floor(totalWip*100)/100;
    totalFd = Math.floor(totalFd*100)/100;

    // Add total column
    headderRowValues.push('TOTALS');
    wipRowValues.push(totalWip);
    fdRowValues.push(totalFd);

    // Add static trailing column
    headderRowValues.push('');
    wipRowValues.push('WIP');
    fdRowValues.push('FD');

    // push row value arrays back onto input
    input.headderRowValues = headderRowValues;
    input.wipRowValues = wipRowValues;
    input.fdRowValues = fdRowValues;

    // 4 static rows (available days, required oputput, totals, and WIP/FD)
    wipTableTdWidth = 100/(4+input.gates.length);
    wipTableTdWidth = "" + wipTableTdWidth + "%";
}

function buildTableChartTable() {
    //document.getElementById("wipTableDetail").innerHTML = "";
    legendTable = document.getElementById("wipTableDetail");
    legendTable.innerHTML = "";

    // build header row
    let headderRow = document.createElement('tr');
    headderRow.style.height = '50px';

    // build wip row
    let wipRow = document.createElement('tr');
    wipRow.style.height = '50px';

    // build fd row
    let fdRow = document.createElement('tr');
    fdRow.style.height = '25px';

    appendTableTds(headderRow, input.headderRowValues, 'white');
    appendTableTds(wipRow, input.wipRowValues, 'Orange');
    appendTableTds(fdRow, input.fdRowValues, 'YellowGreen ');

    legendTable.appendChild(headderRow);
    legendTable.appendChild(wipRow);
    legendTable.appendChild(fdRow);
}

function appendTableTds(row, rowData, rowColor) {
    for (let c = 0; c < rowData.length; c++) {
        let tempTd = document.createElement('td');
        tempTd.style.width = wipTableTdWidth;
        if (rowData[c] != null)
        {
            tempTd.style.border = "1px solid black";
            tempTd.innerHTML = rowData[c];

            if (rowData[c] === 'WIP' || rowData[c] === 'FD')
            {
                tempTd.style.backgroundColor = 'white';
            }
            else
            {
                tempTd.style.backgroundColor = rowColor;
            }
        }
        else
        {
            // transparent
        }

        row.appendChild(tempTd);
    }
}
