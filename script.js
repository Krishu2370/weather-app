const apiKey = 'e37abebaf9e2416836c454d19b4f3c28'; // Replace with your API key
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDataDiv = document.getElementById('weatherData');
const recentCitiesUl = document.getElementById('recentCities');

// Event Listener for Search Button
searchBtn.addEventListener('click', () => {
    const cinpmty = cityInput.value.trim();c
    if (city) {
        getWeather(city);
        saveRecentCity(city);
        cityInput.value = '';
    } else {
        alert('Please enter a city name');
    }
});

// Fetch Weather Data
async function getWeather(city) {
    try {
        const response = await fetch(`${apiBaseUrl}?q=${city}&appid=${apiKey}&units=metric`);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            alert('City not found');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Display Weather Data
function displayWeather(data) {
    weatherDataDiv.innerHTML = `
        <h2 class="text-xl font-bold">${data.name}, ${data.sys.country}</h2>
        <p class="text-4xl">${data.main.temp}°C</p>
        <p class="text-lg">${data.weather[0].main}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Save and Display Recently Searched Cities
function saveRecentCity(city) {
    let cities = JSON.parse(localStorage.getItem('recentCities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('recentCities', JSON.stringify(cities));
    }
    displayRecentCities();
}

function displayRecentCities() {
    let cities = JSON.parse(localStorage.getItem('recentCities')) || [];
    recentCitiesUl.innerHTML = '';
    cities.forEach(city => {
        let li = document.createElement('li');
        li.textContent = city;
        li.classList.add('cursor-pointer', 'text-blue-500', 'hover:underline');
        li.addEventListener('click', () => {
            getWeather(city);
        });
        recentCitiesUl.appendChild(li);
    });
}

// Initial Display of Recent Cities
document.addEventListener('DOMContentLoaded', displayRecentCities);
