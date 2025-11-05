const API_KEY = '911e3b7b3ae94f0d87c0a5b76456875c'; 
const container = document.querySelector('.container');
const optionsContainer = document.querySelector('.options-container');
const country = 'in'; // Fixed country code
let requestURL;

// Fetch and display news 
const getNews = async () => {
    console.log('Request URL:', requestURL);
    container.innerHTML = '';
    try {
        const response = await fetch(requestURL);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Data unavailable');
        }
        const data = await response.json();
        console.log('API Response:', data);
        generateUI(data.articles);
    } catch (error) {
        console.error('Error:', error.message);
        container.innerHTML = `<p>Error: ${error.message}</p>`;
    }
};

// Generate news cards
const generateUI = (articles) => {
    if (!articles || articles.length === 0) {
        container.innerHTML = '<p>No articles found</p>';
        return;
    }
    articles.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('news-card');
        card.innerHTML = `
            <div class="news-image-container">
                <img src="${item.urlToImage || './default.jpg'}" alt="news image">
            </div>
            <div class="news-content">
                <div class="news-title">${item.title || 'No title'}</div>
                <div class="news-description">${item.description || 'No description available'}</div>
                <a href="${item.url}" target="_blank" class="view-button">Read More</a>
            </div>
        `;
        container.appendChild(card);
    });
};

// Category selection
const selectCategory = (category) => {
    console.log('Selected Category:', category);
    document.querySelectorAll('.option').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    // Use localhost or proxy URL if deployed
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;
    getNews();
};

// Search news
const searchNews = (event) => {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    console.log('Search Query:', query);
    if (query) {
        requestURL = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
        getNews();
    }
};

// Initialize app
const init = () => {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${API_KEY}`;
    getNews();
};

window.onload = init;
