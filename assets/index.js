var questions = [
    {
        question:"Which of the following is not a JavaScript data type",
        answers:[
        { text: "Number", correct: false},
        { text: "String", correct: false},
        { text: "Boolean", correct: false},
        { text: "Character", correct: true},
        ]
    },
    {
        question:"How do you create a function in JavaScript?",
        answers:[
        { text: "function = myFunction() {}", correct: false},
        { text: "create myFunction() {}", correct: false},
        { text: "function myFunction() {}", correct: true},
        { text: "func myFunction() {}", correct: false},
        ]
    },
    {
        question:"Which method is used to remove the last element from an array in JavaScript?",
        answers:[
        { text: "pop()", correct: true},
        { text: "removeLast()", correct: false},
        { text: "deleteLast()", correct: false},
        { text: "splice()", correct: false},
        ]
    }
];

var questionElem = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");
var timerElement = document.getElementById("timer");
var timerInterval;
var timer = 30;

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex= 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
    resetTimer();
    startTimer();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElem.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)

    });
}

function startTimer() {
    timerInterval = setInterval(function() {

        if(currentQuestionIndex < questions.length){
        timerElement.innerText = "Time left: " + timer + "s";
        
        }else{
            timerElement.style.display = "none";
        }

        if (timer <= 0) {
            clearInterval(timerInterval);
            handleNextButton();
        
        }

        timer--;
    }, 1000);
}

function deductTime() {
    timer -= 10;
}

function resetTimer() {
    clearInterval(timerInterval);
    timer = 30; 
}



function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(event){
    var selectedBtn = event.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
        deductTime();
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");

        }
        button.disabled = true;
    });
    nextButton.style.display = "block";

}


function showScore(){
    resetState();
    resetTimer();
    questionElem.innerHTML = "You scored " + score + " out of " + questions.length + "!";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display= "block";

    document.getElementById("initials-form").style.display = "block";
    // saveScoreToLocalStorage(score);
}

function saveScoreToLocalStorage(score) {

    var scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    
    scores.push(score);
    
    localStorage.setItem("quizScores", JSON.stringify(scores));
}

function getScoresFromLocalStorage() {
    return JSON.parse(localStorage.getItem("quizScores")) || [];
}



function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }

})

function playAgain(){
    startQuiz()
}


startQuiz();
startTimer();


    
