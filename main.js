var questionNow = 0;
var score = 0;
var secondsQuestion = 20;


var questions = [
	{
	    question: "2x2?",
	    choices: [1, 6, 4, 8],
	    correctAnswer: 4
  },
	{
	    question: "3x3?",
	    choices: [3, 6, 9, 12],
	    correctAnswer: 9
  },
	{
			question: "1x10?",
			choices: [1, 10, 100, 0],
			correctAnswer: 10
	},
  {
      question: "2x5?",
      choices: [5, 2, 10, 15],
      correctAnswer: 10
  },
];

questionBox();

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
}

shuffle(questions)

function questionBox () {
	$("#question").html(questions[questionNow].question);
	shuffle(questions[questionNow].choices)
	let answerBox = "";
	questions[questionNow].choices.forEach(function(item, index) {
		answerBox = answerBox.concat(`<div class="input">
					<input type='radio' id='answer${index}' name='answer'/>
					<label for='answer${index}'>${item}</label>
					</div>`);
		$("#answers").html(answerBox);
	});
}

var questionWidth = 100/questions.length
function newQuestion(){
	secondsEnd = secondsQuestion;
	clearInterval(clock);
	if($('input[name=answer]:checked').next().text() == questions[questionNow].correctAnswer){
		score++;
		$("#questionBar").append(`<div class='progress-bar progress-bar-success' role='progressbar' style='width:${questionWidth}%'></div>`);
	} else if (!$('input[name=answer]:checked').next().text()){
		$("#questionBar").append(`<div class='progress-bar progress-bar-warning' role='progressbar' style='width:${questionWidth}%'></div>`);
		// alert("Szkoda, że nic nie zaznaczyłeś. Poprawna odpowiedz to " + questions[questionNow].correctAnswer);
	} else {
		$("#questionBar").append(`<div class='progress-bar progress-bar-danger' role='progressbar' style='width:${questionWidth}%'></div>`);
		// alert("Żle! Poprawna odpowiedź to " + questions[questionNow].correctAnswer);
	}

	questionNow++;
	if(questionNow < questions.length){
		clock = setInterval(timer, 1000);
		questionBox();
	} else {
		quizEnd();
	}

}
var secondsEnd = secondsQuestion;
function timer(){
	$("#timeBar")
	.css("width", secondsEnd * (100/secondsQuestion) + "%")
	.text(secondsEnd);
	if (secondsEnd < 6){
		document.getElementById("timeBar").style.backgroundColor = "red";
	} else {
		document.getElementById("timeBar").style.backgroundColor = "green";

	}
	if (secondsEnd < 1){
			newQuestion()
	}
	secondsEnd--;
}

var clock = setInterval(timer, 1000);

function quizEnd(){
	$("#box").hide();
	$("#score").html("Twoje punkty:" + `${score}`);
	$("#end").show();

}
const nextButton = document.getElementById("next");
nextButton.addEventListener("click", newQuestion);
