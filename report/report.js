// Handle form submission
document.getElementById('reportForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const photos = document.getElementById('photos').files;
    const description = document.getElementById('description').value;

    // Validate form
    if (description.trim() === '') {
        alert('Please provide a description of the issue');
        return;
    }

    // Here you would typically send the data to a server
    console.log('Submitting report:', {
        numberOfPhotos: photos.length,
        description: description
    });

    // Clear form
    this.reset();
    alert('Report submitted successfully!');
});

// Simple map placeholder
window.addEventListener('load', function() {
    const map = document.getElementById('map');
    
    // Add click event to simulate map interaction
    map.addEventListener('click', function(e) {
        const rect = map.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create a marker
        const marker = document.createElement('div');
        marker.style.position = 'absolute';
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
        marker.style.width = '10px';
        marker.style.height = '10px';
        marker.style.backgroundColor = 'red';
        marker.style.borderRadius = '50%';
        
        // Clear previous markers
        const markers = map.querySelectorAll('.marker');
        markers.forEach(m => m.remove());
        
        map.appendChild(marker);
        marker.classList.add('marker');
    });
});