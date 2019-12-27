var timerEL = $("#timer");
var quizStartEl = $("#quiz-start");


//views:
var instructionViewEl = $("#instruction-view");
var questionViewEl = $("#question-view");
var submitScoreViewEl = $("#submit-initials-view");
var highScoreViewEl = $("#high-score-view");


//question view div elements
var questionTitleEl = $("#question-title");
var questionChoiceEl = $("#question-list");
var messageFeedBackEl = $("#message-feedback");
var correctAnswerEl = $("#correct-answer");
var incorrectAnswerEl = $("#incorrect-answer");


//variables to help out with questions
var questionArray = [];
class Question {
  constructor(title, choices, answer) {
    this.title = title;
    this.choices = choices;
    this.answer = answer;
  }
}

questionArray.push(new Question("Commonly used data types DO NOT include:", ["strings", "booleans", "alerts", "numbers"], "alerts"));
questionArray.push(new Question("The condition in an if / else statement is enclosed within ____.", ["quotes", "curly brackets", "parentheses", "square brackets"], "parentheses"));

var highScores = [];
class scoreBoardEntry {
  constructor(scoreInitials, scoreEntry) {
    this.scoreInitials = scoreInitials;
    this.scoreEntry = scoreEntry;
  }
}
highScores.push(new scoreBoardEntry("bob", 500));
highScores.push(new scoreBoardEntry("joe", 200));

var counter = questionArray.length * 5;
var currentQuestion;
var score;
var correctQuestions;
var interval;
var newHighScore;
var highScoreInitials;


//initials information
var scoreSpanEl = $("#submit-score");
var initialsFormEl = $("#initials-form");
var initialsEl = $("#initials");
var questionIndex = 0;

//scoreboard items
var highScoresEl = $("#high-scores");


$(function () {

  function toggleVisibility(offEl, onEl) {
    offEl.toggleClass("d-none", true);
    offEl.toggleClass("d-block", false);
    onEl.toggleClass("d-none", false);
    onEl.toggleClass("d-block", true);
  }


  function setTimerText() {
    counter--;
    timerEL.text(counter);
  }

  function startQuiz() {
    counter = questionArray.length * 5;
    questionIndex = 0;
    correctQuestions = 0;
    score = 0;
    toggleVisibility(instructionViewEl, questionViewEl);
    interval = setInterval(setTimerText, 1000)
    loadQuestion();
  }


  function loadQuestion() {
    currentQuestion = questionArray[questionIndex];
    questionTitleEl.text(currentQuestion.title);
    questionChoiceEl.text("");

    for (var i = 0; i < currentQuestion.choices.length; i++) {
      questionChoiceEl.append("<li><button data-index=" + i + ">" + currentQuestion.choices[i] + "</button></li>");
    }

  }


  questionChoiceEl.click(checkAnswer);

  function checkAnswer(event) {
    var element = event.target;
    var correctAnswer = currentQuestion.answer;
    incorrectAnswerEl.text("Incorrect. The correct answer is: " + correctAnswer);
    if (element.matches("button")) {
      if (currentQuestion.choices[element.dataset.index] === correctAnswer) {
        correctAnswerEl.removeClass("d-none").hide().fadeIn(1000, function () {
          correctQuestions++;
          correctAnswerEl.addClass("d-none");
          incrementQuestion();
        });
      }
      else {
        incorrectAnswerEl.removeClass("d-none").hide().fadeIn(1000, function () {
          incorrectAnswerEl.addClass("d-none");
          incrementQuestion();
        });

      }

    }



  }

  function incrementQuestion() {
    questionIndex++;

    if (questionIndex !== questionArray.length) {
      loadQuestion();
    }
    else {

      score = counter * 100 + correctQuestions * 200;


      toggleVisibility(questionViewEl, submitScoreViewEl);
      scoreSpanEl.text(score);



      clearInterval(interval);

    }



  }

  function getHighScoreView(event) {
    event.preventDefault();
    highScoreInitials = initialsEl.val();
    console.log(initialsEl.val());
    console.log(highScoreInitials);
    newHighScore = new scoreBoardEntry(highScoreInitials, score);


    var scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
    if(scoreboard ===null){
      scoreboard = [];
    }
    highScoresEl.html("");
    var entered = false;
    console.log("newHighScore" + newHighScore.scoreInitials);
    scoreboard.forEach((highScore, index, arr) => {

      if (score > highScore.scoreEntry && !entered) {
        highScoresEl.append("<li>" + newHighScore.scoreInitials + " - " + newHighScore.scoreEntry + "</li>");
        highScoresEl.append("<li>" + highScore.scoreInitials + " - " + highScore.scoreEntry + "</li>");
        arr.splice(index, 0, newHighScore);
        console.log(arr);
        if (scoreboard.length > 9) {
          arr.pop();
        }
        localStorage.setItem("scoreboard", JSON.stringify(arr));
        entered = true;
      }
      else {
        highScoresEl.append("<li>" + highScore.scoreInitials + " - " + highScore.scoreEntry + "</li>");
      }


    });
    if (entered === false && scoreboard.length < 9) {
      highScoresEl.append("<li>" + newHighScore.scoreInitials + " - " + newHighScore.scoreEntry + "</li>");
      scoreboard.push(newHighScore);
      localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
    }

    toggleVisibility(submitScoreViewEl, highScoreViewEl);

  }


  initialsFormEl.on("submit", getHighScoreView)
  quizStartEl.on("click", startQuiz)

  $("#reset-high-scores").click(function () {
    highScoresEl.html("");
    localStorage.setItem("scoreboard", "[]");
  });

  $("#retry").click(function () {
    toggleVisibility(highScoreViewEl, instructionViewEl);
  });

});