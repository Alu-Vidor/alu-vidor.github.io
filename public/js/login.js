document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Отправка запроса на сервер для проверки учетных данных
    fetch(`http://localhost:3000/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Перенаправление на административную панель
            window.location.href = 'http://localhost:3000/admin';
        } else {
            alert('Неверное имя пользователя или пароль');
        }
    })
    .catch(error => console.error('Ошибка:', error));
});
