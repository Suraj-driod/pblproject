// Mock data for posts
const posts = [
    {
        id: 1,
        username: "Alex shivamson",
        avatar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="avatar-svg"><path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" /></svg>',
        timestamp: "2 hours ago",
        title: "Road Damage on Main Street",
        description: "Large pothole causing traffic issues and potential damage to vehicles.",
        location: "Downtown",
        status: "in-progress",
        image: "../files/placeholderimg.jpg",
        upvotes: 32,
        comments: 8
    },
    {
        id: 2,
        username: "Sarah Williams",
        avatar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="avatar-svg"><path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" /></svg>',
        timestamp: "5 hours ago",
        title: "Water Supply Issue",
        description: "No water supply in the area for the past 24 hours.",
        location: "West End",
        status: "resolved",
        image: "../files/placeholderimg.jpg",
        upvotes: 45,
        comments: 12
    },
    {
        id: 3,
        username: "Mike Chen",
        avatar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="avatar-svg"><path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" /></svg>',
        timestamp: "1 day ago",
        title: "Garbage Collection Delay",
        description: "Garbage hasn't been collected for 3 days in our neighborhood.",
        location: "North District",
        status: "in-progress",
        image: "../files/placeholderimg.jpg",
        upvotes: 28,
        comments: 5
    },
    {
        id: 4,
        username: "Emma Davis",
        avatar: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="avatar-svg"><path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" /></svg>',
        timestamp: "3 days ago",
        title: "Street Light Outage",
        description: "Multiple street lights not working on Oak Avenue.",
        location: "East Side",
        status: "resolved",
        image: "../files/placeholderimg.jpg",
        upvotes: 15,
        comments: 3
    }
];

// Filter types
const filters = [
    { id: 'nearby', icon: '📍', label: 'Nearby' },
    { id: 'trending', icon: '🔥', label: 'Trending' },
    { id: 'recent', icon: '🕒', label: 'Recent' },
    { id: 'resolved', icon: '✅', label: 'Resolved' },
    { id: 'in-progress', icon: '🔄', label: 'In Progress' }
];

// Function to create filter buttons
function createFilterButtons() {
    const filterContainer = document.querySelector('.filter-bar');
    filters.forEach(filter => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.innerHTML = `${filter.icon} ${filter.label}`;
        button.dataset.filter = filter.id;
        button.addEventListener('click', () => filterPosts(filter.id));
        filterContainer.appendChild(button);
    });
}

// Function to filter posts
function filterPosts(filterType) {
    const postContainer = document.querySelector('.feed');
    postContainer.innerHTML = '';
    
    let filteredPosts = [...posts];
    
    switch(filterType) {
        case 'nearby':
            filteredPosts.sort((a, b) => a.location.localeCompare(b.location));
            break;
        case 'trending':
            filteredPosts.sort((a, b) => (b.upvotes + b.comments) - (a.upvotes + a.comments));
            break;
        case 'recent':
            filteredPosts.sort((a, b) => {
                const timeA = parseInt(a.timestamp);
                const timeB = parseInt(b.timestamp);
                return timeA - timeB;
            });
            break;
        case 'resolved':
            filteredPosts = posts.filter(post => post.status === 'resolved');
            break;
        case 'in-progress':
            filteredPosts = posts.filter(post => post.status === 'in-progress');
            break;
    }
    
    renderPosts(filteredPosts);
}

// Function to render posts
function renderPosts(postsToRender) {
    const postContainer = document.querySelector('.feed');
    postContainer.innerHTML = '';
    
    postsToRender.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <div class="user-info">
                    <div class="avatar">
                        ${post.avatar}
                    </div>
                    <div class="user-details">
                        <span class="username">${post.username}</span>
                        <span class="post-time">${post.timestamp}</span>
                    </div>
                </div>
            </div>
            <div class="post-content">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-description">${post.description}</p>
                <img src="${post.image}" alt="Issue Image" class="post-image">
                <div class="post-tags">
                    <span class="location-tag">📍 ${post.location}</span>
                    <span class="status-tag ${post.status}">${post.status === 'resolved' ? '✅ Resolved' : '🔄 In Progress'}</span>
                </div>
            </div>
            <div class="post-actions">
                <button class="upvote-btn">
                    <span class="upvote-icon">👍</span>
                    <span class="upvote-count">${post.upvotes}</span>
                </button>
                <button class="comment-btn">
                    <span class="comment-icon">💬</span>
                    <span class="comment-count">${post.comments}</span>
                </button>
                <button class="share-btn">
                    <span class="share-icon">📤</span>
                </button>
            </div>
        `;
        postContainer.appendChild(postElement);
    });
}

// Initialize the feed when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createFilterButtons();
    renderPosts(posts);
}); 