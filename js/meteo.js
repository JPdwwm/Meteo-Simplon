// meteo.js
import { config } from './config.js';

async function loadCityName() {
    return fetch('./config.json')
        .then(response => response.json())
        .then(config => {
            if (!config.city || !config.city.zipCode) {
                console.error("La configuration du nom de la ville est invalide.");
                return Promise.reject("La configuration du nom de la ville est invalide.");
            }

            return config.city.zipCode;
        })
        .catch(error => {
            console.error("Erreur lors du chargement de la configuration de la ville :", error);
            return Promise.reject("Erreur lors du chargement de la configuration de la ville : " + error.message);
        });
}

function checkWeather() {
    loadCityName()
        .then(cityName => {
            if (!cityName) {
                console.error("Nom de ville invalide.");
                return Promise.reject("Nom de ville invalide.");
            }
            return fetch(config.apiUrl + cityName + `&appid=` + config.apiKey);
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données météorologiques :", error);
        });
}

    checkWeather();

    setInterval(checkWeather, 3600000);

