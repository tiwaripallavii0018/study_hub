// Toggle features dropdown
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('show');
}

// Simple login/signin simulation (toggle profile)
let isLoggedIn = false;
function login() {
    isLoggedIn = true;
    document.querySelector('.login-btn').style.display = 'none';
    document.querySelector('.signin-btn').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
    alert('Logged in! (Demo)');
}
function signin() {
    isLoggedIn = true;
    document.querySelector('.login-btn').style.display = 'none';
    document.querySelector('.signin-btn').style.display = 'none';
    document.getElementById('profile').style.display = 'block';
    alert('Signed in! (Demo)');
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

// Search placeholder (expand later)
document.getElementById('search').addEventListener('input', function() {
    console.log('Searching for:', this.value);
});