const searchElement = document.querySelector('#city-search');
const searchBox = new google.maps.places.SearchBox(searchElement);

searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0];
  if (place == null){
    return;
  }
  const latitude = place.geometry.location.lat();
  const longtitude = place.geometry.location.lng();

  fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      latitude: latitude,
      longtitude: longtitude,
    })
  })
  .then(res => res.json())
  .then((data) => {
    setWeatherData(data, place.formatted_address);
    // console.log(data);
  })
})

const icon = new Skycons({ color: 'white' });
const locationElement = document.querySelector('#location');
const statusElement = document.querySelector('#status');
const windElement = document.querySelector('#wind');
const temperatureElement = document.querySelector('#temperature');
const apparentElement = document.querySelector('#apparent-temperature');
const humidityElement = document.querySelector('#humidity');
const precipitationElement = document.querySelector('#precipitation');
icon.set('icon', 'clear-day');
icon.play();


let setWeatherData = (data, place) => {
  locationElement.textContent = place;
  statusElement.textContent = data.summary;
  humidityElement.textContent = data.humidity;
  temperatureElement.textContent = `${data.temperature} °C`;
  apparentElement.textContent = `${data.apparentTemperature} °C`
  precipitationElement.textContent = `${data.precipProbability * 100}%`;
  windElement.textContent = `${data.windSpeed} km/h`;
  icon.set('icon', data.icon);
  icon.play();
};