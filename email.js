let emailBody = '<#DOCTYPE html><html><head><meta charset="UTF-8"/></head>' +
                '<body><header><div style="background-color: blue; height: 150; width: 80%"></div></header>' +
                '<table style="width=80%"><tr><th>Firstname</th><th>Lastname</th><th>Age</th></tr>' +
                "<tr><td>Jill</td><td>Smith</td><td>50</td></tr>" +
                "<tr><td>Eve</td><td>Jackson</td><td>94</td></tr></table>" +
                "<footer><ul><li>1</li><li>2</li>" +
                "<li>3</li><li>4</li></ul></footer></body></html>";

let emailAddress = "todd.poulson@us.af.mil";
let subject = "Test Email Proof of Concept";
let openEmail = document.getElementById("openEmail");
//let body = '<!DOCTYPE html><html>' + document.getElementsByTagName('html').innerHTML + "</html>";
//console.log(body);

openEmail.onsubmit = () => {
  window.open('mailto:' + emailAddress + '?subject=' + subject + '&body=' + emailBody);

  return false;
};
