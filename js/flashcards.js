



// Sample flashcards for AWS CLF-C02 (expand with more)
const flashcards = [
    { question: "What is AWS?", answer: "Amazon Web Services is a cloud computing platform offering services like EC2, S3, and Lambda." },
    { question: "What does EC2 stand for?", answer: "Elastic Compute Cloud - a service for scalable virtual servers." },
    { question: "What is S3?", answer: "Simple Storage Service - object storage for data like files and backups." },
    { question: "Explain AWS pricing model.", answer: "Pay-as-you-go: pay for what you use, with options like On-Demand, Reserved, and Spot instances." },
    { question: "What is IAM?", answer: "Identity and Access Management - manages users, groups, and permissions." },
    { question: "What is a VPC?", answer: "Virtual Private Cloud - a logically isolated section of AWS for your resources." },
    { question: "What is CloudFormation?", answer: "A service for provisioning AWS infrastructure as code using templates." },
    { question: "Explain AWS regions and availability zones.", answer: "Regions are geographic areas (e.g., us-east-1); AZs are data centers within regions for redundancy." },
    { question: "What is RDS?", answer: "Relational Database Service - managed databases like MySQL, PostgreSQL." },
    { question: "What is the AWS Well-Architected Framework?", answer: "A guide for designing secure, high-performing, resilient, and efficient infrastructure." }
];

let currentIndex = 0;
let knownCards = JSON.parse(localStorage.getItem('knownCards')) || [];
let unknownCards = JSON.parse(localStorage.getItem('unknownCards')) || [];

loadCard();

function loadCard() {
    const card = flashcards[currentIndex];
    document.getElementById('question-text').textContent = card.question;
    document.getElementById('answer-text').textContent = card.answer;
    document.getElementById('current-card').textContent = currentIndex + 1;
    document.getElementById('total-cards').textContent = flashcards.length;
    document.getElementById('known-count').textContent = knownCards.length;
    document.getElementById('unknown-count').textContent = unknownCards.length;
    document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function nextCard() {
    currentIndex = (currentIndex + 1) % flashcards.length;
    loadCard();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
    loadCard();
}

function shuffleCards() {
    for (let i = flashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
    }
    currentIndex = 0;
    loadCard();
}

function markKnown() {
    if (!knownCards.includes(currentIndex)) {
        knownCards.push(currentIndex);
        localStorage.setItem('knownCards', JSON.stringify(knownCards));
        loadCard();
    }
}

function markUnknown() {
    if (!unknownCards.includes(currentIndex)) {
        unknownCards.push(currentIndex);
        localStorage.setItem('unknownCards', JSON.stringify(unknownCards));
        loadCard();
    }
}

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