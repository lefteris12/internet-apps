var form = document.querySelector('form');
var openWeatherApiKey = 'a6877af1a1764b3a3ea5f0c542b099f5';

var map = L.map('mapid').setView([0, 0], 20);
var layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

form.addEventListener('submit', event => {
//  if (map != undefined) { map.remove(); }
  // Prepare map


  event.preventDefault();
  var lon = document.getElementById('lon').value;
  var lat = document.getElementById('lat').value;
  var maxDistance = document.getElementById('maxDistance').value;
  var check = document.getElementById('checkWeather').checked;

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonResp = JSON.parse(xhttp.response);
      var element = document.getElementById('table');
      if (check) {
        element.innerHTML = '<tr><th>Όνομα</th><th>Συντεταγμένες (longitude,latitude)</th><th>Ποιότητα υδάτων</th><th>Απόσταση(km)</th><th>Μποφόρ</th></tr>';
      } else {
        element.innerHTML = '<tr><th>Όνομα</th><th>Συντεταγμένες (longitude,latitude)</th><th>Ποιότητα υδάτων</th><th>Απόσταση(km)</th></tr>';
      }

      var i;
      var markers = [];

      for (i = 0; i < jsonResp.length; i++) {
        var j = jsonResp[i];
        var weatherRow = '';
        if (check) {
          weatherRow = `<td id=weather${i}></td>`;
          setWeather(j['lon'], j['lat'], i);
        }
        var string = `
        <tr>
            <td>${j['nameGr']}</td>
            <td>${j['lon']}, ${j['lat']}</td>
            <td>${getCategoryDescription(j['category'])}</td>
            <td>${j['distance'].toFixed(2)}</td>
            ${weatherRow}
        <tr>
        `;
        element.innerHTML += string;
        var marker = [j['lat'], j['lon']];
        markers.push(marker);
        L.marker(marker).addTo(map)
            .bindPopup(j['nameGr'])
            .openPopup();
      }
      map.setView([lat, lon], 20);
      map.fitBounds(markers);
    }
  };
  var url=`http://192.168.1.204:8080/nearBeaches?lon=${lon}&lat=${lat}&maxDistance=${maxDistance}`;
  xhttp.open("GET", url);
  xhttp.send();
});

function getCategoryDescription (category) {
  switch (category) {
  case 1: return 'Εξαιρετικής ποιότητας';
  case 2: return 'Καλής ποιότητας';
  case 6: return 'Δεν έχει γίνει αξιολόγηση της ποιότητας';
  }
}

function msToBeaufort (windSpeed) {
  // Convert from m/s to beaufort
  // https://en.wikipedia.org/wiki/Beaufort_scale#Modern_scale
  if (windSpeed < 0.5) {
    return 0;
  } else if (windSpeed <= 1.5) {
    return 1;
  } else if (windSpeed <= 3.3) {
    return 2;
  } else if (windSpeed <= 5.5) {
    return 3;
  } else if (windSpeed <= 7.9) {
    return 4;
  } else if (windSpeed <= 10.7) {
    return 5;
  } else if (windSpeed <= 13.8) {
    return 6;
  } else if (windSpeed <= 17.1) {
    return 7;
  } else if (windSpeed <= 20.7) {
    return 8;
  } else if (windSpeed <= 24.4) {
    return 9;
  } else if (windSpeed <= 28.4) {
    return 10;
  } else if (windSpeed <= 32.6) {
    return 11;
  } else {
    return 12;
  }
}

function setWeather (lon, lat, i) {
  var weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${openWeatherApiKey}&units=metric`;
  console.log(weatherUrl);
  var weatherReq = new XMLHttpRequest();
  weatherReq.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var weatherResp = JSON.parse(weatherReq.response);
      var windSpeed = weatherResp['wind']['speed'];

      var beaufort = msToBeaufort(windSpeed);
      document.getElementById('weather'+i).innerHTML = beaufort;
    }
  }
  weatherReq.open("GET", weatherUrl);
  weatherReq.send();
}

function setCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      document.getElementById('lat').value = position.coords.latitude;
      document.getElementById('lon').value = position.coords.longitude;
    });
  }
}