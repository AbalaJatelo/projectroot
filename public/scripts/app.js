document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(loginForm);
            const username = formData.get('username');
            const password = formData.get('password');

            fetch('/login', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                if (data.includes('Invalid')) {
                    alert(data);
                } else {
                    localStorage.setItem('loggedInUser', JSON.stringify({ username }));
                    window.location.href = '/riders';
                }
            });
        });
    }

    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(signupForm);
            const isAdmin = formData.get('isAdmin') ? true : false;

            fetch('/signup', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(() => {
                localStorage.setItem('loggedInUser', JSON.stringify({ username: formData.get('username'), isAdmin }));
                window.location.href = '/riders';
            });
        });
    }
});
