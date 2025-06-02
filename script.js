const apiKey = "8b34acb0db77b62e93dcbd2478908bbf"; // Replace with your actual API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (city === "") {
    resultDiv.innerHTML = "<p>Loading...</p>";

    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const weather = data.weather[0].description;
      const icon = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

      resultDiv.innerHTML = `
        <h3>${data.name}</h3>
        <img src="${iconUrl}" alt="${weather}" />
        <p><strong>${temp}°C</strong></p>
        <p>${weather}</p>
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>${error.message}</p>`;
    });
}