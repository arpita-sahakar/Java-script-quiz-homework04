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



var timeRem = 10;
var finalScore = 0;

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
  // go to High score page
  goToHighScorePage();
});

//when "Go Back " button is clicked the pages goes back to the first page ("start-page") 
goBackBtn.addEventListener("click", function(event){

    highScorePage.setAttribute("style", "display : none;");
    startPage.setAttribute("style", "display : block;");
    headerEl.setAttribute("style", "display : block;");
    timeRem = 10;
    displayTime();


});

clearHighScore.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.clear();

});

// when submit button is clicked then score will be stored

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var receivedInitials = initialsEl.value;
  if (receivedInitials === "") {
    alert("Please provide some input");
  } else {
    localStorage.setItem(receivedInitials, finalScore);
    initialsEl.value = "";
    goToHighScorePage();
  }
});

function goToQuestionPage() {
  startPage.setAttribute("style", "display : none;");
  questionPage.setAttribute("style", "display : block;");
}

//function to display time
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
}