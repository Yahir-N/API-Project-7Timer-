const ciudades = [
    { latitude: 52.367, longitude: 4.904, city: "Amsterdam", country: "Netherlands" },
    { latitude: 39.933, longitude: 32.859, city: "Ankara", country: "Turkey" },
    { latitude: 56.134, longitude: 12.945, city: "Ã…storp", country: "Sweden" },
    { latitude: 37.983, longitude: 23.727, city: "Athens", country: "Greece" },
    { latitude: 54.597, longitude: -5.93, city: "Belfast", country: "Northern Ireland" },
    { latitude: 41.387, longitude: 2.168, city: "Barcelona", country: "Spain" },
    { latitude: 52.52, longitude: 13.405, city: "Berlin", country: "Germany" },
    { latitude: 46.948, longitude: 7.447, city: "Bern", country: "Switzerland" },
    { latitude: 43.263, longitude: -2.935, city: "Bilbao", country: "Spain" },
    { latitude: 50.847, longitude: 4.357, city: "Brussels", country: "Belgium" },
    { latitude: 47.497, longitude: 19.04, city: "Bucharest", country: "Romania" },
    { latitude: 59.329, longitude: 18.068, city: "Budapest", country: "Hungary" },
    { latitude: 51.483, longitude: -3.168, city: "Cardiff", country: "Wales" },
    { latitude: 50.937, longitude: 6.96, city: "Cologne", country: "Germany" },
    { latitude: 55.676, longitude: 12.568, city: "Copenhagen", country: "Denmark" },
    { latitude: 51.898, longitude: -8.475, city: "Cork", country: "Ireland" },
    { latitude: 53.349, longitude: -6.26, city: "Dublin", country: "Ireland" },
    { latitude: 55.953, longitude: -3.188, city: "Edinburgh", country: "Scotland" },
    { latitude: 43.7696, longitude: 11.255, city: "Florence", country: "Italy" },
    { latitude: 50.11, longitude: 8.682, city: "Frankfurt", country: "Germany" },
    { latitude: 43.254, longitude: 6.637, city: "French Riviera", country: "France" },
    { latitude: 32.65, longitude: -16.908, city: "Funchal", country: "Portugal" },
    { latitude: 36.14, longitude: -5.353, city: "Gibraltar", country: "" },
    { latitude: 57.708, longitude: 11.974, city: "Gothenburg", country: "Sweden" },
    { latitude: 53.548, longitude: 9.987, city: "Hamburg", country: "Germany" },
    { latitude: 60.169, longitude: 24.938, city: "Helsinki", country: "Finland" },
    { latitude: 39.02, longitude: 1.482, city: "Ibiza", country: "Spain" },
    { latitude: 50.45, longitude: 30.523, city: "Kyiv", country: "Ukraine" },
    { latitude: 61.115, longitude: 10.466, city: "Lillehammer", country: "Norway" },
    { latitude: 38.722, longitude: -9.139, city: "Lisbon", country: "Portugal" },
    { latitude: 51.507, longitude: -0.127, city: "London", country: "England" },
    { latitude: 40.416, longitude: -3.703, city: "Madrid", country: "Spain" },
    { latitude: 39.695, longitude: 3.017, city: "Mallorca", country: "Spain" },
    { latitude: 53.48, longitude: -2.242, city: "Manchester", country: "England" },
    { latitude: 43.296, longitude: 5.369, city: "Marseille", country: "France" },
    { latitude: 27.76, longitude: -15.586, city: "Maspalomas", country: "Spain" },
    { latitude: 45.464, longitude: 9.19, city: "Milan", country: "Italy" },
    { latitude: 48.135, longitude: 11.582, city: "Munich", country: "Germany" },
    { latitude: 40.851, longitude: 14.268, city: "Naples", country: "Italy" },
    { latitude: 43.034, longitude: -2.417, city: "OÃ±ati", country: "Spain" },
    { latitude: 59.913, longitude: 10.752, city: "Oslo", country: "Norway" },
    { latitude: 48.856, longitude: 2.352, city: "Paris", country: "France" },
    { latitude: 50.075, longitude: 14.437, city: "Prague", country: "Czech Republic" },
    { latitude: 64.146, longitude: -21.942, city: "ReykjavÃ­k", country: "Iceland" },
    { latitude: 56.879, longitude: 24.603, city: "Riga", country: "Latvia" },
    { latitude: 41.902, longitude: 12.496, city: "Rome", country: "Italy" },
    { latitude: 39.453, longitude: -31.127, city: "Santa Cruz das Flores", country: "Portugal" },
    { latitude: 28.463, longitude: -16.251, city: "Santa Cruz de Tenerife", country: "Spain" },
    { latitude: 57.273, longitude: -6.215, city: "Skye", country: "Scotland" },
    { latitude: 42.697, longitude: 23.321, city: "Sofia", country: "Bulgaria" },
    { latitude: 59.329, longitude: 18.068, city: "Stockholm", country: "Sweden" },
    { latitude: 59.437, longitude: 24.753, city: "Tallinn", country: "Estonia" },
    { latitude: 18.208, longitude: 16.373, city: "Vienna", country: "Austria" },
    { latitude: 52.229, longitude: 21.012, city: "Warsaw", country: "Poland" },
    { latitude: 53.961, longitude: -1.07, city: "York", country: "England" },
    { latitude: 47.376, longitude: 8.541, city: "Zurich", country: "Switzerland" }
];

let chartInstance;
const form = document.getElementById('cityForm');
const select = document.getElementById('citySelect');
const weatherInfo = document.getElementById('weatherInfo');

//Se llena el select con las ciudades dentro de la const
ciudades.forEach(ciudad => {
    const option = document.createElement('option');
    option.textContent = `${ciudad.city}, ${ciudad.country}`;
    option.value = JSON.stringify(ciudad);
    select.appendChild(option);
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedCity = JSON.parse(select.value);
    getWeather(selectedCity.latitude, selectedCity.longitude);
});

//para ocultar la animación de carga
document.getElementById('loader').classList.add('hidden');


document.getElementById('cityForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const loader = document.getElementById('loader');
    const citySelect = document.getElementById('citySelect');
    const selectedCity = JSON.parse(citySelect.value);

    //Mostrar la animación de carga
    loader.classList.remove('hidden');

    //Obtener las coordenadas de la ciudad seleccionada y mostrar el clima
    getWeather(selectedCity.latitude, selectedCity.longitude);
});

function getWeather(latitude, longitude) {
    const url = `http://www.7timer.info/bin/api.pl?lon=${longitude}&lat=${latitude}&product=astro&output=json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            //Se procesan los datos para obtener el clima de los siguientes 6 días
            const next7DaysData = data.dataseries.slice(0, 7);
            const temperatures = next7DaysData.map(day => day.temp2m);

            //Dibujar el gráfico
            drawTemperatureChart(temperatures, 'Celsius');

            //Ocultar la animación de carga una vez que se han cargado los datos
            document.getElementById('loader').classList.add('hidden');
        })
        .catch(error => {
            console.error('Hubo un error al obtener el clima:', error);
            // En caso de error, también se debería ocultar la animación de carga
            document.getElementById('loader').classList.add('hidden');
        });
}
//Crear el gráfico inicialmente con una leyenda predeterminada
const ctx = document.getElementById('temperatureChart').getContext('2d');
chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature', 
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            fill: false
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

function drawTemperatureChart(temperatures, unit) {
    const loader = document.getElementById('loader');
    loader.classList.remove('hidden'); // Mostrar la animación de carga

    const convertedTemperatures = unit === 'F' ? temperatures.map(celsiusToFahrenheit) : temperatures;

    // Actualizar los datos del gráfico
    chartInstance.data.labels = generateDates();
    chartInstance.data.datasets[0].data = convertedTemperatures;
    chartInstance.data.datasets[0].label = `Temperature (${unit})`; // Actualizar la leyenda con la unidad seleccionada
    chartInstance.update(); // Actualizar el gráfico

    // Ocultar la animación de carga una vez que se ha actualizado el gráfico
    loader.classList.add('hidden');
}
function celsiusToFahrenheit(temperatureCelsius) {
    return (temperatureCelsius * 9/5) + 32;
}

document.getElementById('temperatureUnit').addEventListener('change', function(event) {
    const unit = event.target.value;
    const temperatures = chartInstance.data.datasets[0].data; // Usar directamente el arreglo de temperaturas del gráfico
    drawTemperatureChart(temperatures, unit);
});

function generateDates() {
    const dates = [];
    const today = new Date();
    dates.push(formatDate(today)); //Se agrega ña fecha de hoy

    for (let i = 1; i < 7; i++) {
        const nextDay = new Date();
        nextDay.setDate(today.getDate() + i);
        dates.push(formatDate(nextDay)); //Se agrega la fecha de los próximos 6 días
    }

    return dates;
}

function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

function clearTemperatureChart() {
    const ctx = document.getElementById('temperatureChart').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

document.getElementById('cityForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se envíe el formulari
    const loader = document.getElementById('loader');
    const citySelect = document.getElementById('citySelect');
    const selectedCity = JSON.parse(citySelect.value);
    loader.classList.remove('hidden');
    document.getElementById('temperatureUnit').value = 'C';
    getWeather(selectedCity.latitude, selectedCity.longitude);
});

