// Set global variables
var timeRemaining = 101;
var quizScore = 0;
var isCorrect;

// Set element accessors
var quizIntro = document.getElementById("intro");
var quizContainer = document.getElementById("quizContainer");
var questionContainer = document.getElementById("quizQuestion");
var timerContainer = document.getElementById("timerContainer");
var quizCompleteDiv = document.getElementById("quizComplete");
var buttonA = document.getElementById("btnA");
var buttonB = document.getElementById("btnB");
var buttonC = document.getElementById("btnC");
var buttonD = document.getElementById("btnD");
var feedbackContainer = document.getElementById("feedback");
var initialsInput = document.getElementById("formGroupInitials");
var finalScoreContainer = document.getElementById("finalScore");

//Set array of questions
var questions = [
  {
    question: "Which HTML tag is used for a hyperlink?",
    correctResponse: "a",
    optionA: "&lt;a&gt;",
    optionB: "&lt;div&gt;",
    optionC: "&lt;link&gt;",
    optionD: "&lt;p&gt;",
  },
  {
    question:
      "Which method returns a shallow copy of a portion of an array into a new array object?",
    correctResponse: "d",
    optionA: "portion()",
    optionB: "fill()",
    optionC: "concat()",
    optionD: "slice()",
  },
  {
    question:
      "Which CSS property is used to create space around elements, outside of any defined borders?",
    correctResponse: "b",
    optionA: "border",
    optionB: "margin",
    optionC: "outline",
    optionD: "display",
  },
  {
    question:
      "Which framework is used to develop responsive, mobile-first websites?",
    correctResponse: "b",
    optionA: "WWW",
    optionB: "Bootstrap",
    optionC: "HTML",
    optionD: "JavaScript",
  },
  {
    question: "What does the P stand for in API?",
    correctResponse: "c",
    optionA: "principle",
    optionB: "portal",
    optionC: "programming",
    optionD: "portrait",
  },
];

var activeQuestionNumber = 0;
var finalQuestionNumber = questions.length;

// Start  the quiz: intial timer, hide items other than the quiz div
function startQuiz() {
  quizIntro.style.display = "none";
  activeQuestionNumber = 0;

  initializeQuestion();

  timeRemaining = 101;
  quizScore = 0;
  
  // Timer function
  quizTimer = setInterval(function () {
    timeRemaining--;
    timerContainer.textContent = timeRemaining;

    if (timeRemaining === 0) {
      endQuiz();
      clearInterval(quizTimer);
    }
  }, 1000);
  quizContainer.style.display = "flex";
  quizCompleteDiv.style.display = "none";
}

// The quiz is over because the user aswered all of the questions or time ran out
function endQuiz() {
  finalScoreContainer.innerHTML =
    "You correctly answered " + quizScore + " out of " + questions.length + "!";
  quizCompleteDiv.style.display = "flex";
  initialsInput.value = "";
  clearInterval(quizTimer);
  quizContainer.style.display = "none";
}

// Iterate through the quiz questions to display the questions and choices.
function initializeQuestion() {
  quizCompleteDiv.style.display = "none";
  
  if (activeQuestionNumber === finalQuestionNumber) {
    return endQuiz();
  }
  var activeQuestion = questions[activeQuestionNumber];
  questionContainer.innerHTML = activeQuestion.question;
  buttonA.innerHTML = activeQuestion.optionA;
  buttonB.innerHTML = activeQuestion.optionB;
  buttonC.innerHTML = activeQuestion.optionC;
  buttonD.innerHTML = activeQuestion.optionD;
}

// Evaluate the user's response to the question
function checkResponse(answer) {
  isCorrect = questions[activeQuestionNumber].correctResponse;

  if (answer === isCorrect && activeQuestionNumber !== finalQuestionNumber) {
    showFeedback("That is correct!");
    quizScore++;

    activeQuestionNumber++;
    initializeQuestion();
    //display in the results div that the answer is correct.
  } else if (
    answer !== isCorrect &&
    activeQuestionNumber !== finalQuestionNumber
  ) {
    showFeedback("That is not correct.");
    timeRemaining = timeRemaining - 10;
    activeQuestionNumber++;
    initializeQuestion();
  } else {
    endQuiz();
  }
}
function showFeedback(feedback) {
  //Inform the user if the response was correct or incorrect
  feedbackContainer.textContent = feedback;
  // display feedback for 2 seconds
  feedbackContainer.setAttribute("class", "");
  setTimeout(function () {
    feedbackContainer.setAttribute("class", "d-none");
  }, 2000);
}

// Save the score and initials
function saveScore() {
  if (initialsInput.value === "") {
    alert("Please enter your initials");
    return false;
  } else {
    var userInitials = initialsInput.value;
    var currentHighscore = {
      initials: userInitials,
      score: quizScore,
    };
    alert("Your initials and score are saved");
    quizCompleteDiv.style.display = "none";
    quizIntro.style.display = "flex";
  }
}