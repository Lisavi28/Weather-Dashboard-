//variables declaration

var searchbtnEl =document.querySelector(".search-btn")
var inputEl =document.querySelector(".form-input")
var todayCardEl =document.querySelector(".today")
var titleEl =document.querySelector(".card-header")
var weeklyCardEl =document.querySelector(".forecast")
var formbtnEl=document.querySelector(".search")



//gets weather for coordinates
var weatherToday= function(place1, placeState, placeLat, placeLon){
var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ placeLat + "&lon=" + placeLon + "&units=imperial&appid=e7ad4771f7fcd96ba684ae49e144fc60"
fetch(apiUrl)

.then(function (response) {
    return response.json();
  })

//puts selected info in variables
  .then(function(place) {
    var tempItem = place.current.temp;
    var windItem = place.current.wind_speed;
    var humItem = place.current.humidity;
    var uvItem= place.current.uvi;
    var weatherItem = place.current.weather[0].main;

//create elements in html
    var tempToday = document.createElement("h3");
    var windToday = document.createElement("h3");
    var humToday = document.createElement("h3");
    var weatherToday =document.createElement("h3")
    var uvToday= document.createElement("h3");
    var cityToday = document.createElement("span");

//assign text value to html elements
    tempToday.textContent =  "Temp: " + tempItem +" F";
    windToday.textContent = "Wind speed: " + windItem + "M/h";
    humToday.textContent = "Humidity: " + humItem;
    uvToday.textContent = "UV index: " + uvItem;
    cityToday.textContent = "Today's weather for: " + place1 + ", " + placeState; 
    weatherToday.textContent = weatherItem
  
    todayCardEl.append(tempToday, windToday, humToday, uvToday, weatherToday)
    titleEl.append(cityToday)

//function call

    weeklyCards(place);
  });
}
// function to create daily cards

    var weeklyCards = function (place) {
   
        for (var i = 0; i < 5; i++ ) {
          var cardTemp = place.daily[i].temp.day;
          var cardWind = place.daily[i].wind_speed;
          var cardHum = place.daily[i].humidity;
          var cardWeather = place.daily[i].weather[0].main
        
          var cardDiv = document.createElement ("div")
          cardDiv.classList.add("cards")
          cardDiv.classList.add("card")
          cardDiv.classList.add("col-2")

          var tempWeek = document.createElement("h3")
          var windWeek = document.createElement("h3")
          var humWeek = document.createElement("h3")
          var weatherWeek = document.createElement("h3")
          
          tempWeek.textContent ="Temp: " + cardTemp + " F";
          weatherWeek.textContent = cardWeather;
          windWeek.textContent = "Wind: " + cardWind + "Mi/h";
          humWeek.textContent = "Humidity: " + cardHum;

//add elements to container

        cardDiv.append(tempWeek,weatherWeek,windWeek,humWeek);
        weeklyCardEl.append(cardDiv);
        }}

//function to submit textinput      

var Submit = function(event) {
    event.preventDefault();
  
    var placeSelected = inputEl.value.trim();
    if (placeSelected){

//cleans screen 
    todayCardEl.textContent =  "" ;
    titleEl.textContent = "" ;
    weeklyCardEl.textContent = "";
   geoLoc(placeSelected);
 

// button with recent search
   var searchBtn = document.createElement("button")
    searchBtn.classList.add('btn');
    searchBtn.textContent = placeSelected;
    formbtnEl.append(searchBtn);
    inputEl.value= "";    
    }
  }

  //
$(".search").on("click", "button", function() {
    // get current text of button element
    var previousCity = $(this).text()
   
    geoLoc(previousCity);
    todayCardEl.textContent =  "" ;
    titleEl.textContent = "" ;
    weeklyCardEl.textContent = "";
  }
  )

//function to convert city to coordinates
var geoLoc= function(placeSelected){
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + placeSelected + "&appid=e7ad4771f7fcd96ba684ae49e144fc60"
    fetch(apiUrl)

    .then(function (response) {
      return response.json();
    })
    .then(function(data) {
      var place1 = data[0].name;
      var placeState = data[0].state;
      var placeLat = data[0].lat;
      var placeLon = data[0].lon;
    
      weatherToday(place1, placeState, placeLat, placeLon)
    })
    }

  searchbtnEl.addEventListener("submit", Submit);





//e7ad4771f7fcd96ba684ae49e144fc60