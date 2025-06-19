document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON data
    fetch('home.json')
        .then(response => response.json())
        .then(data => {
            // Load events dynamically
            const eventCardsContainer = document.getElementById('event-cards');
            data.events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.classList.add('event');
                eventCard.innerHTML = `
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <button>${event.buttonText}</button>
                `;
                eventCardsContainer.appendChild(eventCard);
            });

            // Load gallery images dynamically
            const galleryGrid = document.getElementById('gallery-grid');
            data.galleryImages.forEach(imageUrl => {
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = "Captured Moment";
                galleryGrid.appendChild(image);
            });
        })
        .catch(error => console.error('Error loading home data:', error));
});
