
function setUpEmail() {
  // open up the userInformation DB.
  openUserInfoDB();
  // open up the calculator DB.
  openCalculationsDB();
  // open up the activity DB.
  openScoresDB();
}

function setP2ToS2To(callback) {
  getUserInfo( (info) => {
    //console.log(JSON.stringify(info));
    if (info == undefined || info.primaryEmail == "")
      alert("ERROR: No email address defined!");

    let pEmail = info.primaryEmail;
    let sEmail = info.secondaryEmail;

    callback(pEmail + ";" + sEmail);
  });
}

function setP2ToS2CC() {
  let pEmail = getPrimaryEmail();
  let sEmail = getSecondaryEmail();

  return pEmail + "?cc=" + sEmail;
}

function setP2CCS2To() {
  let pEmail = getPrimaryEmail();
  let sEmail = getSecondaryEmail();

  return sEmail + "?cc=" + pEmail;
}

function setP2CCS2CC() {
  let pEmail = getPrimaryEmail();
  let sEmail = getSecondaryEmail();

  return "?cc=" + pEmail + ";" + sEmail;
}

function setSubjectCalc(calc) {

  // return the string name of the group with mailto specifics.
  return "?subject=" + calc.group + " Calculations";
}

function setSubjectActivity(score) {
  // set the email subject to the activity name.

  return "?subject=Score of Activity: " + score.Subject + " - " + score.Topic;
}

function setBodyActivity(score) {
  // add the records of the activity to the email body.
  let body = "&body=";
  body += score.Subject + " - " + score.Topic + ": " + displayPercentCorrect(score);
  body += "\n";
  return body;
}
