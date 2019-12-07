import Cities from './cities';
import { kelvinToCelsius } from './utils';
import { getTodayWeatherByCity } from './api';
import cities from './cities';

console.log(Object.keys(Cities));

const promises = Object.keys(Cities).map((city) => getTodayWeatherByCity(city));
// Object.keys(Cities).map((city) => getTodayWeatherByCity(city)
// .then((result) => {
// renderListItem(result);
// }));

Promise.all(promises)
  .then((result) => result.map(renderListItem))
  .then(() => {
    const loading = document.getElementById('loading');
    loading.classList.add('hide');
  });

console.log('Code for List page');

function renderListItem(data) {
  const { name, main, weather } = data;


  const container = document.getElementById('main-list-id');
  const mycityrow = document.createElement('div');
  mycityrow.className = 'city-w';
  mycityrow.id = `${name}`;
  const mycityname = document.createElement('div');
  mycityname.className = 'e1';
  mycityname.innerText = `${name}`;
  mycityrow.append(mycityname);

  const mycityicon = document.createElement('div');
  mycityicon.className = 'e2';
  const mycityiconimg = document.createElement('img');
  mycityiconimg.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  mycityicon.append(mycityiconimg);
  mycityrow.append(mycityicon);
  container.append(mycityrow);

  const mymainTemp = document.createElement('div');
  mymainTemp.className = 'e3';
  mymainTemp.innerText = `Current-temp : ${kelvinToCelsius(main.temp)}`;
  mycityrow.append(mymainTemp);

  const mymaxTemp = document.createElement('div');
  mymaxTemp.className = 'e4';
  mymaxTemp.innerText = `Max-temp : ${kelvinToCelsius(main.temp_max)}`;
  mycityrow.append(mymaxTemp);

  const myminTemp_min = document.createElement('div');
  myminTemp_min.className = 'e5';
  myminTemp_min.innerText = `Min-temp : ${kelvinToCelsius(main.temp_min)}`;
  mycityrow.append(myminTemp_min);

  const myHumidity = document.createElement('div');
  myHumidity.className = 'e6';
  myHumidity.innerText = `Humidity : ${main.humidity}`;
  mycityrow.append(myHumidity);
}
