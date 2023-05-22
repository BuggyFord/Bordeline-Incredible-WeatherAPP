var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputButton");
var cityName = document.querySelector(".name");
var date = document.querySelector(".date");
var windSpeed = document.querySelector(".wind-speed");
var temp = document.querySelector(".temp");
var humid = document.querySelector(".humidity");
var apiKey = "d17256f3567e1479f6aee9afaccb272d";
var historyList = document.querySelector('.history')

let searchHistory = [];
// setup an intitial condition for our persisting data
// localStorage.setItem('cities', '[]');   // here is our starting Empty Array (In STRING format)
/*
var savedData = localStorage.getItem('cities');
console.log("Local Storage: ", savedData);
console.log("Data Type: ", typeof savedData);

var parsedData = JSON.parse(savedData);
console.log("Parsed Storage: ", parsedData);
console.log("Data Type: ", typeof parsedData);

var jsObj = {
    name: "bill",
    age: 25
}

var jsonObj = {
    "name": "bill",
    "age": "25"
}

var stringData = JSON.stringify(parsedData);
console.log("Stringified Storage: ", stringData);
console.log("Data Type: ", typeof stringData);
*/

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

        // add the city to localStorage
        
        // first we have to GRAB the exisiting data
        var savedData = localStorage.getItem('cities');
        if(!savedData) {
            savedData = [];
        }
        // Then we convert the STRING data into a JS ARRAY
        var parsedData = JSON.parse(savedData);
        console.log("Old Snapshot Dataset: ", parsedData);
        // we ADD our NEW data to our JS ARRAY
        parsedData.push(city);
        
        // we need to convert the JS ARRAY data back into a STRING for the Browser
        var newDataArr = JSON.stringify(parsedData);
        console.log("New Snapshot Dataset: ", newDataArr);

        // We save the new dataset back into the Browser
        localStorage.setItem('cities', newDataArr);
        getHistory()
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

function getHistory() {

    // What do we need in this function?

    // we need DATA  --> localStorage
    var historyData = localStorage.getItem('cities');

    // console.log("Data: ", historyData);
    // console.log("Data type: ", typeof historyData);

    // we should covert the data into somehting more useful
       // gives us an ARRAY OBJECT 
    if(historyData){
        historyList = JSON.parse(historyData);
    }

    
    // we need to create a button/list item for each city
    /*;
    }*/

    // * TO DO * How do we keep the HISTORY container from reapeating its dataset(?) -- //
    
    historyList.innerHTML = "";
    for(var i = 0; i < searchHistory.length; i++) {
       // console.log(historyArr[i]);
       // console.log(newItem);
        var newItem = document.createElement('button');
        newItem.setAttribute('type', 'button')
        newItem.setAttribute('data-search', searchHistory[i])
        newItem.textContent= searchHistory[i]
        // newItem.textContent = searchHistory[i]
        //console.log(newItem);
        // add/append this new element/data to the DOM
        
    }
    historyList.append(newItem)
}

getHistory();
