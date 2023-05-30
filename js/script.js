let buttonaddon2=document.querySelector('#button-addon2');
let searchInput=document.querySelector('#find');
let weatherRow=document.querySelector('.weatherRow');
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function getCurrentDay(cityName) {
    let httpXML = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b8dbfa1a824349a0a1402854232302&q=${cityName}&days=3`);
    if (httpXML.ok && httpXML.status != 400) {
        let myData = await httpXML.json();
        displayCurrentDay(myData.location, myData.current),
        displayAnotherDays(myData.forecast.forecastday)
    }
}
searchInput.addEventListener("keyup", event=>{
    getCurrentDay(event.target.value)
}
);

buttonaddon2.addEventListener("click",function(){
    getCurrentDay(searchInput.value)
}
);

function displayCurrentDay(loc, curr) {
    if (curr != null) {
        var myDate = new Date(curr.last_updated.replace(" ", "T"));
        let cartona =`<div class=" col-md-4">
        <div class="day-weather rounded-4 text-white p-3">
            <div class="date d-flex justify-content-between mb-4">
                <div class="day rounded-pill  px-4 py-1">${days[myDate.getDay()]}</div>
                <div class="month rounded-pill px-4 py-1"> ${myDate.getDate()} ${ months[myDate.getMonth()]}</div>
            </div>
            <div class="row align-items-center mb-3">
                <div class="col-6" >
                    <p class="fs-5">${loc.country}/${loc.name}</p>
                    <p class=" fs-1 fw-bold text-primary">${curr.temp_c}<sup>o</sup></p>
                    <p>${curr.condition.text}</p>
                </div>
                <div class="col-6" >
                    <div>
                        <img src="https:${curr.condition.icon}" alt="" srcset="" class="img-fluid">
                    </div>
                </div>
            </div>
            <div class="row justify-content-between">
                <div class="col-6 d-flex justify-content-center align-items-baseline">
                    <i class="fa-solid fa-wind me-2"></i> <p class="">${curr.wind_kph} Km/h</p>
                </div>
                <div class="col-6 d-flex justify-content-center align-items-baseline">
                    <i class="fa-regular fa-compass me-2"></i> <p>${curr.wind_dir}</p>
                    </div>
            </div>
        </div>
                     </div>`;
        weatherRow.innerHTML = cartona
    }
}

function displayAnotherDays(forecastday) {
    let cartona = ``;
    for (let i = 1; i < forecastday.length; i++)
        cartona += `<div class=" col-md-4">
<div class="day-weather rounded-4 text-center text-white p-3">
    
        <div class="day rounded-pill w-50 mx-auto mb-4 px-1 py-1"><p class="m-0">${days[new Date(forecastday[i].date.replace(" ", "T")).getDay()]}</p> </div>
    
    <div class=" w-50 mx-auto">
        <img src="https:${forecastday[i].day.condition.icon}" alt="" srcset="" class="img-fluid">
    </div>
            
            <p class=" fs-1 fw-bold m-0 p-0 ">${forecastday[i].day.maxtemp_c}<sup>o</sup></p>
            <p class=" fs-5 fw-semibold m-0 mb-3 p-0">${forecastday[i].day.mintemp_c}<sup>o</sup></p>
            <p >${forecastday[i].day.condition.text}</p>
    </div>
    
                    </div>`;

weatherRow.innerHTML += cartona
}
getCurrentDay("Alexandria");
