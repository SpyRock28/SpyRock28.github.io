const questionDBName = "quizEngineQuestions";
// const questionDSName = "questions";
const questionVersion = 4;
const datastores = ["leadershipDiagram", "littlesLaw", "radiatorChart", "criticalPath"];
const questionColumns = ["Subject", "Topic", "Question", "Answers", "CorrectAnswers", "Justifications"]; // TODO: test to see if you can access a question by 'id'

const scoreDBName = "QuizScores";
const scoreDSName = "quizScores";
const scoreVersion = 5;
const scoreIndecies = ["Subject", "Topic", "TotalPossible", "ActualScore"];

let submitButton, nextButton;
let score = {};
let questions = [];
let currentDatastore;

function openQuestionsNScores() {
	//Open connection to the quizEngineQuestions database and each of the datastores
	quizEngineDB.openDB(questionDBName, questionVersion, datastores, questionColumns, () => {
		console.log(questionDBName + " database opened...");

		//load questions into db
		for (index = 0; index < datastores.length; index++) {
			//console.log(index);
			quizEngineDB.fetchAll(datastores[index], index, (results, myIndex) => {
				if (results[0] == null) {
					//console.log(myIndex);

					// get questions from file.
					let questions = questionFunctionNames[myIndex]();

					//loop through questions to insert into database.
					questions.forEach((question) => {
						quizEngineDB.createItem(datastores[myIndex], question, () => {
							console.log("added question to " + datastores[myIndex]);
						});
					});
				}
			});
		}
	})

	//Open connection the the QuizScores database and its quizScores datastore, using Subject as the key_path
	itemDB.open(scoreDBName, scoreVersion, scoreDSName, "Subject", scoreIndecies, false, () => {
		console.log("QuizScores Database opened...");
	});
}


// NOT WORKING YET!!!
// function shuffle(array) {  // NOT WORKING YET!!!
//   var currentIndex = array.length, temporaryValue, randomIndex;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {

//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }

function readQuestions(datastoreName) {
	// grab all questions from selected quiz defined by the button
	currentDatastore = datastoreName;
	isEventListenersAdded = 0;
	getQuestions(datastoreName, createScore);
}

function createScore() {
	itemDB.fetchOneByIndex(scoreDSName, "Subject", questions[0].Subject, (result) => {
		//Grab score from db if exists
		if (result != null) {
			score = result;
			//If the quiz has already been finished, display the results div showing the score received
			if (score.currentQuestion == score.TotalPossible) {
				displayQuizResultsHTML();
			}
			else {
				createQuiz();
			}
		}
		//Create new score and add it to db
		else {
			score = {
				"Subject": questions[0].Subject,
				"Topic": questions[0].Topic,
				"TotalPossible": questions.length,
				"ActualScore": 0,
				"currentQuestion": 0
			};

			itemDB.createItem(scoreDSName, score, () => {
				createQuiz();
			});
		}


	});
}

function getQuestions(datastoreName, callback) {
	quizEngineDB.fetchAll(datastoreName, null, (results) => {
		//TODO: shuffle the results.
		questions = results;
		callback();
	});
}

function createQuiz() {
	displayQuizHTML();
	submitButton = document.getElementById("submitQuestionButton");
	nextButton = document.getElementById("nextButton");


	// display questions 1 at a time.
	document.getElementById("quizContainer").display = "block";
	// document.getElementById("quizSubject").innerHTML = score.Subject;
	document.getElementById("quizTopic").innerHTML = score.Subject;

	// display question as the title
	var currentQuestion = document.getElementById('quizQuestion');
	document.getElementById("finishQuiz").display = "none";

	//create form element
	var answerForm = document.getElementById("answerForm");

	// display quiz score status.
	// display the current status of the quiz
	document.getElementById("questionNumber").innerHTML = "1/" + questions.length;

	document.getElementById("currentScore").innerHTML = "Score: 0%";

	nextButton.disabled = true;

	//determine answers and update score.
	nextQuestion();
}

function radioButtonClicked() {
	submitButton.disabled = false;

	for (i = 1; i <= questions[score.currentQuestion].Answers.length; i++) {
		if (document.getElementById(i.toString()).checked == true) {

			document.getElementById("answer" + i).style.backgroundColor = "#0eabda";
			document.getElementById("answer" + i).style.transition = "backgroundColor 2s";
			//document.getElementById("answer"+i).setAttribute('class', 'answerBackground answerStyle');	
			document.getElementById("label" + i).style.color = "#FFF";
			/*document.getElementById("answer"+i).style.transition="background-position 5s";*/
		} else {
			//document.getElementById("answer"+i).setAttribute('class', 'answerStyle');
			document.getElementById("answer" + i).style.backgroundColor = "white";
			document.getElementById("label" + i).style.color = "Gray";
		}
	}
}

function checkIfNextQuestionNeeded() {
	if (score.currentQuestion < questions.length) {
		nextQuestion();
	}
	else {
		displayQuizResultsHTML();
	}
}


function nextQuestion() {
	//Check if we need to display the next or submit
	if (score.currentQuestion === questions.length - 1) {
		document.getElementById("nextButton").value = "Submit";
	}
	//Grab current question to show
	var question = questions[score.currentQuestion];
	var numQuestions = questions.length;
	//Put current question into html
	document.getElementById("justificationContainer").style.display = "none";
	document.getElementById("questionNumber").innerHTML = (score.currentQuestion + 1) + "/" + numQuestions;
	var quizQuestion = document.getElementById("quizQuestion");
	var questionText = document.createTextNode(question.Question);
	//console.log(questionText);
	quizQuestion.innerHTML = "";
	quizQuestion.appendChild(questionText);


	var answerForm = document.getElementById("answerForm");
	answerForm.innerHTML = "";
	var currentAnswer, answerText, answerLabel;
	//create input elements
	for (var i = 1; i <= question.Answers.length; i++) {
		//create the input element and set attributes
		currentAnswer = document.createElement("input");
		currentAnswer.setAttribute("id", i);
		currentAnswer.setAttribute("type", "radio");
		currentAnswer.setAttribute("name", "answerGroup");

		currentAnswer.setAttribute("value", question.Answers[i - 1]);

		answerLabel = document.createElement("label");
		answerLabel.setAttribute("for", i);
		answerLabel.setAttribute("id", "label" + i);

		let answerJustification = document.createElement('div');
		answerJustification.setAttribute('id', "justification" + i);
		answerJustification.setAttribute('style', 'display: none');
		let justificationText = document.createTextNode(question.Justifications[i - 1]);
		answerJustification.appendChild(justificationText);

		let answerContainer = document.createElement("div");
		answerContainer.setAttribute("id", "answer" + i);

		answerContainer.setAttribute("class", "answerStyle");
		answerContainer.setAttribute("name", "answerRadioGroup");
		answerContainer.setAttribute("style", "cursor: pointer;"); // allows ios devices to utilize onclick.
		// answerContainer.setAttribute("for", i);
		answerText = document.createTextNode(question.Answers[i - 1]);
		answerContainer.appendChild(currentAnswer);
		answerLabel.appendChild(answerText);
		answerLabel.setAttribute("class", "answerText");
		answerContainer.appendChild(answerLabel);
		answerContainer.appendChild(answerJustification);

		answerForm.appendChild(answerContainer);
	}
	addRadioClickEvents(questions[score.currentQuestion].Answers.length);
	submitButton.disabled = true;
	nextButton.disabled = true;
	saveQuizScore();

}

/*
* Gets all elements with the name answerRadioGroup and defines the onclick
* event. Also sets its pointer events to normal incase those were set to none
* previously. 
*/
function addRadioClickEvents() {
	$(document).on("click", "[name='answerRadioGroup']", function (e) {
		var str = e.currentTarget.id;
		var i = str.charAt(str.length-1);
		document.getElementById(i.toString()).checked = true;
		radioButtonClicked();
	});
	var elements = document.getElementsByName("answerRadioGroup")
	for(var i = 0; i < elements.length; i++){
		e = elements[i];
		e.style.pointerEvents = 'auto';
	}
	submitButton.style.pointerEvents = 'auto';
}

/*
* Gets all elements with the specific answerRadioGroup name and assigns none to its
* pointer events, essentially disabling click events. Done to the submit button aswell.
*/
function removeRadioClickEvents() {
	var elements = document.getElementsByName("answerRadioGroup")
	for(var i = 0; i < elements.length; i++){
		e = elements[i];
		e.style.pointerEvents = 'none';
	}
	submitButton.style.pointerEvents = 'none';
}

function checkAnswer() {
	//Grab current question to show
	var question = questions[score.currentQuestion];
	var numQuestions = questions.length;
	let justificationContainer = document.getElementById("justificationContainer");
	let fullJustification = document.getElementById("fullJustification");
	fullJustification.innerHTML = "";
	if (question.CorrectAnswers.length > 1) {
		// TODO: checkboxes


	} else {
		// get list of radio buttons with specified name
		var radios = document.getElementsByName("answerGroup");

		// loop through list of radio buttons
		radios.forEach((button) => {
			let answerContainer = document.getElementById("answer" + button.id);
			let answerLabel = document.getElementById("label" + button.id);
			let justification = document.getElementById('justification' + button.id);
			if (button.checked) {
				if (button.value === question.CorrectAnswers[0]) {
					score.ActualScore++;
					document.getElementById("currentScore").innerHTML = displayPercentCorrect(score);
					fullJustification.innerHTML += justification.innerHTML;
					//correct
					document.getElementById("justificationBox").setAttribute("class", "justificationRightStyle");
					document.getElementById("justificationIcon").src = "css/svg/checked.svg";

				} else {
					//wrong
					document.getElementById("justificationBox").setAttribute("class", "justificationWrongStyle");
					document.getElementById("justificationIcon").src = "css/svg/cancel.svg";
					answerLabel.style.color = "#fff";
					fullJustification.innerHTML += justification.innerHTML;
					// justification.style.display = 'block';
					answerContainer.style.backgroundColor = "#f44336";

				}
			}
			if (button.value === question.CorrectAnswers[0]) {
				//answerContainer.style.color = "green";
				answerLabel.style.color = "#fff";
				// justification.style.display = 'block';
				answerContainer.style.backgroundColor = "#00c853";
			}
		});

		justificationContainer.style.display = "block"
	}

	submitButton.disabled = true;
	nextButton.disabled = false;
	score.currentQuestion++;
	saveQuizScore();
	removeRadioClickEvents();
}

function saveAndCloseQuiz() {
	itemDB.updateItem(scoreDSName, "Subject", score.Subject, score, () => {
		console.log("updated score " + score.Subject);
		isEventListenersAdded = 0;
		loadQuizList();
	});
}

function saveQuizScore() {
	itemDB.updateItem(scoreDSName, "Subject", score.Subject, score, () => {
		console.log("updated score " + score.Subject);
	});
}

function getCheckedBoxes() {
	var checkboxes = document.getElementsByName("answerGroup");
	var checkboxesChecked = [];
	// loop over them all
	for (var i = 0; i < checkboxes.length; i++) {
		// And stick the checked ones onto an array...
		if (checkboxes[i].checked) {
			checkboxesChecked.push(checkboxes[i]);
		}
	}
	// Return the array if it is non-empty, or null
	return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

/*
* Renders the page to display the elements that show a quiz that has been completed and sets 
* the displayed button listeners
*/
function displayQuizResultsHTML() {
	document.getElementById("quizContainer").style.display = "none";
	document.getElementById("questionNumber").style.display = "none";
	document.getElementById("quizTopic").style.display = "none";

	document.getElementById("finishQuiz").style.display = "block";
	document.getElementById("currentScore").style.display = "block";
	document.getElementById("scoreBanner").style.display = "block";
	document.getElementById("currentScore").innerHTML = displayPercentCorrect(score);

	document.getElementById("submitQuestionButton").removeEventListener("click", checkAnswer);
	document.getElementById("nextButton").removeEventListener("click", checkIfNextQuestionNeeded); 

	document.getElementById("closeQuizButton").addEventListener("click", loadQuizList);
	document.getElementById("retakeQuizButton").addEventListener("click", retakeQuiz);
}

/*
* Renders the page to display the elements that show a quiz currently being taken, handling
* adding and removing of button event listeners.
*/
function displayQuizHTML() {
	document.getElementById("quizContainer").style.display = "block";
	document.getElementById("questionNumber").style.display = "block";
	document.getElementById("quizTopic").style.display = "block";

	document.getElementById("scoreBanner").style.display = "none";
	document.getElementById("finishQuiz").style.display = "none";
	document.getElementById("currentScore").style.display = "none";
	
	document.getElementById("submitQuestionButton").addEventListener("click", checkAnswer);
	document.getElementById("nextButton").value = "Next";
	document.getElementById("nextButton").addEventListener("click", checkIfNextQuestionNeeded); 

	document.getElementById("closeQuizButton").removeEventListener("click", loadQuizList);
	document.getElementById("retakeQuizButton").removeEventListener("click", retakeQuiz);
}

/*
* Retakes a quiz that the user has already finished resetting the score values
*/
function retakeQuiz() {
	console.log("clicked retake quiz button...");
	score.ActualScore = 0;
	score.currentQuestion = 0;
	getQuestions(currentDatastore, createQuiz);
}

function displayPercentCorrect(score) {
	return Math.round((score.ActualScore / score.TotalPossible) * 100) + '%';
}
