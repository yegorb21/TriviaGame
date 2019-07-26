//  Interval Exercise (follow the instructions below).


//
// the only thing i think im missing is some handling for when the user clicks the submit button multiple times within the scope of 1 question
//

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;
var clockRunning = false
var time = 15;
var correctResponse = ""
var questionIndex = 0
var chosenResponse = "asdasdasds"
var question1Info = ["How Old is Yegor?", "22", "23", "24", "25", "25"]
var question2Info = ["Who is Yegor's Favorite NBA Player?", "Lebron", "MJ", "Kobe", "Muggsy Bogues", "Kobe"]
var question3Info = ["What is Yegor's Favorite Color?", "Blue", "Green", "Red", "Pink", "Blue"]
var question4Info = ["Who is the Best QB of All Time?", "Peyton Manning", "Joe Montana", "Dan Marino", "Aaron Rodgers", "Peyton Manning"]

var questionsArr = [question1Info, question2Info, question3Info, question4Info]


//  This code will run as soon as the page loads.
window.onload = function () {
    reset()
    start()

    AskQuestion(questionsArr[questionIndex])
};


function AskQuestion(questionArr) {

    $("input:radio").prop('checked', false);

    var question1 = questionArr[0]
    var option1 = questionArr[1]
    var option2 = questionArr[2]
    var option3 = questionArr[3]
    var option4 = questionArr[4]
    correctResponse = questionArr[5]

    $("#question").text(question1)
    $("#option1").next().text(option1)
    $("#option1").attr("value", option1)
    $("#option2").next().text(option2)
    $("#option2").attr("value", option2)
    $("#option3").next().text(option3)
    $("#option3").attr("value", option3)
    $("#option4").next().text(option4)
    $("#option4").attr("value", option4)

    WaitForAnswer()
}

// function ShowHideRadios() {
//     for (var i = 1; i < 5; i++) {

//         $("label[for=option" + i + "],#option" + i).hide();

//     }
// }


function WaitForAnswer() {
    $("#submit").click(function () {
        chosenResponse = $("input[type='radio'][name='question']:checked").val()

        GradeResponse(chosenResponse)

    })
}

function GradeResponse(chosenResp) {

    if (chosenResp == correctResponse) {
        ShowWinningScreen()
    } else {
        ShowLosingScreen()
    }

    if (questionIndex == questionsArr.length - 1) {
        setTimeout(AlertGameOver(), 3000)
    }
    time = 3

}


function ShowWinningScreen() {
    $("#result").text("You got it right! Good job. 3 seconds until the next question.")
}

function ShowLosingScreen() {
    $("#result").text("You got it wrong. Better luck next time. 3 seconds until the next question.")
}


function reset() {

    time = 15;

    //  TODO: Change the "display" div to "00:00."
    $("#timeRem").text(timeConverter(time))
    clearInterval(intervalId)

}

function start() {

    //  TODO: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        clearInterval(intervalId)
        intervalId = setInterval(decrement, 1000);
    }

}

function decrement() {

    time--;

    $("#timeRem").text(timeConverter(time))

    if (questionIndex == questionsArr.length - 1 && time == 0) {
        setTimeout(AlertGameOver(), 3000)
    } else if (time == 0) {

        //if selected response is in the current question array
        // if they responded, their response has been checked. if not, we need to tell them they flunked ):
        if (!questionsArr[questionIndex].includes(chosenResponse)) {
            ShowLosingScreen()
        }

        questionIndex++
        reset()
        start()
        AskQuestion(questionsArr[questionIndex])
    }
}

function AlertGameOver() {
    // alert("Game over! Thanks for playing. Please refresh the page to play again.")

    stop()
    $("#result").append("<div>Just kidding, game over, no next questions! Refresh to play again.</div>")

}

function stop() {

    //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
    clearInterval(intervalId)

}

function timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }

    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

