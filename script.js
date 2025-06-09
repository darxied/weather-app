const apiKey = "8b34acb0db77b62e93dcbd2478908bbf";

document.getElementById("weatherForm").addEventListener("submit", function(e) {
  e.preventDefault();
  getWeather();
});

function showLoader(show) {
  document.getElementById("loader").style.display = show ? "block" : "none";
}

function showError(msg) {
  document.getElementById("errorMsg").textContent = msg || "";
}

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");
  showError("");
  resultDiv.innerHTML = "";

  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  showLoader(true);

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
    .then(response => {
      showLoader(false);
      if (!response.ok) throw new Error("City not found. Please check the spelling.");
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const weather = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
      const humidity = data.main.humidity;
      const wind = data.wind.speed;
      const feelsLike = data.main.feels_like;

      resultDiv.innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <img src="${iconUrl}" alt="${weather}" style="width:80px;height:80px;" />
        <p style="font-size:1.5rem;"><strong>${temp}°C</strong></p>
        <p style="text-transform:capitalize;">${weather}</p>
        <div class="weather-extra">
          <span title="Feels like"><b>🌡️</b> Feels: ${feelsLike}°C</span>
          <span title="Humidity"><b>💧</b> Humidity: ${humidity}%</span>
          <span title="Wind speed"><b>💨</b> Wind: ${wind} m/s</span>
        </div>
      `;
    })
    .catch(error => {
      showLoader(false);
      showError(error.message);
    });
}
