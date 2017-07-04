// Make Start Button disapeer
$("#start").on("click", function() {
	$("#start").remove();
	game.loadQuestion();
})

//Checks entire document
$(document).on("click", ".answer-button", function(e){
	game.clicked(e);
})

$(document).on("click", "#reset", function(){
	game.reset();
})

// Questions Object
var questions = [{
	question: "Who was the only President to serve more than two terms?",
	answers: ["Ulysses S. Grant", "Theodore Roosevelt", "George Washington", "Franklin D. Roosevelt"],
	correctAnswer: "Franklin D. Roosevelt",
	image: "../images/fdr.jpg" ,
}, {
	question: "Who was the only President to serve 2 non-consecutive terms?",
	answers: ["Ronald Reagan", "Theodore Roosevelt", "Grover Cleveland", "Woodrow Wilson"],
	correctAnswer: "Grover Cleveland",
	image: "../images/gover2x.jpg" ,
}, {
	question: "Who was the oldest elected President",
	answers: ["Donald Trump", "Ronald Reagan", "James Buchanan", "Dwight D. Eisenhower"],
	correctAnswer: "Donald Trump",
	image: "../images/dtrump.jpg",
}, {
	question: "Who was the first President to live in the White House?",
	answers: ["Thomas Jefferson", "George Washington", "John Adams", "Andrew Jackson"],
	correctAnswer: "John Adams",
	image: "../images/johnadams.jpg",
}, {
	question: "Who was the first President born outside the contiguous United States",
	answers: ["Benjamin Harrison", "Franklin Pierce", "Barack Obama", "William Howard Taft"],
	correctAnswer: "Barack Obama",
	image: "../images/barackfam.jpg",
}, {
	question: "Before the 12th Amendment was passed in 1804, how was the Vice President determined?",
	answers: ["Appointed by the President", "President and Vice President were voted on separately", "The Presidential candidate receiving the second-largest number of electoral votes", "There was no official Vice President before 1804"],
	correctAnswer: "The Presidential candidate receiving the second-largest number of electoral votes",
	image: "../images/1804election.jpg",
}, {
	question: "Which U.S President signed the treaty to purchase Alaska from Russia?",
	answers: ["Ulysses S. Grant", "Andrew Johnson", "James Buchanan", "Andrew Jackson"],
	correctAnswer: "Andrew Johnson",
	image: "../images/andrewjohnson.jpg",
}]

// Game Object
var game = {
	questions: questions,
	currentQuestion: 0,
	counter: 30, // Time remaining
	correct: 0, // Holds the number of correctly chosen answers
	incorrect: 0, // Holds the number of incorrectly chosen answers
	unanswered: 0, // Holds the number of unanswered questions
	countdown: function() {
		game.counter--; // increment down counter (changes timer)
		$("#counter").html(game.counter);
		if(game.counter<=0){
			console.log("Time's Up!");
			game.timeUp();
		}
	},
	loadQuestion: function(){
		timer = setInterval(game.countdown, 1000); // Every 1 second, run game.countdown
		$('#subwrapper').html('<h2>Time Remaining <span id="counter">30</span> Seconds</h2>'); // Counter counts down from 30
		$('#subwrapper').append('<h2>' + questions[game.currentQuestion].question + '</h2>'); // Post current Question to page
		for (var i = 0; i < questions[game.currentQuestion].answers.length; i++)
		{
			$('#subwrapper').append('<button class="answer-button" id="button- ' + i + ' " data-name= "' + questions[game.
				currentQuestion].answers[i]+'">' + questions[game.currentQuestion].answers[i]+ '</button>');
		}

	},
	nextQuestion: function(){
		game.counter = 30; // Reset the timer back to 30 when new question
		$('#counter').html(game.counter); // change timer on html
		game.currentQuestion++; // Goes to next question by increment currentQuestion value
		game.loadQuestion(); //
	},
	timeUp: function(){
		clearInterval(timer); // Stops timer
		game.unanswered++; // Increases unanswered count
		$('#subwrapper').html('<h2>Out of time</h2>');
		$('#subwrapper').append('<h3>The correct answer was: ' + questions[game.
			currentQuestion].correctAnswer+ '</h3>'); // Displays the correct answer
		$('#subwrapper').append('<img src = "questions[game.currentQuestion].image" />'); // Appends 
		if(game.currentQuestion == questions.length-1){
			setTimeout(game.results, 3*1000); // Wait 3 seconds, and if last question, go to results page
		} else {
			setTimeout(game.nextQuestion, 3*1000); // Wait 3 seconds, and go to next page
		}
	},
	results: function(){
		clearInterval(timer); // Resets the timer
		$('#subwrapper').html('<h2>Complete!</h2>');
		$('#subwrapper').append('<h3>Your Score is: ' + game.correct + '</h3>'); // Displays score/amount correct
		$('#subwrapper').append('<h3>Incorrect: ' + game.incorrect + '</h3>'); // Displays incorrect amount
		$('#subwrapper').append('<h3>Unanswered: ' + game.unanswered + '</h3>'); // Displays unanswered amount
		$('#subwrapper').append('<button id="reset">RESET</button>'); // Reset Button
	},
	clicked: function(e){
		clearInterval(timer); // Want timer to stop once button clicked, 
		if($(e.target).data("name")==questions[game.currentQuestion].
			correctAnswer){
			game.answeredCorrectly();
		} else {
			game.answeredIncorrectly();
		}
	},
	//After we make it to the answered correctly page
	answeredCorrectly: function(){
		console.log("You Got it!");
		clearInterval(timer);
		game.correct++; // Increase correct counter by 1
		$('#subwrapper').html('<h2>You got it right!</h2>');
		$('#subwrapper').append('<img src = "questions[game.currentQuestion].image" />'); 
		$('#subwrapper').append('<h3> You chose: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
		if(game.currentQuestion == questions.length-1){
			setTimeout(game.results, 5*1000); // Wait 3 seconds, and if last question, go to results page
		} else {
			setTimeout(game.nextQuestion, 5*1000); // Wait 3 seconds, and go to next page
		}
	},
	answeredIncorrectly: function() {
		console.log("Wrong");
		clearInterval(timer);
		game.incorrect++;
		$('#subwrapper').html('<h2>You got it wrong!</h2>');
		$('#subwrapper').append('<h3>The correct answer was: ' + questions[game.
			currentQuestion].correctAnswer+ '</h3>'); // Displays the correct answer
		$('#subwrapper').append('<img src = "questions[game.currentQuestion].image" />'); 
		if(game.currentQuestion == questions.length -1){
			setTimeout(game.results, 5*1000);
		} else {
			setTimeout(game.nextQuestion, 5*1000);
		}
	},
	reset: function(){ // resets every count to original amount
		game.currentQuestion = 0;
		game.counter = 30; // If doesn't work, change back to 0
		game.correct = 0;
		game.incorrect = 0;
		game.unanswered = 0;
		game.loadQuestion();
	}
}

