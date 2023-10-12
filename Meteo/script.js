
var weather = {
    apikey: "f9530de778f7f11d8b0b36ca20476f31",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apikey
        )
        .then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
            return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name, visibility } = data; 
        const { country } = data.sys;
        const { icon, description } = data.weather[0];
        const { temp, feels_like, humidity, temp_min, temp_max } = data.main;
        const { speed } = data.wind;

        console.log(name, country, icon, description, temp, feels_like, humidity, temp_min, temp_max, speed, visibility);
        document.querySelector(".city").innerText = "Weather in " + name + " " + country;
        document.querySelector(".temp").innerHTML = temp + "°C";
        document.querySelector(".feelTemp").innerText = "Feels like : " + feels_like + " °C"
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".min").innerText = "Minimum temperature : " + temp_min + " °C";
        document.querySelector(".max").innerText = "Maximum temperature : " + temp_max + " °C";
        document.querySelector(".humidity").innerText = "Humidity : " + humidity + " %";
        document.querySelector(".wind").innerText = "Wind speed : " + speed + " Km/h";
        document.querySelector(".visibility").innerText = "Visibility : " + visibility + " Meters"
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("montreal");

