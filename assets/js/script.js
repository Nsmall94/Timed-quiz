var body = document.body

var highScoreEl = document.getElementById("view-high-score");
var timerEl = document.getElementById("time");
var containerEl = document.getElementsByClassName("container");
var questionEl = document.getElementById("question-element");
var answerEl = document.getElementById("answer-element");

var quizTitle = document.createElement('h1');
quizTitle.textContent = 'Coding Quiz Challenge';
quizTitle.style.textAlign = 'center';
quizTitle.style.textDecoration = 'underline'
quizTitle.addClassName = document.body.appendChild(quizTitle);

var quizMessage = document.createElement('p');
quizMessage.textContent = 'Answer the following questions. Everytime you select an incorrect answer the timer will decrease by 10 seconds!';
document.body.appendChild(quizMessage);

var startButton = document.createElement('button');
startButton.textContent = 'Start';
startButton.style.display = 'flex';
startButton.style.margin = 'auto';
startButton.style.borderRadius = '6px';
startButton.style.backgroundColor = 'lightblue';
startButton.style.boxShadow = '1px 1px'
document.body.appendChild(startButton);



var currentTime = 70;
var currentQuestion = 0;
var currentScore = 0;

var questionArray = [
    {
        q: '1. What does ‘HTML’ stand for?',
        a: [
            'Hypertext Markup Language', 'Hypertool Markup Language', 'Hypertext Match Language'
        ],
        correct: 'Hypertext Markup Language'
    },
    {
        q: '2. Arrays are created using which of the following?',
        a: [
            'parentheses', 'curly brackets', 'brackets'
        ],
        correct: 'brackets'
    },
    {
        q: '3. How do you initialize flexbox when using CSS?',
        a: [
            'display: flex', 'display flex', 'display: block'
        ],
        correct: 'display: flex'
    },
    {
        q: '4. Commonly used data types do NOT include:',
        a: [
            'strings', 'booleans', 'alerts'
        ],
        correct: 'alerts'
    },
    {
        q: '5. How do you create a numbered list?',
        a: [
            '<ul>', '<ol>', '<nl>'
        ],
        correct: '<ol>'
    },

]

function startTimer() {

    var timeInterval = setInterval(function () {
        if (currentTime === 0) {
            clearInterval(timeInterval);
            checkHighScore();
        }
        else {
            currentTime--;
            timerEl.textContent = 'Time: ' + currentTime;
        }
    }, 1000)

}

function startQuiz() {
    quizTitle.style.display = 'none';
    quizMessage.style.display = 'none';
    startButton.style.display = 'none';

    questions();
}


function questions() {
     if (currentTime === 0 || currentQuestion >= questionArray.length) {
        return checkHighScore();
    }

    questionEl.textContent = questionArray[currentQuestion].q

    answerEl.textContent = '';

    for (var i = 0; i < questionArray[currentQuestion].a.length; i++) {
        var answerbutton = document.createElement('button');
        answerbutton.textContent = questionArray[currentQuestion].a[i];
        answerbutton.style.display = 'block';
        answerbutton.style.borderRadius = '6px';
        answerbutton.style.backgroundColor = 'lightblue';
        answerbutton.style.margin = 'auto';
        answerbutton.style.padding = '8px';
        answerbutton.style.boxShadow = '1px 1px'
        answerbutton.addEventListener('click', function () {
            checkAnswer(this.textContent);
        });
        answerEl.appendChild(answerbutton);
    }
}



function checkAnswer(answer) {
    var correctSelected = questionArray[currentQuestion].correct;
    if (answer === correctSelected) {
        currentScore++;
    } else {
        currentTime -= 10;
    }

    currentQuestion++;
    questions();
}

function checkHighScore() {
    var currentHighScore = localStorage.getItem('quizHighScore');

    if (!currentHighScore || currentHighScore < currentScore) {
        alert('Your Score: ' + currentScore);
        var userInitials = prompt('Enter your initals')
        localStorage.setItem('quizHighScore', currentScore);
        localStorage.setItem('quizHighInitials', userInitials)
        alert('New High Score: ' + currentScore);
    } else {
        alert('Current score was not high enough' + '\r\n' + 'Your score: ' + currentScore);
    }
}

startButton.addEventListener('click', function () {
    startTimer();
    startQuiz();
});