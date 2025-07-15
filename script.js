/**
 * Simple authentication and profile rendering logic.
 * This is a demo and does NOT use secure authentication.
 */

// Mock user data
const users = [
    { username: "animefan", password: "123456", name: "Anime Fan", avatar: "https://i.pravatar.cc/100?img=1" },
    { username: "otaku", password: "qwerty", name: "Otaku", avatar: "https://i.pravatar.cc/100?img=2" }
];

// DOM elements
const loginForm = document.getElementById('login-form');
const profileSection = document.getElementById('profile');
const logoutBtn = document.getElementById('logout-btn');

// Check if user is logged in
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Render profile
function renderProfile(user) {
    profileSection.innerHTML = `
        <div class="profile-card">
            <img src="${user.avatar}" alt="Avatar" class="avatar">
            <h2>${user.name}</h2>
            <p>@${user.username}</p>
            <button id="logout-btn">Logout</button>
        </div>
    `;
    profileSection.style.display = 'block';
    if (loginForm) loginForm.style.display = 'none';
    document.getElementById('logout-btn').onclick = logout;
}

// Render login form
function renderLogin() {
    if (loginForm) loginForm.style.display = 'block';
    profileSection.style.display = 'none';
}

// Handle login
function login(event) {
    event.preventDefault();
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        renderProfile(user);
    } else {
        alert('Invalid credentials');
    }
}

// Handle logout
function logout() {
    localStorage.removeItem('currentUser');
    renderLogin();
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    if (user) {
        renderProfile(user);
    } else {
        renderLogin();
    }
    if (loginForm) loginForm.onsubmit = login;
});