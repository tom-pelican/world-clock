let cityElement = document.querySelector("#city");
function updateTime() {
  let cityNameElement = cityElement.querySelector(".city-name");
  let dateElement = cityElement.querySelector(".date");
  let timeElement = cityElement.querySelector(".time");
  let cityGuess = moment.tz.guess();
  let cityTime = moment().tz(cityGuess);

  cityNameElement.innerHTML = cityGuess;
  dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
  timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
}

updateTime();
setInterval(updateTime, 1000);

function changeCity(event) {
  let cityTimeZone = "";

  if (event.target.value.length > 0) {
    cityTimeZone = event.target.value;
  } else {
    cityTimeZone = moment.tz.guess();
  }

  let cityName = cityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(cityTimeZone);
  let citiesElement = document.querySelector("#cities");
  citiesElement.innerHTML = `
        <div class="city" id="city">
          <div>
            <h2 class="city-name">${cityName}</h2>
            <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
          </div>
          <div class="time">${cityTime.format(
            "h:mm:ss [<small>]A[</small>]"
          )}</div>
        </div>
  `;
}

let citySelectElement = document.querySelector("#city-select");
citySelectElement.addEventListener("change", changeCity);
