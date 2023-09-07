
// Include the necessary functions from app.js
function loadFromLocalStorage() {
    const data = localStorage.getItem('quizData');
    return data ? JSON.parse(data) : [];
}

function saveToLocalStorage(data) {
    localStorage.setItem('quizData', JSON.stringify(data));
}


// Get a reference to the questions container
const questionsContainer = document.getElementById('questions-container');

// Load questions from local storage when the page loads
const questions = loadFromLocalStorage();

// Display all questions and answers
questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-item');

    const questionText = document.createElement('p');
    questionText.textContent = `Question ${index + 1}: ${question.question}`;
    questionDiv.appendChild(questionText);

    const answerText = document.createElement('p');
    answerText.textContent = `Answer: ${question.answers[0].text}`;
    questionDiv.appendChild(answerText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteQuestion(index)); // Call deleteQuestion function on click
    questionDiv.appendChild(deleteButton);

    questionsContainer.appendChild(questionDiv);
});

// Function to delete a question
function deleteQuestion(index) {
    // Remove the question at the specified index from the array
    questions.splice(index, 1);
    
    // Update local storage with the modified array
    saveToLocalStorage(questions);

    // Reload the page to reflect changes
    location.reload();
}


