let cityElement = document.querySelector("#city");
function updateTime() {
  let cityNameElement = cityElement.querySelector(".city-name");
  let dateElement = cityElement.querySelector(".date");
  let timeElement = cityElement.querySelector(".time");
  let cityGuess = moment.tz.guess();
  let cityTime = moment().tz(cityGuess);
  cityGuess = cityGuess.replace("_", " ").split("/")[1];

  cityNameElement.innerHTML = cityGuess;
  dateElement.innerHTML = cityTime.format("MMMM Do YYYY");
  timeElement.innerHTML = cityTime.format("h:mm:ss [<small>]A[</small>]");
}

updateTime();
setInterval(updateTime, 1000);

function changeCity(event) {
  setInterval(() => {
    let cityTimeZone = event.target.value;

    if (cityTimeZone === "current") {
      cityTimeZone = moment.tz.guess();
    }

    let citiesElement = document.querySelector("#cities");
    citiesElement.innerHTML = "";

    if (cityTimeZone === "all") {
      let selectElement = document.querySelectorAll("[name=select]");
      let optionValues = [...selectElement[0].options].map((o) => o.value);
      optionValues = optionValues.slice(1, -1);
      optionValues.forEach(function appendTimeZone(cityTimeZone) {
        let cityName = cityTimeZone.replace("_", " ").split("/")[1];
        let cityTime = moment().tz(cityTimeZone);
        citiesElement.innerHTML += `
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
      });
    } else {
      let cityName = cityTimeZone.replace("_", " ").split("/")[1];
      let cityTime = moment().tz(cityTimeZone);
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
  }, 1000);
}

let citySelectElement = document.querySelector("#city-select");
citySelectElement.addEventListener("change", changeCity);
