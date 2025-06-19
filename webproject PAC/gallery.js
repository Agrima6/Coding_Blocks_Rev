document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON data
    fetch('gallery.json')
        .then(response => response.json())
        .then(data => {
            const galleryGrid = document.getElementById('gallery-grid');
            
            data.categories.forEach(category => {
                // Create category div
                const categoryDiv = document.createElement('div');
                categoryDiv.classList.add('category');
                
                // Create category name
                const categoryTitle = document.createElement('h2');
                categoryTitle.textContent = category.name;
                categoryDiv.appendChild(categoryTitle);
                
                // Create image grid
                const imageGrid = document.createElement('div');
                imageGrid.classList.add('image-grid');
                
                category.images.forEach(imageUrl => {
                    const image = document.createElement('img');
                    image.src = imageUrl;
                    image.alt = `${category.name} image`;
                    imageGrid.appendChild(image);
                });

                // Add "View More" link
                const viewMoreLink = document.createElement('a');
                viewMoreLink.href = category.link;
                viewMoreLink.classList.add('view-more-overlay');
                viewMoreLink.textContent = 'View More';
                categoryDiv.appendChild(viewMoreLink);
                
                // Add image grid and "View more" link to category div
                categoryDiv.appendChild(imageGrid);
                galleryGrid.appendChild(categoryDiv);
            });
        })
        .catch(error => console.error('Error loading gallery data:', error));
});
