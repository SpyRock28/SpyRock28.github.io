// const scoreDBName = "QuizScores";
// const scoreDSName = "quizScores";
// const scoreVersion = 1;
// const scoreIndecies = ["Subject", "Topic", "TotalPossible", "ActualScore"];

function openScoresDB() {
  itemDB.open(scoreDBName, scoreVersion, scoreDSName, "Subject", scoreIndecies, false, () => {
    console.log(scoreDBName + " database opened...");
  });
}

function getAllScores(callback) {
  itemDB.fetchAll(scoreDSName, callback);
}

function deleteScore(id) {
  itemDB.deleteWithoutKey("", scoreDSName, "Subject", id, (e) => {
    console.log("Deleted Score item '" + id + "'");
    //refresh the display of activityStatus.
    displayScoresInBinder();
  });
}

function displayScoresInBinder() {
  document.getElementById("savedScores").innerHTML = "";

  getAllScores( (results) => {
    if (results.length === 0) {
      document.getElementById("activityBlurb").style.display = "block";
    } else {
      document.getElementById("activityBlurb").style.display = "none";
    }
    let listCounter = 0;

    results.forEach( (score) => {

      $('<div>', {							//<div class="row collapseGroup">
      class: "row collapseGroup"
    }).append( $('<ul>', {				//<ul class="collapsible " style="background-color:#eeeeee;">
    class: "collapsible ",
    style: "background-color:#eeeeee;"
  }).append( $('<li>', {        //<li>
    id: score.id
  }).append( $('<div>', {				//<div id="groupA" class="col s10 collapsible-header"><b>All</b></div>
  id: score.Subject,
  class: "col s10 collapsible-header",
  text: score.Subject
  })).append( $('<div>', {			//<div class="col s1 headerCollapsible" style="padding:0">				</div>
  class: "col s1 headerCollapsible",
  style: "padding:0"
  }).append( $('<img>', {				//<img src="css/svg/mail.svg" height="20px" width="20px" style="vertical-align:middle;">
  src: "css/svg/mail.svg",
  id: "mailImg",
  style: "vertical-align:middle; width: 20px; height: 20px;",
  onclick: "createActivityEmail(\"" + score.Subject + "\", 0);"
  }))).append( $('<div>', {			//<div class="col s1 headerCollapsible" style="padding:0">			</div>
  class: "col s1 headerCollapsible",
  style: "padding:0"
  }).append( $('<img>', {				//<img src="css/svg/trash.svg" height="20px" width="20px" style="vertical-align:middle;">
  src: "css/svg/trash.svg",
  id: "trashImg",
  style: "vertical-align:middle; width: 20px; height: 20px;",
  onclick: "deleteScore(\"" + score.Subject + "\");"
  }))).append( $('<div>', {			//<div class="col 12 collapsible-body collapseBody">
  class: "col 12 collapsible-body collapseBody"
  }).append( $('<ul>', {				//<ul id="groupName"></ul>
  id: score.Topic + listCounter
}))))).appendTo('#savedScores');
  $('.collapsible').collapsible();
  let ul = document.getElementById(score.Topic + listCounter++);
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(displayPercentCorrect(score)));
  ul.appendChild(li);
  });
});
}

function createActivityEmail(id) {
  //setUpEmail();
  let mailString = "mailto:";
  //console.log(mailString);

  setP2ToS2To( (emails) => {
    //console.log(emails);
    mailString += emails;

    //console.log(mailString);
    itemDB.fetchOneByKey(scoreDSName, id, (result) => {
      mailString += setSubjectActivity(result);
      mailString += setBodyActivity(result);

      //console.log(mailString);
      window.location.href = mailString;
    });
  });
}
