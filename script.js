const API_KEY = '99cab7169e114c5c8b8c009626a2a90e'; 
const container = document.querySelector('.container');
const optionsContainer = document.querySelector('.options-container');
const country = 'india'; 
let requestURL;

//fetch and display news 
const getNews = async () => {
    container.innerHTML = '';
    try {
        const response = await fetch(requestURL);
        if (!response.ok) throw new Error('Data unavailable');
        const data = await response.json();
        generateUI(data.articles);
    } catch (error) {
        container.innerHTML = `<p>${error.message}</p>`;
    }
};

// Generate news cards
const generateUI = (articles) => {
    articles.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('news-card');
        card.innerHTML = `
            <div class="news-image-container">
                <img src="${item.urlToImage || './default.jpg'}" alt="news image">
            </div>
            <div class="news-content">
                <div class="news-title">${item.title}</div>
                <div class="news-description">${item.description || 'No description available'}</div>
                <a href="${item.url}" target="_blank" class="view-button">Read More</a>
            </div>
        `;
        container.appendChild(card);
    });
};

// Category selection
const selectCategory = (category) => {
    document.querySelectorAll('.option').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`;
    getNews();
};

// Search news
const searchNews = (event) => {
    event.preventDefault();
    const query = document.getElementById('search-input').value.trim();
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
