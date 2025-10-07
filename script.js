// Replace with your actual API keys
const UNSPLASH_ACCESS_KEY = 'iPBVqBHkfRG8jYNVjNM3SqZpYLa_mQ-okr7D2J_b7o4'; 
const OPENWEATHER_API_KEY = 'f3865ef378a7e2a98fb787b249cbe96f';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfoDiv = document.getElementById('weather-info');
const imageGalleryDiv = document.getElementById('image-gallery');
const messageDiv = document.getElementById('message');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
        fetchImages(city);
    } else {
        alert('Please enter a city or country.');
    }
});

async function fetchWeatherData(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Location not found.');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfoDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

async function fetchImages(location) {
    const url = `https://api.unsplash.com/search/photos?query=${location}&per_page=9&client_id=${UNSPLASH_ACCESS_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No images found for this location.');
        }
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        imageGalleryDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp}°C</p>
        <img src="${iconUrl}" alt="${weather[0].description}">
        <p>Humidity: ${main.humidity}%</p>
    `;
}

function displayImages(images) {
    imageGalleryDiv.innerHTML = '';
    if (images.length === 0) {
        imageGalleryDiv.innerHTML = '<p>No images available for this destination.</p>';
        return;
    }
    images.forEach(image => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';
        const img = document.createElement('img');
        img.src = image.urls.regular;
        img.alt = image.alt_description;
        imgContainer.appendChild(img);
        imageGalleryDiv.appendChild(imgContainer);
    });
}