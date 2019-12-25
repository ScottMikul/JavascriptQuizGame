var timerEL = $("#timer");
var quizStartEl = $("#quiz-start");


//views:
var instructionViewEl = $("#instruction-view");
var questionViewEl = $("#question-view");


//question view div elements
var questionTitleEl = $("#question-title");
var questionChoiceEl = $("#question-list");
var messageFeedBackEl = $("#message-feedback");

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
var counter = questionArray.length* 5;


$(function() {


    

    function setTimerText(){
        counter--;
        timerEL.text(counter);
    }

    function startQuiz(){
      questionIndex = 0;
      toggleVisibility(instructionViewEl,questionViewEl);
      setInterval(setTimerText,1000)
      loadQuestion();
    }

    var questionIndex = 0;

    function loadQuestion(){
      var currentQuestion = questionArray[questionIndex];
      questionTitleEl.text(currentQuestion.title);
      questionChoiceEl.text("");

      for(var i=0;i<currentQuestion.choices.length;i++){
        questionChoiceEl.append("<li><button data-index="+i+">" + currentQuestion.choices[i]+ "</a></button></li>");
      }

    }


    questionChoiceEl.click(checkAnswer)

    function checkAnswer(){
      messageFeedBackEl.fadeIn(1000,function(){
      });
    }

    function incrementQuestion(){

    }

    function toggleVisibility(offEl,onEl){
      offEl.toggleClass("d-none",true);
      offEl.toggleClass("d-block",false);
      onEl.toggleClass("d-none",false);
      onEl.toggleClass("d-block",true);
    }

    quizStartEl.on("click",startQuiz)

});

