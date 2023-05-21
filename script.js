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
    var url = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid=" + apiKey;
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
       
        var output = "";
        for(var i = 0; i < 40; i+= 8 ){
            output+= "<div>";
            var date = data.list[i].dt_txt;
            var month = date.substring(5,7);
            var day = date.substring(8,10);
            var year = date.substring(0,4);
            var dateString = month+"/" + day + "/" + year;
            output+= "<p>" + dateString + "</p>";
            var icon = "<img src='http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png'>"
            output+= "<p>" + icon + "</p>";
            var temp = data.list[i].main.temp;
            var humidity = data.list[i].main.humidity;
            var windSpeed = data.list[i].wind.speed;

            output+= "<p>Temperature: " + temp + " &deg;F</p>";
            output+= "<p>Humidity: " + humidity + " %</p>";
            output+= "<p>Wind Speed: " + windSpeed + " MPH</p>";
            output+= "</div>";
        }
        document.querySelector(".forecast").innerHTML = output;


        /*
        
        var icon = "<img src='http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png'>"
        document.querySelector(".city").innerHTML = city + " (" + dateString + ") " + icon ;
        
        */
       
    })
        
}