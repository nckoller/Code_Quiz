const viewScoresButton = document.getElementById("view-scores");
const highScores = document.getElementById("high-scores");
const initialsInput = document.getElementById("initials-input");

const startButton = document.getElementById("start-btn");

const instructionsDiv = document.getElementById("instructions");
const questionContainerDiv = document.getElementById("question-container");
const questionTextDiv = document.getElementById("question");
const scoreDiv = document.getElementById("score");
const timerDiv = document.getElementById("timer");
const timeLeftOnClockDiv = document.getElementById("time-left");

const answerButton1 = document.getElementById("btn-1");
const answerButton2 = document.getElementById("btn-2");
const answerButton3 = document.getElementById("btn-3");
const answerButton4 = document.getElementById("btn-4");

const answerButtonsArr = [
  answerButton1,
  answerButton2,
  answerButton3,
  answerButton4,
];

let isGameRunning = false;
let nextQuestionIndex = 0;

const questionsArr = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      { text: "Strings", correct: false },
      { text: "Booleans", correct: false },
      { text: "Alerts", correct: true },
      { text: "Numbers", correct: false },
    ],
  },
  {
    question:
      "The condition in an if/else statement is enclosed within _________.",
    answers: [
      { text: "Quotes", correct: false },
      { text: "Curly Brackets", correct: false },
      { text: "Parenthesis", correct: true },
      { text: "Square Brackets", correct: false },
    ],
  },
  {
    question: "Arrays in JavaScript can be used to store _________.",
    answers: [
      { text: "Numbers and Strings", correct: false },
      { text: "Other Arrays", correct: false },
      { text: "Booleans", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
  {
    question:
      "String values must be enclosed within _______ when being assigned to variables",
    answers: [
      { text: "Quotes", correct: true },
      { text: "Curly Brackets", correct: false },
      { text: "Parenthesis", correct: false },
      { text: "Commas", correct: false },
    ],
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      { text: "JavaScript", correct: false },
      { text: "Terminal/Bash", correct: false },
      { text: "For Loops", correct: false },
      { text: "Console.log", correct: true },
    ],
  },
  {
    question: "Which of the following is NOT a logical operator in JavaScript?",
    answers: [
      { text: "&&", correct: false },
      { text: "??", correct: true },
      { text: "||", correct: false },
      { text: "!=", correct: false },
    ],
  },
];
let timeLimit = 60;
let timeLeftOnClockWhenGameEnded;
let score = 0;

// adds click events to answer buttons
answerButton1.addEventListener("click", handleAnswer);
answerButton2.addEventListener("click", handleAnswer);
answerButton3.addEventListener("click", handleAnswer);
answerButton4.addEventListener("click", handleAnswer);

viewScoresButton.addEventListener("click", displayScores);

// adds click event to the start button
startButton.addEventListener("click", startQuiz);

function displayScores() {
  highScores.classList.remove("hide");
  const scoresList = document.getElementById("high-scores-list");
  scoresList.innerHTML = "";
  const previousScoresArr = getLocalStorage();

  previousScoresArr.forEach((score) => {
    const node = document.createElement("LI");
    const scoreNode = document.createTextNode(
      `${score.initials}: ${score.score}`
    );
    node.appendChild(scoreNode);
    scoresList.appendChild(node);
  });
}

function startQuiz() {
  score = 0;
  scoreDiv.textContent = "Your score: " + score;
  timeLimit = 60;
  timerDiv.textContent = "Time Left: " + timeLimit;
  nextQuestionIndex = 0;

  isGameRunning = true;
  initialsInput.classList.add("hide");
  timeLeftOnClockDiv.classList.add("hide");
  highScores.classList.add("hide");
  console.log("startQuiz start");
  // instructions disappear
  instructions.classList.add("hide");
  // start button disappears
  startButton.classList.add("hide");
  // question and answers appear on page
  questionContainerDiv.classList.remove("hide");
  // question and answers selected
  setQuestion();
  // timer appears on page
  timerDiv.classList.remove("hide");
  // timer starts
  timerCount();
  // score appears on page at zero
  scoreDiv.classList.remove("hide");
  scoreDiv.textContent = "Your score: " + score;
}
// timer for game
function timerCount() {
  var timerInterval = setInterval(function () {
    timeLimit--;
    // displays how much time is left
    timerDiv.textContent = "Time Left: " + timeLimit;
    if (timeLimit === 0 || !isGameRunning) {
      clearInterval(timerInterval);
      document.getElementById("timer").innerHTML = "TIME'S UP!";

      endGame();
    }
  }, 1000);
}

function setQuestion() {
  const questionToDisplay = questionsArr[nextQuestionIndex];

  questionTextDiv.innerText = questionToDisplay.question;

  questionToDisplay.answers.forEach(function (answer) {
    const button = answerButtonsArr[questionToDisplay.answers.indexOf(answer)];

    button.innerText = answer.text;
    button.classList.add("btn");
    button.setAttribute("correctAnswer", answer.correct);
  });
  nextQuestionIndex++;
}

function handleAnswer(e) {
  console.log(e);
  console.log(e.srcElement.getAttribute("correctAnswer"));
  //  if correct, add to score
  if (e.srcElement.getAttribute("correctAnswer") === "true") {
    updateScore();
    // else subtract time
  } else {
    timeLimit = timeLimit - 10;
    // if the timer hits zero, end the game
    if (timeLimit <= 0) {
      endGame();
    }
  }
  // if no more questions, end game
  if (nextQuestionIndex === questionsArr.length) {
    endGame();
  } else {
    // else post next question
    setQuestion();
  }
}

// adds 10 pts to score if user gets an answer correct
function updateScore() {
  score = score + 10;
  scoreDiv.textContent = "Your score: " + score;
}

function endGame() {
  isGameRunning = false;
  //  hides questions
  questionContainerDiv.classList.add("hide");
  console.log("game over");
  // input field appears for user to enter their initials and save their score
  initialsInput.classList.remove("hide");

  // displays time left on timer after the last question has been answered
  timeLeftOnClockWhenGameEnded = timeLimit;
  timeLeftOnClockDiv.classList.remove("hide");
  document.getElementById("time-left").innerHTML =
    "Time left: " +
    (timeLeftOnClockWhenGameEnded >= 0 ? timeLeftOnClockWhenGameEnded : 0);
  // hides the timer until game restarts
  timer.classList.add("hide");

  // display start quiz button
  startButton.classList.remove("hide");
}
// establishing local storage set up
function getLocalStorage() {
  return JSON.parse(localStorage.getItem("quizScores")) || [];
}

function setLocalStorage(scoreObject) {
  localStorage.setItem("quizScores", scoreObject);
}

document.getElementById("add-initials").addEventListener("click", recordScores);

function recordScores() {
  const previousScores = getLocalStorage();
  // user inputs initials and saves them to local storage
  const saveInitials = document.getElementById("initials-input-field").value;
  if (saveInitials === "") {
    alert("You must enter your initials in order to save your score.");
    return;
  }
  console.log("save initals", saveInitials);

  const newScoreToAdd = {
    initials: saveInitials,
    score: score,
  };
  // append to the array of previous scores
  previousScores.push(newScoreToAdd);
  // the outcome of line 205 is your JSON object to go into local storage
  setLocalStorage(JSON.stringify(previousScores));
  document.getElementById("initials-input-field").value = "";
  displayScores();
}
