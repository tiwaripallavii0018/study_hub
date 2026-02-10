// Existing code + search enhancement
function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('show');
}

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

function toggleTheme() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
    const toggleBtn = document.querySelector('.theme-toggle');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
}

document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const features = document.querySelectorAll('.dropdown li');
    features.forEach(li => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(query) ? 'block' : 'none';
    });
});