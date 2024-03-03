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

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex= 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
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

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
startQuiz();


    
