var timerEL = $("#timer");


var questionArray = ['hallo', 'lel'];
var counter = questionArray.length* 5;
$(function() {
    
    
    
    

    setInterval(setTimerText,1000)

    function setTimerText(){
        counter--;
        timerEL.text(counter);
    }








});

