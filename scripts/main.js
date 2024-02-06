let myArr = [
  {
    question: 'Science: What is the chemical symbol for the element oxygen?',
    options: ['O', 'Ox', 'Og', 'On'],
    correctAnswer: 'O'
  },
  {
    question: 'Geography: Which is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 'Pacific Ocean'
  },
  {
    question: 'Art: Who painted the Mona Lisa?',
    options: ['Vincent Van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
    correctAnswer: 'Leonardo da Vinci'
  },
  {
    question: 'History: Who was the first president of the United States?',
    options: ['George Washington', 'Thomas Jefferson', 'Abraham Lincoln', 'John Adams'],
    correctAnswer: 'George Washington'
  },
  {
    question: 'Mathematics: What is the square root of 144?',
    options: ['10', '12', '14', '16'],
    correctAnswer: '12'
  },
  {
    question: 'Literature: Who wrote "To Kill a Mockingbird',
    options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
    correctAnswer: 'Harper Lee'
  },
  {
    question: 'Science: What is the atomic number of hydrogen?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '1'
  },
  {
    question: 'Geography: What is the capital of Australia?',
    options: ['Sydney', 'Melbourne', 'Perth', 'Canberra'],
    correctAnswer: 'Canberra'
  },
  {
    question: 'Sports: In which sport would you perform a slam dunk?',
    options: ['Baseball', 'Basketball', 'Volleyball', 'Tennis' ],
    correctAnswer: 'Basketball'
  },
  {
    question: 'Astronomy: Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars'
  },
  {
    question: 'Technology: Who are the founders of Google?',
    options: ['Steve Jobs and Steve Wozniak', 'Bill Gates and Paul Allen', 'Larry Page and Sergey Brin', 'Mark Zuckerberg and Eduardo Saverin' ],
    correctAnswer: 'Larry Page and Sergey Brin'
  },
  {
    question: 'History: Who discovered America?',
    options: ['Christopher Columbus', 'Leif Erikson', 'Ferdinand Magellan', 'Marco Polo'],
    correctAnswer: 'Christopher Columbus'
  },
  {
    question: 'Biology: What is the powerhouse of the cell?',
    options: ['Nucleus', 'Endoplasmic Reticculum', 'Mitochondria', 'Heart'],
    correctAnswer: 'Mitochondria'
  }
  ];

  window.onload = () => {
    let score = 0;
let timer = 30;

function getRandomQuestions(myArr) {
  let selectedQuestions = [];

  for (let i = 0; i < 10; i++) {
    let randomIndex = Math.floor(Math.random() * myArr.length);
    selectedQuestions.push(myArr[randomIndex]);
    myArr.splice(randomIndex, 1);
  }
  return selectedQuestions;
};

function createQuizContent(questions) {
  let html = '';
  
  for (let i = 0; i < questions.length; i++) {
    html += `
    <div class="question js-question">${questions[i].question}</div>
    <div class="options-container">
    `;
    for (let j = 0; j < questions[i].options.length; j++) {
      html+= `
      <label class="option js-option">
      <input type="radio" name="choice-${i}" value="${questions[i].options[j]}">${questions[i].options[j]}
      </label>
      `;
    }
    html += `</div>`;
  }
  return html;
};

function getSelectedAnswer (questions) {
  let quizContainer = document.querySelector('.js-quiz-container');
  quizContainer.addEventListener('change', (event) => {
  if (event.target.type === 'radio') {
    const selectedOption = event.target.value;
    for(let i = 0; i < questions.length; i++) {
      if (selectedOption === questions[i].correctAnswer) {
        score += 1;
      }
    }
  }
  })
};

let startButton = document.querySelector('.js-start-button');
startButton.addEventListener('click', function() {
  let selectedQuestions = getRandomQuestions(myArr);
  let quizContent = createQuizContent(selectedQuestions);
  document.querySelector('.js-quiz-container').innerHTML = quizContent;
  getSelectedAnswer(selectedQuestions);

  let timerElement = document.querySelector('.js-timer');
  let quizContainer = document.querySelector('.js-quiz-container');
  let interval = setInterval(function() {
    timer--;
    timerElement.textContent = `Time remaining: ${timer} seconds`;
    if (timer <= 0 || score === selectedQuestions.length) {
      clearInterval(interval);
      quizContainer.innerHTML = '';
      timerElement.textContent = `Game Over! Your score is ${score}.`;

      localStorage.setItem('score', score);
    }
  }, 1000);
});


let resetButton = document.querySelector('.js-reset-button');
resetButton.addEventListener('click', function() {
  document.querySelector('.js-quiz-container').innerHTML = '';
  score = 0;
  timer = 30;
});

  }