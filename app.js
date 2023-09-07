const questionContainer = document.getElementById('question-container');
const startQuizButton = document.getElementById('start-quiz-button');
const userAnswerInput = document.getElementById('user-answer');
const submitAnswerButton = document.getElementById('submit-answer');
const answerInputContainer = document.getElementById('answer-input-container');
const addButton = document.getElementById('add-button');
const newQuestionInput = document.getElementById('new-question');
const newAnswerInput = document.getElementById('new-answer');
const startAgainButton = document.getElementById('start-again-button');
const quizResultContainer = document.getElementById('quiz-result-container'); // Variable for the result container

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

startAgainButton.addEventListener('click', () => {
    location.reload(); // Reload the page
});

addButton.addEventListener('click', () => {
    const newQuestionText = newQuestionInput.value.trim();
    const newAnswerText = newAnswerInput.value.trim();

    if (newQuestionText === '' || newAnswerText === '') {
        return;
    }

    const newQuestion = {
        question: newQuestionText,
        answers: [{ text: newAnswerText, correct: true }] // You can modify this based on your needs
    };

    questions.push(newQuestion);
    saveToLocalStorage(questions);

    newQuestionInput.value = '';
    newAnswerInput.value = '';

    // Reload questions from Local Storage to update the list
    questions = loadFromLocalStorage();

    // Set currentQuestionIndex to the index of the newly added question
    currentQuestionIndex = questions.length - 1;

    showQuestion(questions[currentQuestionIndex], currentQuestionIndex);
});

startQuizButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    startQuizButton.disabled = true;
    answerInputContainer.style.display = 'block';

    showQuestion(questions[currentQuestionIndex]);
});

submitAnswerButton.addEventListener('click', () => {
    const userAnswer = userAnswerInput.value.trim().toLowerCase();
    checkAnswer(userAnswer);

    userAnswerInput.value = '';
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
        
    }
});



function checkAnswer(userAnswer) {
    const correctAnswer = questions[currentQuestionIndex].answers[0].text.toLowerCase();
    if (userAnswer === correctAnswer) {
        score++;
    }
}

function showQuestion(question, index) {
    questionContainer.innerHTML = `
        <p>${question.question}</p>
    `;
}

function saveToLocalStorage(data) {
    localStorage.setItem('quizData', JSON.stringify(data));
}

function deleteQuestion(index) {
    questions.splice(index, 1);
    saveToLocalStorage(questions);

    if (questions.length > 0) {
        currentQuestionIndex = Math.min(currentQuestionIndex, questions.length - 1);
        showQuestion(questions[currentQuestionIndex], currentQuestionIndex);
    } else {
        questionContainer.innerText = 'No questions available.';
        startQuizButton.disabled = true;
        answerInputContainer.style.display = 'none';
    }
}

function showResult() {
    questionContainer.innerText = `Quiz completed! Your score is: ${score} out of ${questions.length}`;
    answerInputContainer.innerHTML = ''; // Clear the answer input container
    quizResultContainer.style.display = 'block'; // Show the quiz result container
}

// Load questions from local storage when the page loads
function loadFromLocalStorage() {
    const data = localStorage.getItem('quizData');
    return data ? JSON.parse(data) : [];
}

questions = loadFromLocalStorage();

if (questions.length > 0) {
    startQuizButton.disabled = false;
}

// Load questions from local storage when the page loads
questions = loadFromLocalStorage();

if (questions.length > 0) {
    startQuizButton.disabled = false;
    showQuestion(questions[currentQuestionIndex], currentQuestionIndex);
}