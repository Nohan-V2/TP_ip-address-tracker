const $ipAdressInput = document.querySelector(".ip-address-input");
const $ipAdressSubmit = document.querySelector(".ip-adress-submit");
const $ipAdressValue = document.querySelector("#ip-address-value");
const $ipAdressLocation = document.querySelector("#ip-address-location");
const $ipAdressTimezone = document.querySelector("#ip-address-timezone");
const $ipAdressIsp = document.querySelector("#ip-address-isp");

console.log($ipAdressInput);
console.log($ipAdressSubmit);
console.log($ipAdressValue);
console.log($ipAdressLocation);
console.log($ipAdressTimezone);
console.log($ipAdressIsp);

let map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map).openPopup();

function getIpInfo(ipAddress) {
  fetch("./data/data.json")
    .then((response) => response.json())
    .then((data) => {
      if (data.ip === ipAddress) {
        makeIpInfo(data);
      }
    })
    .catch((error) => console.log("Error API: " + error));
}
function makeIpInfo(data) {
  $ipAdressValue.textContent = data.ip;
  $ipAdressLocation.textContent =
    data.location.city + ", " + data.location.country;
  $ipAdressTimezone.textContent = data.location.timezone;
  $ipAdressIsp.textContent = data.isp;

  map.setView([data.location.lat, data.location.lng]);
  map.marker([data.location.lat, data.location.lng]).addTo(map);
}

$ipAdressSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const ipAddress = $ipAdressInput.value;

  getIpInfo(ipAddress);
});

$ipAdressInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    $ipAdressSubmit.click();
  }
});
