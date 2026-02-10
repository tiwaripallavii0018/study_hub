// Sample questions (expand with your own; categorized by difficulty)
const questions = {
    easy: [
        { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: 0, topic: "Geography" },
        { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: 1, topic: "Math" },
        // Add more...
    ],
    moderate: [
        { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "Mark Twain", "Ernest Hemingway"], answer: 0, topic: "Literature" },
        { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 2, topic: "Science" },
        // Add more...
    ],
    exam: [
        { question: "In AWS, what does EC2 stand for?", options: ["Elastic Compute Cloud", "Easy Cloud Compute", "Elastic Cloud Compute", "None"], answer: 0, topic: "AWS" },
        { question: "What is the speed of light?", options: ["3x10^8 m/s", "3x10^6 m/s", "3x10^10 m/s", "3x10^4 m/s"], answer: 0, topic: "Physics" },
        // Add more...
    ]
};

let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let wrongAnswers = JSON.parse(localStorage.getItem('wrongAnswers')) || [];
let isRevisionMode = false;

// Load questions based on difficulty
document.getElementById('difficulty').addEventListener('change', loadQuiz);
loadQuiz();

function loadQuiz() {
    const difficulty = document.getElementById('difficulty').value;
    currentQuestions = questions[difficulty];
    currentQuestionIndex = 0;
    userAnswers = [];
    displayQuestion();
}

function startRevision() {
    if (wrongAnswers.length === 0) {
        alert('No wrong answers to revise!');
        return;
    }
    isRevisionMode = true;
    currentQuestions = wrongAnswers;
    currentQuestionIndex = 0;
    userAnswers = [];
    displayQuestion();
}

function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option" onclick="selectOption(${index})">${option}</div>
                `).join('')}
            </div>
        </div>
    `;
    updateControls();
}

function selectOption(index) {
    userAnswers[currentQuestionIndex] = index;
    const options = document.querySelectorAll('.option');
    options.forEach((opt, i) => opt.classList.toggle('selected', i === index));
    // Sound feedback (add your sound files)
    const audio = new Audio(index === currentQuestions[currentQuestionIndex].answer ? 'correct.mp3' : 'wrong.mp3');
    audio.play();
}

function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function updateControls() {
    document.getElementById('prev-btn').disabled = currentQuestionIndex === 0;
    document.getElementById('next-btn').style.display = currentQuestionIndex < currentQuestions.length - 1 ? 'inline' : 'none';
    document.getElementById('submit-btn').style.display = currentQuestionIndex === currentQuestions.length - 1 ? 'inline' : 'none';
}

function submitQuiz() {
    let score = 0;
    let topicStats = {};
    wrongAnswers = [];
    userAnswers.forEach((answer, index) => {
        const question = currentQuestions[index];
        if (answer === question.answer) {
            score++;
        } else {
            wrongAnswers.push(question);
        }
        topicStats[question.topic] = (topicStats[question.topic] || 0) + (answer === question.answer ? 1 : 0);
    });
    // Save to localStorage
    const attempts = JSON.parse(localStorage.getItem('quizAttempts')) || [];
    attempts.push({ score, total: currentQuestions.length, date: new Date().toISOString() });
    localStorage.setItem('quizAttempts', JSON.stringify(attempts));
    localStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));

    // Display results
    document.getElementById('quiz-content').style.display = 'none';
    document.querySelector('.controls').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    document.getElementById('score-display').textContent = `Score: ${score}/${currentQuestions.length}`;
    document.getElementById('topic-breakdown').textContent = `Topic Breakdown: ${Object.entries(topicStats).map(([topic, correct]) => `${topic}: ${correct}/${currentQuestions.filter(q => q.topic === topic).length}`).join(', ')}`;
}

// Reuse nav functions from index.html
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('show');
}
function login() { /* Same as index */ }
function signin() { /* Same as index */ }
function toggleTheme() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}