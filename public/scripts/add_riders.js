document.addEventListener('DOMContentLoaded', () => {
    const addRiderForm = document.getElementById('addRiderForm');

    if (addRiderForm) {
        addRiderForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(addRiderForm);

            fetch('/add-rider', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(() => {
                alert('Rider added successfully!');
                window.location.href = '/riders';
            });
        });
    }
});
