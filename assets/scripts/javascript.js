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
var counter = questionArray.length* 5;
var currentQuestion;


//initials information
var initialsFormEl = $("#initials-form");


$(function() {

  function toggleVisibility(offEl,onEl){
    offEl.toggleClass("d-none",true);
    offEl.toggleClass("d-block",false);
    onEl.toggleClass("d-none",false);
    onEl.toggleClass("d-block",true);
  }
    

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
      currentQuestion = questionArray[questionIndex];
      questionTitleEl.text(currentQuestion.title);
      questionChoiceEl.text("");

      for(var i=0;i<currentQuestion.choices.length;i++){
        questionChoiceEl.append("<li><button data-index="+i+">" + currentQuestion.choices[i]+ "</button></li>");
      }

    }


    questionChoiceEl.click(checkAnswer);

    function checkAnswer(event){
      var element = event.target;
      if(element.matches("button")){
        if(currentQuestion.choices[element.dataset.index]===currentQuestion.answer){
          correctAnswerEl.removeClass("d-none").hide().fadeIn(1000,function(){
            correctAnswerEl.addClass("d-none");
            incrementQuestion();
          });
        }
        else{
          incorrectAnswerEl.removeClass("d-none").hide().fadeIn(1000, function(){
            incorrectAnswerEl.text("Incorrect. The correct answer is: "+ currentQuestion.answer);
            incorrectAnswerEl.addClass("d-none");
            incrementQuestion();
          });

        }

      }



    }

    function incrementQuestion(){
      questionIndex++;

      if(questionIndex!==questionArray.length){
        loadQuestion();
      }
      else{
        toggleVisibility(questionViewEl,submitScoreViewEl);
      }



    }

    function getHighScoreView(event){
      event.preventDefault();
      toggleVisibility(submitScoreViewEl,highScoreViewEl);
    }

    


    initialsFormEl.on("submit",getHighScoreView)
    quizStartEl.on("click",startQuiz)

});