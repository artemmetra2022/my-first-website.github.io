// Локальное хранилище для пользователей и сообщений
let users = JSON.parse(localStorage.getItem('users')) || [];
let messages = JSON.parse(localStorage.getItem('messages')) || [];

// Регистрация
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users.find(user => user.username === username)) {
        alert('Пользователь уже существует');
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Регистрация успешна');
    window.location.href = 'login.html';
});

// Вход
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'messages.html';
    } else {
        alert('Неверное имя пользователя или пароль');
    }
});

// Отправка сообщения
document.getElementById('messageForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const message = document.getElementById('message').value;
    const username = localStorage.getItem('currentUser');

    messages.push({ username, message });
    localStorage.setItem('messages', JSON.stringify(messages));
    document.getElementById('message').value = '';
    displayMessages();
});

// Отображение сообщений
function displayMessages() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = '';
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${msg.username}: ${msg.message}`;
        messagesDiv.appendChild(messageElement);
    });
}

// Показ сообщений при загрузке страницы
if (window.location.pathname.endsWith('messages.html')) {
    displayMessages();
}

