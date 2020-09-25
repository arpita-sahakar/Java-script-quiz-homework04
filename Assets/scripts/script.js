var startQuizBtn = document.querySelector("#start-quiz-btn");
var startPage = document.querySelector("#start-page");
var questionPage = document.querySelector("#question-page");
var timeRemainingEl = document.querySelector("#time-remaining");
var completionPage = document.querySelector("#completion-page");
var viewScoreLink = document.querySelector("#view-high-score-link");
var highScorePage = document.querySelector("#high-scores-page");
var headerEl = document.querySelector("#view-score");
var finalScoreEl = document.querySelector("#final-score");
var submitBtn = document.querySelector("#submit-btn");
var initialsEl = document.querySelector("#initials");
var goBackBtn = document.querySelector("#go-back");
var clearHighScore = document.querySelector("#clear-high-sore");
var scoreListEL = document.querySelector("#score-list");
var questionEL = document.querySelector("#question");
var ulEl = document.querySelector("#list-of-options");
var ansFooter = document.querySelector("#answer-footer");

//Initialize highscore array with empty array
var highScoreArray = [];

//Initialize time remaining
var timeRem = 500;
var finalScore = 0;

//Define questions
var q1 = {
  ques: "Why so JavaScript and Java have similar name?",
  ans: "JavaScript's syntax is loosely based on Java's",
  opt: [
    "JavaScript is a stripped-down version of Java",
    "JavaScript's syntax is loosely based on Java's",
    "They both originated on the island of Java",
    "None of the above",
  ],
};

var q2 = {
  ques: "______ JavaScript is also called client-side JavaScript",
  ans: "Navigator",
  opt: ["Microsoft", "Navigator", "LiveWire", "Native"],
};

var q3 = {
  ques: "What are variables used for in JavaScript Programs?",
  ans: "Storing numbers, dates, or other values",
  opt: [
    "Storing numbers, dates, or other values",
    "Varying randomly",
    "Causing high-school algebra flashbacks",
    "None of the above",
  ],
};

//Define question Array
var questionArray = [q1, q2, q3];

//Init funtion call to get highscore array from local storage. This will be executed when page loads first time
init();

function init() {
  highScoreArray = JSON.parse(localStorage.getItem("highScoreKey"));
  if (highScoreArray === null) {
    highScoreArray = [];
  }
}

//once the page in open total time is displayed
displayTime();

//when start button is pressed it changes to next page("goToQustionPage") & starts timer
startQuizBtn.addEventListener("click", function (event) {
  event.preventDefault();
  //display question page
  goToQuestionPage();

  //start timer
  var timeInterval = setInterval(function () {
    // decrement time
    timeRem--;
    displayTime();
    //when time remaining will reach zero then stop timer and display the next page("goToCompletion page")
    if (timeRem <= 0) {
      clearInterval(timeInterval);
      goToCompletionPage();
    }
  }, 1000);
});

//when "View High Score" link is clicked it changes to "high-score-page"
viewScoreLink.addEventListener("click", function (event) {
  event.preventDefault();
  //render high-scores
  renderHighScores();
  // go to High score page
  goToHighScorePage();
});

//when "Go Back " button is clicked the pages goes back to the first page ("start-page")
goBackBtn.addEventListener("click", function (event) {
  //Display start page and header, hide high score page
  highScorePage.setAttribute("style", "display : none;");
  startPage.setAttribute("style", "display : block;");
  headerEl.setAttribute("style", "display : block;");
  //Reset timeRem to initial value;
  timeRem = 500;
  displayTime();
});

//This event is triggered when user clicks on Clear High Score button
clearHighScore.addEventListener("click", function (event) {
  event.preventDefault();
  //Clear local storage
  localStorage.clear();
  //Remove high score elements from screen
  scoreListEL.innerHTML = "";
  //Empty out high score array
  highScoreArray = [];
});

// when submit button is clicked then score will be stored
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var receivedInitials = initialsEl.value;
  if (receivedInitials === "") {
    alert("Please provide some input");
  } else {
    var highScoreValue = receivedInitials + "-" + finalScore;
    highScoreArray.push(highScoreValue);

    localStorage.setItem("highScoreKey", JSON.stringify(highScoreArray));
    initialsEl.value = "";
    //render high-scores
    renderHighScores();
    goToHighScorePage();
  }
});

//This function is used to go to Question Page from start page
function goToQuestionPage() {
  //Hide Start page and display Question page
  startPage.setAttribute("style", "display : none;");
  questionPage.setAttribute("style", "display : block;");
   //Hide footer
  ansFooter.setAttribute("style", "display : none;");
  //Display first question
  questionEL.textContent = questionArray[0].ques;

  //Display options for first question (buttons in li)
  ulEl.innerHTML = "";
  for (i = 0; i < questionArray[0].opt.length; i++) {
    var liEl = document.createElement("li");
    //  liEl.innerHTML = "<button type=\"button\" class=\"btn btn-primary start-button\">" + questionArray[0].opt[i] + "</button>";
    liEl.setAttribute("id", i);

    var optBtn = document.createElement("button");
    optBtn.setAttribute("type", "button");
    optBtn.setAttribute("class", "btn btn-primary start-button");
    optBtn.textContent = questionArray[0].opt[i];
    liEl.appendChild(optBtn);

    ulEl.appendChild(liEl);
  }
  
}

ulEl.addEventListener("click", function(event){
    event.preventDefault();
    if(event.target.matches("button")){
    
        
        //display correct or wrong todo : capture question id 
        

        //if answer is correct the add 10 to the score else -10 from remaining time
        //display next question 
    }
});

//function to display time near timer
function displayTime() {
  timeRemainingEl.textContent = timeRem;
}

function goToCompletionPage() {
  questionPage.setAttribute("style", "display : none;");
  completionPage.setAttribute("style", "display : block;");
  finalScoreEl.textContent = finalScore;
}

function goToHighScorePage() {
  completionPage.setAttribute("style", "display : none;");
  startPage.setAttribute("style", "display : none;");
  highScorePage.setAttribute("style", "display : block;");
  headerEl.setAttribute("style", "display : none;");
  questionPage.setAttribute("style", "display : none;");
}

function renderHighScores() {
  scoreListEL.innerHTML = "";
  for (i = 0; i < highScoreArray.length; i++) {
    var pEl = document.createElement("p");
    pEl.textContent = i + 1 + ". " + highScoreArray[i];
    pEl.setAttribute("class", "display-high-score");
    scoreListEL.appendChild(pEl);
  }
}
