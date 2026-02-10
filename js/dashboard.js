// Load data from localStorage
const quizAttempts = JSON.parse(localStorage.getItem('quizAttempts')) || [];
const knownCards = JSON.parse(localStorage.getItem('knownCards')) || [];
const unknownCards = JSON.parse(localStorage.getItem('unknownCards')) || [];

// Calculate stats
const totalQuizzes = quizAttempts.length;
const avgScore = totalQuizzes > 0 ? (quizAttempts.reduce((sum, attempt) => sum + (attempt.score / attempt.total), 0) / totalQuizzes * 100).toFixed(1) : 0;

// Topic analysis (assuming topics from quiz.js)
const topicStats = {};
quizAttempts.forEach(attempt => {
    // Simplified: Assume each attempt has a topic (expand if needed)
    const topic = 'General'; // Placeholder; update based on your quiz data
    if (!topicStats[topic]) topicStats[topic] = { correct: 0, total: 0 };
    topicStats[topic].correct += attempt.score;
    topicStats[topic].total += attempt.total;
});
const weakestTopic = Object.keys(topicStats).reduce((a, b) => (topicStats[a].correct / topicStats[a].total) < (topicStats[b].correct / topicStats[b].total) ? a : b, 'N/A');
const strongestTopic = Object.keys(topicStats).reduce((a, b) => (topicStats[a].correct / topicStats[a].total) > (topicStats[b].correct / topicStats[b].total) ? a : b, 'N/A');

// Streak counter (simplified: based on consecutive quiz days)
let streak = 0;
const today = new Date().toDateString();
const lastAttempt = localStorage.getItem('lastAttemptDate');
if (lastAttempt === today) {
    streak = parseInt(localStorage.getItem('streak')) || 0;
} else if (lastAttempt) {
    const lastDate = new Date(lastAttempt);
    const diff = (new Date() - lastDate) / (1000 * 60 * 60 * 24);
    if (diff === 1) streak = (parseInt(localStorage.getItem('streak')) || 0) + 1;
    else streak = 1;
} else {
    streak = totalQuizzes > 0 ? 1 : 0;
}
localStorage.setItem('streak', streak);
localStorage.setItem('lastAttemptDate', today);

// Update DOM
document.getElementById('total-quizzes').textContent = totalQuizzes;
document.getElementById('avg-score').textContent = `${avgScore}%`;
document.getElementById('weakest-topic').textContent = weakestTopic;
document.getElementById('strongest-topic').textContent = strongestTopic;
document.getElementById('streak').textContent = `${streak} days`;
document.getElementById('known-flashcards').textContent = knownCards.length;

// Charts with Chart.js
const ctxScore = document.getElementById('scoreChart').getContext('2d');
new Chart(ctxScore, {
    type: 'bar',
    data: {
        labels: quizAttempts.map((_, i) => `Attempt ${i + 1}`),
        datasets: [{
            label: 'Score (%)',
            data: quizAttempts.map(attempt => (attempt.score / attempt.total * 100)),
            backgroundColor: '#ff6b35'
        }]
    }
});

const ctxTopic = document.getElementById('topicChart').getContext('2d');
new Chart(ctxTopic, {
    type: 'pie',
    data: {
        labels: Object.keys(topicStats),
        datasets: [{
            data: Object.values(topicStats).map(stat => stat.correct / stat.total * 100),
            backgroundColor: ['#ff6b35', '#ffa500', '#32cd32']
        }]
    }
});

// Badges
if (avgScore > 80) document.getElementById('quiz-master').classList.add('unlocked');
if (streak >= 7) document.getElementById('streak-king').classList.add('unlocked');
if (knownCards.length >= 50) document.getElementById('flashcard-pro').classList.add('unlocked');

// Reuse nav functions
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
