document.addEventListener('DOMContentLoaded', () => {
    const ridersList = document.getElementById('ridersList');
    const searchInput = document.getElementById('searchInput');

    fetch('/riders-data')
        .then(response => response.json())
        .then(riders => {
            displayRiders(riders);

            searchInput.addEventListener('input', function() {
                const filteredRiders = riders.filter(rider =>
                    rider.id.includes(this.value) || rider.name.toLowerCase().includes(this.value.toLowerCase())
                );
                displayRiders(filteredRiders);
            });
        });

    function displayRiders(riders) {
        ridersList.innerHTML = '';

        riders.forEach(rider => {
            const riderItem = document.createElement('div');
            riderItem.classList.add('rider-item');

            riderItem.innerHTML = `
                <p>ID: ${rider.id}</p>
                <p>Name: ${rider.name}</p>
                <img src="${rider.qrCodeData}" alt="QR Code">
            `;

            ridersList.appendChild(riderItem);
        });
    }
});
