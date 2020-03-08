//Sample questions
var questions = [{
    title: "What does CPU stand for?",
    choices: ["Computer Processing Unit", "Central Peipheral Unit", "Central processing Unit", "None"],
    answer: "Central processing Unit"
},
{
    title: "Who invented the Graphical User Interface (GUI)?",
    choices: ["Microsoft", "Apple", "Xerox", "HP"],
    answer: "Xerox"
},
{
    title: " What is the most crucial component to any computer system?",
    choices: ["Power Supply", "RAM", "ROM", "CPU"],
    answer: "Power Supply"
},
{
    title: "Who invented the x86 standard?",
    choices: ["IBM", "AMD", "Intel", "Cyrix"],
    answer: "Intel"
},
{
    title: "More importantly, when did the first x86 CPU come out?",
    choices: ["1978", "1982", " 1990", "1900"],
    answer: "1978"
}
]

//initialization the numerical variables for the functions.. scores and timers.. 
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
//proceed to end the quiz function when timer is below 0 at any time
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//stop the timer to end the quiz 
function endGame() {

clearInterval(timer);
//this variable is working just to see how many questions answered.
var quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3> ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
localStorage.setItem("timeLeft", timeLeft);
localStorage.setItem("highscoreName",  document.getElementById('name').value);

getScore();
}

//**************** */ This is the out put of time to display.
function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("timeLeft") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button> 
<button onclick="resetGame()">Play Again!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//clears the score name and value in the local storage and return to main page
function clearScore() {
localStorage.setItem("highscore", " ");
localStorage.setItem("highscoreName",  " ");

resetGame();
}

//reset the game 
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent =  `
<h3>
Welcome to the coding quiz! You will have 75 seconds to complete the quiz.
You will be tested on how quickly you can correctly answer the following questions.
Each incorrect answer will take 15 seconds off of the timer. The quiz will end 
once you have either answered all the questions or the timer runs out. Good luck!
</h3>
<h3>
Click Start button to begin the quiz!  
</h3>
<button onclick="start()">Start!</button>`;

document.getElementById("quizBody").innerHTML = quizContent;
}

//deduct 15seconds from the timer if user chooses an incorrect answer
function incorrect() {
timeLeft -= 15; 
next();
}

//increases the score by 20points if the user chooses the correct answer
function correct() {
    
//alert("correct");
score += 20;
next();
}

//loops the questions until the questions end
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
  
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()");
        
    } else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("quizBody").innerHTML = quizContent;
}