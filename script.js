var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputButton");
var cityName = document.querySelector(".name");
var date = document.querySelector(".date");
var windSpeed = document.querySelector(".wind-speed");
var temp = document.querySelector(".temp");
var humid = document.querySelector(".humidity");
var apiKey = "d17256f3567e1479f6aee9afaccb272d";

button.addEventListener("click", function(){
    var city = document.getElementById("city").value;
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=" + apiKey;
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        console.log(data.main.temp);
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        
        var date = new Date();
        var month = date.getMonth() +1;
        var day = date.getDate();
        var year = date.getFullYear();
        var dateString = month+"/" + day + "/" + year;
        var icon = "<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'>"
        document.querySelector(".city").innerHTML = city + " (" + dateString + ") " + icon ;
        
        document.querySelector(".temp").innerHTML = "Temperature: " + temp + " &deg;F";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + " %";
        document.querySelector(".wind-speed").innerHTML = "Wind Speed: " + windSpeed + " MPH";
        getForecast (city);
       
    })
})

function getForecast(city){
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=" + apiKey;
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        console.log(data.main.temp);
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        
        var date = new Date();
        var month = date.getMonth() +1;
        var day = date.getDate();
        var year = date.getFullYear();
        var dateString = month+"/" + day + "/" + year;
        var icon = "<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'>"
        document.querySelector(".city").innerHTML = city + " (" + dateString + ") " + icon ;
        
        document.querySelector(".temp").innerHTML = "Temperature: " + temp + " &deg;F";
        document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + " %";
        document.querySelector(".wind-speed").innerHTML = "Wind Speed: " + windSpeed + " MPH";
        getForecast (city);
       
    })
        
}