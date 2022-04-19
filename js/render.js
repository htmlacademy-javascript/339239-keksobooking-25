import './slider.js';
import {setStateActive, setStateDisabled, setFiltersDisabled} from './states.js';
import {getAdvertisements} from './data-fetch.js';
import {showErrorPopup, debounce} from './utils.js';
import {filtering} from './filtering.js';
import {createAdvertisementPin, getMainPin} from './pins.js';

const MAX_ADVERTISEMENTS_RENDERED = 10;
const INITIAL_ZOOM = 13;

const successMessage = document.querySelector('#success').content.cloneNode(true);
const errorMessage = document.querySelector('#error').content.cloneNode(true);
const addressField = document.querySelector('#address');
const filterForm = document.querySelector('.map__filters');
const initialLocation = [35.6895, 139.69171];
const mainPin = getMainPin();

const map = L.map('map-canvas');
L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

setStateDisabled();

const advertisementsLayer = L.layerGroup().addTo(map);

const resetMap = () => {
  mainPin.setLatLng(initialLocation);
  addressField.value = initialLocation.toString(', ');
  map.closePopup().setView(initialLocation, INITIAL_ZOOM);
};

const onMapLoad = () => {
  setStateActive();
  successMessage.querySelector('.success').classList.add('hidden');
  errorMessage.querySelector('.error').classList.add('hidden');
  document.body.appendChild(successMessage);
  document.body.appendChild(errorMessage);
  addressField.value = initialLocation.toString(', ');
};

const renderInitialAds = (advertisements) => {
  advertisements.slice(0, MAX_ADVERTISEMENTS_RENDERED).forEach((advertisement) => {
    createAdvertisementPin(advertisement, advertisementsLayer);
  });
};

const onAdLoadFailure = () => {
  setFiltersDisabled();
  showErrorPopup('Не удалось получить данные о существующих объявлениях. Попробуйте перезагрузить страницу.');
};

const onAdLoadSuccess = (advertisements) => {
  renderInitialAds(advertisements);

  const debouncedFiltering = debounce(filtering(advertisements, advertisementsLayer), 500);
  filterForm.addEventListener('change', debouncedFiltering);
};

const setMap = () => {
  //Инициализация карты
  map.on('load', onMapLoad).setView(initialLocation, INITIAL_ZOOM);

  //Код для главной метки
  mainPin.addTo(map);

  mainPin.on('moveend', (evt) => {
    addressField.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });

  //Код для меток объявлений
  getAdvertisements(onAdLoadSuccess, onAdLoadFailure);
};

export {setMap, resetMap};
