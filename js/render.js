import './slider.js';
import {resetSlider} from './slider.js';
import {setStateActive} from './states.js';
import {getAdvertisements} from './data-fetch.js';
import {createOfferCard, showErrorPopup} from './utils.js';

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
  advertisements.forEach((advertisement) => {
    createAdvertisementPin(advertisement);
  });
},
showErrorPopup);

export {resetPage};
