// meteo.js
import { config } from './config.js';

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function loadCityName() {
    try {
        const response = await fetch('./config.json');
        const config = await response.json();

    if (!config.city || !config.city.name) {
        console.error("La configuration du nom de la ville est invalide.");
        return null;
    }

        return config.city.name;
    } catch (error) {
        console.error("Erreur lors du chargement de la configuration de la ville :", error);
        return null;
    }}

    async function checkWeather() {
        try {
            const cityName = await loadCityName();

        if (!cityName) {
            console.error("Nom de ville invalide.");
            return;
        }

        const response = await fetch(apiUrl + cityName + `&appid=${config.apiKey}`);
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        } catch (error) {
        console.error("Erreur lors de la récupération des données météorologiques :", error);
        }
    }
      // Appel de la fonction pour afficher les informations de la ville configurée
    checkWeather();

