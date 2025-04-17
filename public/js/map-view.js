// Map initialization
let map;
let expandedMap;
let marker = null;
let userLocation;

// Initialize map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main map
    map = L.map('map').setView([20.5937, 78.9629], 5); // Centered on India with zoom level 5
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 3
    }).addTo(map);

    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                // Update map to user's location
                updateMapLocation(map, userLocation);
            },
            function(error) {
                console.error('Error getting location:', error);
                // If geolocation fails, use default location
                moveMarker(map, [20.5937, 78.9629]);
            }
        );
    }

    // Add click event to map
    setupMapClickEvents(map);

    // Setup expand/collapse functionality
    setupExpandMap();

    // Setup location button
    setupLocationButton(document.getElementById('getLocationBtn'), map);
});

function updateMapLocation(mapInstance, location) {
    mapInstance.setView([location.lat, location.lng], 15);
    moveMarker(mapInstance, [location.lat, location.lng]);
}

function moveMarker(mapInstance, latlng) {
    if (!marker) {
        // Create marker if it doesn't exist
        marker = L.marker(latlng, {
            draggable: true
        }).addTo(mapInstance);
        
        // Add dragend event
        marker.on('dragend', function(e) {
            const position = marker.getLatLng();
            
            // Keep marker on current map, just update coordinates
            marker.setLatLng(position);
            
            // If we're on the expanded map, sync position to main map
            if (mapInstance === expandedMap) {
                map.setView(position, map.getZoom());
            }
            // If we're on the main map, sync position to expanded map
            else if (mapInstance === map && expandedMap) {
                expandedMap.setView(position, expandedMap.getZoom());
            }
        });
    } else {
        // Move existing marker
        if (marker._map !== mapInstance) {
            marker.remove();
            marker.addTo(mapInstance);
        }
        marker.setLatLng(latlng);
    }
}

function setupMapClickEvents(mapInstance) {
    mapInstance.on('click', function(e) {
        moveMarker(mapInstance, e.latlng);
        
        // If we're on the expanded map, sync position to main map
        if (mapInstance === expandedMap) {
            map.setView(e.latlng, map.getZoom());
        }
        // If we're on the main map, sync position to expanded map
        else if (mapInstance === map && expandedMap) {
            expandedMap.setView(e.latlng, expandedMap.getZoom());
        }
    });
}

function setupExpandMap() {
    const expandBtn = document.getElementById('expandMapBtn');
    const closeBtn = document.getElementById('closeExpandedMap');
    const mapOverlay = document.getElementById('mapOverlay');
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = '<div class="spinner"></div><p>Loading map...</p>';
    mapOverlay.appendChild(loadingIndicator);

    expandBtn.addEventListener('click', function() {
        mapOverlay.classList.add('active');
        loadingIndicator.style.display = 'flex';

        // Initialize expanded map
        if (!expandedMap) {
            expandedMap = L.map('expandedMap').setView([20.5937, 78.9629], 5);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19,
                minZoom: 3
            }).addTo(expandedMap);

            // Add click event to expanded map
            setupMapClickEvents(expandedMap);

            // Setup location button for expanded map
            setupLocationButton(document.getElementById('expandedLocationBtn'), expandedMap);
        }

        // Sync expanded map with main map
        const center = map.getCenter();
        const zoom = map.getZoom();
        expandedMap.setView(center, zoom);

        // Move marker to expanded map if it exists
        if (marker) {
            const latlng = marker.getLatLng();
            marker.remove();
            marker.addTo(expandedMap);
            marker.setLatLng(latlng);
        }

        // Hide loading indicator after a short delay
        setTimeout(() => {
            loadingIndicator.style.display = 'none';
            expandedMap.invalidateSize();
        }, 500);
    });

    closeBtn.addEventListener('click', function() {
        mapOverlay.classList.remove('active');
        
        // Sync main map with expanded map
        if (expandedMap) {
            // If marker exists, center the main map on marker position
            if (marker) {
                const latlng = marker.getLatLng();
                // Move marker back to main map
                marker.remove();
                marker.addTo(map);
                marker.setLatLng(latlng);
                // Center main map on marker with appropriate zoom
                map.setView(latlng, 15);
            } else {
                // If no marker, just sync the view from expanded map
                const center = expandedMap.getCenter();
                const zoom = expandedMap.getZoom();
                map.setView(center, zoom);
            }
        }
    });

    // Also handle Escape key the same way
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mapOverlay.classList.contains('active')) {
            mapOverlay.classList.remove('active');
            
            // Sync main map with expanded map
            if (expandedMap && marker) {
                const latlng = marker.getLatLng();
                // Move marker back to main map
                marker.remove();
                marker.addTo(map);
                marker.setLatLng(latlng);
                // Center main map on marker with appropriate zoom
                map.setView(latlng, 15);
            }
        }
    });
}

function setupLocationButton(button, mapInstance) {
    if (!button) return;
    
    button.addEventListener('click', function() {
        if (navigator.geolocation) {
            button.classList.add('loading');
            
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    
                    // Update map to user's location
                    updateMapLocation(mapInstance, userLocation);
                    button.classList.remove('loading');
                },
                function(error) {
                    console.error('Error getting location:', error);
                    alert('Unable to get your location. Please make sure location services are enabled.');
                    button.classList.remove('loading');
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    });
} 