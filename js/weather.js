const updateWeatherElement = (content) => {
  document.getElementById('weather').innerHTML = content;
};

const fetchWeather = async (lat, lon) => {
  const url = `${'https://api.open-meteo.com/v1/forecast'}?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const response = await fetch(url);
  const data = await response.json();
  return data.current_weather;
};

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export async function getWeather() {
  try {
    updateWeatherElement('get weather data...');

    const position = await getPosition();
    const {latitude, longitude} = position.coords;

    const weather = await fetchWeather(latitude, longitude);
    const weatherInfo = `
    <h3>Weather:</h3>
      <p>&#x1F321; Temp: ${weather.temperature}°C</p>
      <p>&#x1f32a; Wind: ${weather.windspeed} km/h</p>
    `;

    updateWeatherElement(weatherInfo);
  } catch (error) {
    console.error('Error:', error);
    if (error.code === 1) {
      updateWeatherElement('Please, enable geolocation');
    } else {
      updateWeatherElement('Fail to get weather data. Try again later');
    }
  }
}
