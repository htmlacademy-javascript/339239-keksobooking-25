import './slider.js';
import {resetSlider} from './slider.js';
import {setStateActive} from './states.js';
import {getAdvertisements} from './data-fetch.js';
import {createOfferCard, showErrorPopup, removeArrayElement} from './utils.js';

const MAX_ADVERTISEMENTS_RENDERED = 10;

const successMessage = document.querySelector('#success').content.cloneNode(true);
const errorMessage = document.querySelector('#error').content.cloneNode(true);
const addressField = document.querySelector('#address');
const filterForm = document.querySelector('.map__filters');
const advertisementForm = document.querySelector('.ad-form');
const initialLocation = [35.6895, 139.69171];

const map = L.map('map-canvas');
L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

const testingAdvertisementsLayer = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinSettings = {
  draggable: true,
  icon: mainPinIcon,
};

const mainPin = L.marker(
  initialLocation,
  mainPinSettings
);

const regularPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const regularPinSettings = {
  draggable: false,
  icon: regularPinIcon,
};

const resetPage = () => {
  advertisementForm.reset();
  filterForm.reset();
  mainPin.setLatLng(initialLocation);
  addressField.value = initialLocation.toString(', ');
  resetSlider();
  map.closePopup().setView(initialLocation, 13);
};

const onMapLoad = () => {
  setStateActive();
  successMessage.querySelector('.success').classList.add('hidden');
  errorMessage.querySelector('.error').classList.add('hidden');
  document.body.appendChild(successMessage);
  document.body.appendChild(errorMessage);
  addressField.value = initialLocation.toString(', ');
};

const createAdvertisementPin = (advertisement) => {
  const advertisementPin = L.marker(
    advertisement.location,
    regularPinSettings
  );

  advertisementPin.addTo(testingAdvertisementsLayer).bindPopup(createOfferCard(advertisement));

  //По какой-то причине при повторном нажатии на балун попап был пустой, поэтому написал код ниже
  advertisementPin.addEventListener('click', () => {
    advertisementPin.setPopupContent(createOfferCard(advertisement));
  });
};

//Инициализация карты
map.on('load', onMapLoad).setView(initialLocation, 13);

//Код для главной метки
mainPin.addTo(map);

mainPin.on('moveend', (evt) => {
  addressField.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

//Код для меток объявлений

getAdvertisements((advertisements) => {
  //1. Получили данные функцией getAdvertisements +
  //2. Повесили обработчик, который отслеживает изменения фильтров +
  //3. При каждом изменении фильтра отправляем копию изначального массива на фильтрацию (не забыть про дребезг)
  //4. Очищаем текущие метки, отрисовываем те, что получились после фильтрации
  const advertisementsToFilter = advertisements.slice();
  let features = [];
  filterForm.addEventListener('change', (evt) => {
    //Если целью evt был чекбокс, то:
    //1. Если он не checked, дать ему checked, записать значение в массив features
    //2. Иначе убрать checked, убрать значение из массива features
    if (evt.target.classList.contains('map__checkbox')) {
      if (!evt.target.classList.contains('checked')) {
        evt.target.classList.add('checked');
        features.push(evt.target.value);
      } else {
        evt.target.classList.remove('checked');
        features = removeArrayElement(features, evt.target.value);
      }
    }
    const filterSettings = {
      type: filterForm.querySelector('#housing-type').value,
      price: filterForm.querySelector('#housing-price').value,
      rooms: filterForm.querySelector('#housing-rooms').value,
      guests: filterForm.querySelector('#housing-guests').value,
      features: features,
    };
    console.log(filterSettings);

    const advertisementsToRender = advertisementsToFilter.slice(0, MAX_ADVERTISEMENTS_RENDERED);
    advertisementsToRender.forEach((advertisement) => {
      createAdvertisementPin(advertisement);
    });
  });
},
showErrorPopup);

export {resetPage};
