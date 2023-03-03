// Your code here
//Create questions for quiz
var questionsArr = [
    {question: 'The “Big Four” fashion capitals of the 21st century include New York, London, Paris, and...', 
    answer: 'Milan',
    options: [
        'Florence',
        'Milan',
        'Kyoto',
        'Johannesburg',
                 ]
    },
    {question: 'Which decade was espeacially associated with miniskirts?',
    answer: '1960s',
    options: [
        '1950s',
        '1960s',
        '1970s',
        '1980s',
    ]
    },
    {question: 'In which year did the French engineer Louis Reard invent bikini?',
    answer: '1946',
    options: [
        '1912',
        '2013',
        '1946',
        '1850',
    ]
    },
    {question: 'Which of the following fashion houses was founded first?',
    answer: 'Louis Vuitton',
    options: [
        'Prada',
        'Dior',
        'Louis Vuitton',
        'Yves Saint Laurent',
    ]
    },
    {question: 'Which of the following is a lifestyle and fashion magazine?',
    answer: 'Vogue',
    options: [
        'Forbes',
        'Time',
        'Vogue',
        'Home & Gardens',
        ]
        },
    {question: 'How many times a year does the New York Fashion Week take place?',
    answer: '2 times',
    options: [
        'Never',
        '1 time',
        '2 times',
        '3 times',
        ]
        },
]
//What variables will I need
//What text elements do I need to create
var quiz = document.querySelector('#quiz')
var timer = document.querySelector('#timer')
var timer = document.createElement('p')
var question = document. createElement('p')
var score
var finalScore
var finalScoreEl = document.createElement('p')
var currentQuestion 
var answerBtn = document.createElement('button')
var timeRemaining
var timerEl

//Need a working timer

function startTimer(){
    timerEl = setInterval(function() {
      timeRemaining--
      if (timeRemaining > 0){
        timer.textContent = timeRemaining
      } else {
        clearInterval(timerEl)
        currentQuestion++
        if(currentQuestion < questionsArr.length){
          getQuestion()
        } else {
          endQuiz()
        }
      }
    }, 1000)
  }
  
//Need to start game
function startQuiz(){
  score = 0
  currentQuestion = 0
  quiz.innerHTML = ''
  finalScore = localStorage.getItem('previous-score')
  if (finalScore){
    finalScoreEl.textContent = 'Score: ' + finalScore
    quiz.appendChild(finalScoreEl)
  }
  answerBtn.id = 'start-quiz'
  answerBtn.textContent = "Start Quiz"
  quiz.appendChild(answerBtn)
}

//Need the quiz game to function
function getQuestion(){
timeRemaining = 30
quiz.innerHTML = ""
  var questionAsked = questionsArr[currentQuestion]
  question.textContent = questionAsked.question
  quiz.appendChild(question)
  var choices = document.createElement('div')
  choices.id = 'choices'
  quiz.appendChild(choices)
  questionAsked.options.forEach(function(choice){
    var choiceBtn = document.createElement('button')
    choiceBtn.textContent = choice
    choices.appendChild(choiceBtn)
  })
  timer.id = 'timer'
  timer.textContent = timeRemaining
  quiz.appendChild(timer)
  startTimer()
}
quiz.onclick = function(e) {
    if (e.target.id === 'start-quiz') {
      getQuestion()
    } else if (e.target.parentElement.id === 'choices'
    && e.target.tagName === 'BUTTON'){
      if(e.target.textContent === questionsArr[currentQuestion].answer){
        score++
      }
      clearInterval(timerEl)
      currentQuestion++
      if (currentQuestion < questionsArr.length){
        getQuestion()
      } else {
        endQuiz()
      }
    }
  }

//When quiz ends need the score
function endQuiz() {
  quiz.innerHTML = ""
  var percentage = Math.round(score / questionsArr.length * 100) + '%'
  localStorage.setItem('previous-score', percentage)
  startQuiz()
}

startQuiz()