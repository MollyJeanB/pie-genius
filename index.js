'use strict';

//array with each question as an object
const questions = [
  {question: `On BBC One's The Great British Bake Off, which attribute does host Mary Berry say should be avoided above all else?`, choices: [`A flabby wimple`, `A Dutchman's crust`, `A squishy bum`, 'A soggy bottom'], correct: 4},
  {question: `In which year did the Unicode Consortium approve the pie emoji?`, choices: [2016, 2017, 2013, 2005],correct: 2},
  {question: `During the Klondike Gold Rush at the turn of the last century, pioneer bakers favored which ingredient in pie crusts?`, choices: ['Bear lard', 'Elk musk', 'Reindeer milk', 'Seal blubber'],correct: 1},
  {question: `In Shakespeare's Titus Andronicus, the title character gets his revenge on Queen Tamora in which of the following ways?`, choices: [`Serving her a poisoned pie`, `Peeing in her family's pie crust`, `Baking her sons into a pie and serving it to her`, `Smashing a pie into her face`],correct: 3},
  {question: `In the ABC show Twin Peaks, Special Agent Dale Cooper favors which type of pie at the Double R Diner?`, choices: ['Apple', 'Chocolate Silk', 'Owl', 'Cherry'],correct: 4},
  {question: `Which of the following statements about British pie history is true?`, choices: ['Lamprey pies are a popular coronation gift for the royal family', 'From 1644-1660, mince pies were illegal', 'In the 16th century, the rich often flaunted their wealth by placing live animals inside of pie crusts', 'All of the above'],correct: 4},
  {question: `Traditionally, a pie safe is used to protect pies from which of the following threats?`, choices: [ 'Thieves', 'Rain', 'Insects and vermin', 'Pesticides'],correct: 3},
  {question: `The first known use of the word 'pie' as it relates to food occurred in which year?`, choices: [1303, 1583, 500, 1750],correct: 1},
  {question: `In the musical and film Waitress, what kind of the pie did the main character make with her mama when she was nine years old?`, choices: ['Unicorn Meringue Pie', 'Marshmallow Mermaid Pie', 'Swedish Princess Cake', 'Angel Pegasus Tart'],correct: 2},
  {question: `In which U.S. state is there a law requiring that proprietors of apple pie make a "good faith effort" to serve it with ice cream, cold milk, or a slice of cheddar cheese weighing a minimum of 1/2 ounce?`, choices: ['Wisconsin', 'Minnesota', 'Vermont', 'Hawaii'],correct: 3},

];

//keeps track of question number and score
let currentQuestion = 0
let currentScore = 0


//resets quiz to starting point
function resetQuiz() {
	$('.start-page').removeClass('hidden');
	$('.question-page').addClass('hidden');
	$('.final-page').addClass('hidden');
	$('.radio-button').attr('disabled', false).val([]);
	$('.submit').attr('disabled', false);
	$('.text-area-response').addClass('hidden');
	$('.current-score').html('');
	currentQuestion = 0
	currentScore = 0
}

//listen for when a user clicks the 'I want pie!' button to start the quiz
function listenStartQuiz() {
	$('.start').off('click').on('click', event => {
		showFirstQuestion();
		})
}

//hides start page and calls the renderQuestion function to display the first question
function showFirstQuestion() {
	$('.start-page').addClass('hidden');
	$('.question-page').removeClass('hidden');
	renderQuestion(questions[currentQuestion]);
}

//displays the new question 
function renderQuestion(question) {
//tells user which question they are on
	let currentQuestionNumber = currentQuestion +1
	$('.current-question-number').html(`${currentQuestionNumber} of ${questions.length}`);
//displays question from object in questions array
	$('.pie-question').html(question.question);
//iterates through the choices array to display answer choices that correspond to that question
	const multiChoices = $('.pie-answer-choice');
	for (let i = 0; i < question.choices.length; i++) {
		$(multiChoices[i]).html(question.choices[i]);
	}
}

//listen for when a user submits a choice
function listenSubmit () {
  $('.form-text').submit(event => {
  	event.preventDefault();
  	submitActions(questions[currentQuestion]);
  	 })
}

//actions for when radio button is selected and submitted 
function prepNext() {
	 $('.text-area-response').removeClass('hidden');
  	//show next button
  	$('.next').removeClass('hidden');
  	//displays current score at top of page
  	$('.current-score').html(`${currentScore} out of ${currentQuestion + 1} correct`);
  	//prevents user from selecting a new choice once one has been clicked
  	$('.radio-button').attr('disabled', true);
  	//prevents user from re-submitting answer
  	$('.submit').attr('disabled', true);

}

//when submit button is clicked, user learns whether their answer is correct
//and the Pie Q at the top of the page is updated 
function submitActions() {
  	const choiceNumber = $('input:radio[name=answerChoice]:checked').attr('data-choice')
  	const question = questions[currentQuestion];
  	console.log(choiceNumber, question.correct)
  	if (choiceNumber == question.correct) {
  		//increments currentScore
  		currentScore++
  		prepNext();
  		console.log('correct', currentScore)
  		//displays message for a correct answer
  		const correctMessage = `Correct! Your Pie Q is off the charts.` 
  		$('.question-feedback').html(correctMessage);
  	}
  	//if no answer selected, shows alert and re-renders question
  	else if (choiceNumber == undefined) {
  		alert("Please choose an answer, pie friend.");
  		renderQuestion(questions[currentQuestion]);
  		currentQuestion -1;
  	}  	

  	else {
  		console.log('wrong')
  		prepNext();
  		const correctAnswer = question.choices[question.correct -1]
  		//displays message for an incorrect answer and reveals which choice is correct
  		const wrongMessage = `No pie for you. The correct answer is "${correctAnswer}."`
  		$('.question-feedback').html(wrongMessage);

  	}
}


//listens for when the 'Next' button is clicked
function listenNext() {
	$('.next').off('click').on('click', event => {
		handleNext();
	})
}

//When 'Next' button is clicked, renders next question and removes answer feedback and next button
function handleNext() {
		currentQuestion++
	if (currentQuestion < questions.length) {
		renderQuestion(questions[currentQuestion]);
		$('.text-area-response').addClass('hidden');
		//re-enables radio button and removes previous selection
		$('.radio-button').attr('disabled', false).val([]);
		//re-enables submit button
		$('.submit').attr('disabled', false);
	}
//Calls the renderFinalPage function if the 'Next' button is clicked after the last question has been answered
	else {
		renderFinalPage();
	}
}


//when the user answers the last question, the final page appears, displaying the generic ending message
//as well as the user's score and a button to start again
function renderFinalPage() {
	$('.question-page').addClass('hidden');
	$('.final-page').removeClass('hidden');
	$('.final-score').html(` ${currentScore} out of ${questions.length}`);
}

//listens for when the 'Pie Again' button is clicked
function listenPieAgain() {
	$('.restart').off('click').on('click', event => {
		returnStartPage();
	})
}

//calls resetQuiz to reload the start page and reset the quiz
function returnStartPage() {
	resetQuiz();
}

//callback function for when the page loads
function handleQuiz() {
	listenStartQuiz();
	listenNext();
	listenSubmit();
	listenStartQuiz();
	listenPieAgain();
	
}

//when the page loads, call `handleQuiz`
$(handleQuiz);