var minutes = 10;
var isPaused = false;

$(document).ready(function(){

    function startButton(min){
        var minutes = 60 * min,
        minutes = minutes - 1;
        display = $('#time');
        startTimer(minutes, display);
    }

    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        timerId = setInterval(function () {
         if(!isPaused){
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.text(minutes + ":" + seconds);

            if (--timer < 0) {
                timer = duration;
                clearInterval(timerId);
                $("#stop").hide();
                $("#resume").hide();
                $("#reset").hide();
                $("#start").show();
                $("#clock").hide();
                $("#timerFinish").show();
            }
          }
        }, 1000);
    }

    function getInput(){
        var valInput = $("#timeInput").val();
        if(valInput){
            minutes = valInput;
        } else {
            minutes = 0
        }
        return minutes;
    }

    // Start button
    $("#start").on("click", function(){
        $(this).hide();
        minutes = getInput();
        isPaused = false;
        $("#time").text((minutes < 10 ? "0" + minutes : minutes) + ":00");
        startButton(minutes);
        $("#clock").show();
        $("#timerFinish").hide();
        $("#reset").show();
        $("#stop").show();
        $("#plus").attr('disabled',true);
        $("#sub").attr('disabled', true);
    });

    //Stop button
    $("#stop").on("click", function(){
        $(this).hide();
        $("#resume").show();
        isPaused = !isPaused;
    });

    //Resume button
    $("#resume").on("click", function(){
        $(this).hide();
        $("#stop").show();
        isPaused = !isPaused;
    });

    //Reset button
    $("#reset").on("click", function(){
        $("#stop").hide();
        $("#resume").hide();
        $("#start").show();
        clearInterval(timerId);
        $("#time").text((minutes < 10 ? "0" + minutes : minutes) + ":00");
        $("#plus").attr('disabled',false);
        $("#sub").attr('disabled', false);
    });

    //Plus button
    $("#plus").on("click", function(){
        var valInput = getInput();
        minutes = (valInput * 1) + 1;
        $("#time").text((minutes < 10 ? "0" + minutes : minutes) + ":00");
        $("#timeInput").val(minutes);
    });

    // button
    $("#sub").on("click", function(){
        var valInput = getInput();
        minutes = (valInput * 1) - 1;
        if(minutes < 0){
            minutes = 0
        }
        $("#time").text((minutes < 10 ? "0" + minutes : minutes) + ":00");
        $("#timeInput").val(minutes);
    });

})