document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const errorMessage = document.getElementById('errorMessage');
    let loginAttempts = 0;

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    // Redirect based on user type
                    window.location.href = result.isAdmin ? '/admin-dashboard.html' : '/riders.html';
                } else {
                    loginAttempts++;
                    errorMessage.textContent = 'Incorrect username or password.';

                    if (loginAttempts >= 3) {
                        errorMessage.textContent += ' Please wait 30 seconds before trying again.';
                        loginForm.querySelector('button').disabled = true;
                        
                        setTimeout(() => {
                            loginForm.querySelector('button').disabled = false;
                            errorMessage.textContent = '';
                            loginAttempts = 0;
                        }, 30000); // 30-second timer
                    }
                }
            });
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            fetch('/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    window.location.href = '/login.html';
                }
            });
        });
    }
});

// public/auth.js

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const result = await response.json();
            if (result.role === 'admin') {
                window.location.href = 'add_rider.html'; // Redirect admin to add rider page
            } else {
                window.location.href = 'riders.html'; // Redirect normal users to rider list
            }
        } else {
            const result = await response.json();
            document.getElementById('error-message').textContent = result.message || 'Failed to log in';
        }
    } catch (error) {
        console.error(error);
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
    }
});

